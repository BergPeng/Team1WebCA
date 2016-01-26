package com.unogame.controller;


import com.unogame.data.GameRooms;
import com.unogame.data.Player;
import com.unogame.data.CompleteCard;
import com.unogame.data.Card;
import com.unogame.data.Card;
import com.unogame.data.CompleteCard;
import com.unogame.data.GameRooms;
import com.unogame.data.Player;
import java.io.ByteArrayInputStream;
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

@RequestScoped
@ServerEndpoint("/user/player/{room}")
public class PlayerSocket {

    @Inject private GameRooms rooms;
    @Inject private Player pl;
    @Inject private CompleteCard ccard;

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
            if("player score".equals(json.getString("message"))){
                jo.put("score", json.getString("score"));
                jo.put("totalCard", json.getString("totalCard"));
            }
            if("getLastCard".equals(json.getString("message"))){
                jo.put("refCardId", json.getString("refCardId"));
            }
        } else {
            if ("put 1 card".equals(json.getString("message"))) {
                jo.put("cardId", json.getString("cardId"));
                Card cd = ccard.getCard(json.getString("cardId"));
                jo.put("cardPicture", cd.getFrontImage());
                jo.put("color", json.getString("color"));
            }
        }
        String msgToRoom = jo.toString();
        rooms.broadcast(room, msgToRoom);
    }

    @OnOpen
    public void open(Session s, @PathParam("room") String room) {
        System.out.println(room + " >>> @OnOpen = " + s.getId());
        session = s;
        ccard = new CompleteCard();
        //Player player = pl.copy();
        //pl = player;
        //System.out.println(player);
        //System.out.println(pl.getPlayerId());
        // delete add player, already add in the RoomJoinCheck part
        rooms.addVersion1(room, session);
        System.out.println(pl);
    }

    @OnClose
    public void close() {
        System.out.println(">>> @OnClose = " + session.getId());

    }
}
