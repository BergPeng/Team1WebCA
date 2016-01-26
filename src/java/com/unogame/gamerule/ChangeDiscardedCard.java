package com.unogame.gamerule;


import com.unogame.data.Game;
import com.unogame.data.CompleteCard;
import com.unogame.data.Card;
import java.io.IOException;
import java.io.PrintWriter;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {"/ChangeDiscardedCard"})
public class ChangeDiscardedCard extends HttpServlet {

    @Inject
    private Game gm;
    @Inject
    private CompleteCard ccard;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //response.setHeader("Cache-Control", "no-cache");
        //response.setHeader("Pragma", "no-cache");
        String cardId = String.valueOf(request.getParameter("cardId"));
        String color = String.valueOf(request.getParameter("color"));
        System.out.println(cardId);
        Card cd = ccard.getCard(cardId);
        if("r".equals(color) || "red".equals(color))
            cd.setColor("red");
        if("b".equals(color) || "blue".equals(color))
            cd.setColor("blue");
        if("g".equals(color) || "green".equals(color))
            cd.setColor("green");
        if("y".equals(color) || "yellow".equals(color))
            cd.setColor("yellow");
        gm.setLastCard(cd);
        System.out.println(gm);

        //PrintWriter out = response.getWriter();
        //Date currentTime= new Date();
        //String message = String.format("Currently time is %tr on %tD.",currentTime, currentTime);
        //out.print(message);
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
