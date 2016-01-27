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


@WebServlet(urlPatterns = {"/GetReverse"})
public class GetReverse extends HttpServlet {

    @Inject
    private Game gm;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Boolean turn = gm.getTurnPattern();
        gm.setTurnPattern(!turn);
        PrintWriter out = response.getWriter();
        String currentPlayer = gm.getCurrentPlayer();
        out.print(currentPlayer);
        System.out.println("Current TurnPattern is " + gm.getTurnPattern());
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