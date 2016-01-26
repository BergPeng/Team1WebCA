package com.unogame.controller;


import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.unogame.data.Game;
import com.unogame.data.GameRooms;

@WebServlet("/CreateGame")
public class CreateGame extends HttpServlet {

    @Inject
    private Game game;
    @Inject GameRooms rooms;
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String roomName = request.getParameter("roomName");
        int maxPlayer = Integer.valueOf(request.getParameter("maxPlayer"));
        int roundLimit = Integer.valueOf(request.getParameter("roundLimit"));
        game.setGameId(roomName);
        game.setMaxPlayer(maxPlayer);
        game.setRoundLimit(roundLimit);
        
        rooms.getRoom().put(roomName, game.copy());
        System.out.println("The game number in rooms ==>"+rooms.getRoom().keySet().size());
        
        request.getRequestDispatcher("UnoGame.jsp").forward(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
