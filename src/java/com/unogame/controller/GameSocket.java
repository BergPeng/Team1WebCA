package com.unogame.controller;


import com.unogame.data.CompleteCard;
import com.unogame.data.Card;
import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONException;
import org.json.JSONObject;
import com.unogame.data.Game;
import com.unogame.data.GameRooms;

@RequestScoped
@ServerEndpoint("/game/{room}")
public class GameSocket {

    @Inject
    private GameRooms rooms;
    @Inject
    private Game gm;
    @Inject
    private CompleteCard ccard;

    private Session session;

    @OnMessage
    public void message(String msg) throws JSONException {
        System.out.println(">>>> msg = " + msg);

        JsonReader reader = Json.createReader(
                new ByteArrayInputStream(msg.getBytes()));
        JsonObject json = reader.readObject();

        JSONObject jo = new JSONObject();
        jo.put("name", json.getString("name"));
        jo.put("message", json.getString("message"));
        jo.put("room", json.getString("room"));
        jo.put("destination", json.getString("destination"));

        String room = json.getString("room");

        if (jo.getString("destination").equals("deck")) {
            if ("prepare turn".equals(json.getString("message"))) {
                jo.put("cardId", json.getString("cardId"));
                jo.put("cardPicture", json.getString("cardPicture"));
            }
            if ("CanNewRound".equals(json.getString("message"))) {
                jo.put("cann", json.getString("cann"));
            }
        } else {
            if ("give 1 card".equals(json.getString("message"))) {
                jo.put("cardId", json.getString("cardId"));
                Card cd = ccard.getCard(json.getString("cardId"));
                jo.put("cardPicture", cd.getFrontImage());
            }
            if ("we have winner".equals(json.getString("message"))) {
                jo.put("round", json.getString("round"));
                jo.put("winner", json.getString("winner"));
                jo.put("point", json.getString("point"));
            }
            if ("no winner".equals(json.getString("message"))) {
                jo.put("round", json.getString("round"));
            }
            if ("returnLastCard".equals(json.getString("message"))) {
                jo.put("cardId", json.getString("cardId"));
                jo.put("color", json.getString("color"));
                jo.put("refCardId", json.getString("refCardId"));
            }
        }

        String msgToRoom = jo.toString();
        rooms.broadcast(room, msgToRoom);
    }

    @OnOpen
    public void open(Session s,
            @PathParam("room") String room
    ) {
        System.out.println(room + " >>> @OnOpen = " + s.getId());

        session = s;
        ccard = new CompleteCard();
        System.out.println(gm);

        rooms.addVersion2(room, session, new Game(gm.getGameId(), gm.getRoundLimit(), gm.getMaxPlayer()));
    }

    @OnClose
    public void close() {
        System.out.println(">>> @OnClose = " + session.getId());
    }
}
