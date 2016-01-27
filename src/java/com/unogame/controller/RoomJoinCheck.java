package com.unogame.controller;


import com.unogame.data.Game;
import com.unogame.data.Player;
import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.unogame.data.GameRooms;


@WebServlet("/checkroom")
public class RoomJoinCheck extends HttpServlet{

    @Inject private GameRooms rooms; 
    @Inject private Player pl;
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        String room = req.getParameter("room");
        HttpSession session =req.getSession();
        session.setAttribute("room",room);
        System.out.println("The room name is ==>"+room);
        if(rooms.checkRoomAva(room)){
            
            System.out.println(pl);
            
            Game gm= new Game();
            gm = rooms.getRoom().get(room);
            gm.addPlayer1(pl);
            rooms.getRoom().put(room, gm);
            req.setAttribute("room", room);
            System.out.println("I will go to another page");
            
            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
//            RequestDispatcher rd = req.getRequestDispatcher("/Player.jsp");
//            rd.forward(req, resp);
            
        }else{
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
    }
    
}
