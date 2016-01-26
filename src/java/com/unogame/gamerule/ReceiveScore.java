package com.unogame.gamerule;


import com.unogame.data.Game;
import java.io.IOException;
import java.io.PrintWriter;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {"/ReceiveScore"})
public class ReceiveScore extends HttpServlet {

    @Inject
    private Game gm;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pid = request.getParameter("playerId");
        int score = Integer.valueOf(request.getParameter("scoreId"));
        int totalCard = Integer.valueOf(request.getParameter("totalCard"));
        gm.receiveScore(pid, score, totalCard);
        System.out.println(pid + " : " + score + " " + totalCard + " card(s)");
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
