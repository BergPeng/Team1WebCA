package com.unogame.gamerule;


import com.unogame.data.Card;
import com.unogame.data.Game;
import com.unogame.data.CardDeck;
import java.io.IOException;
import java.io.PrintWriter;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {"/RoundStartEffect"})
public class RoundStartEffect extends HttpServlet {

    @Inject
    private Game gm;
    @Inject
    private CardDeck cdeck;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("Round Start : ");
        cdeck.refreshCardDeck();
        gm.createNewRound();
        System.out.println(gm);
        System.out.println("Card Deck : " + cdeck);
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
