package com.unogame.gamerule;


import com.unogame.data.Player;
import java.io.IOException;
import java.io.PrintWriter;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {"/user/CalculateScore"})
public class CalculateScore extends HttpServlet {

    @Inject
    private Player pl;

    private static final long serialVersionUID = 1L;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int score = pl.calculateHandCardScore();
        int totalCard = pl.getTotalCard();
        System.out.println(pl.getPlayerId() + " : " + score + " tcard = " + totalCard);
        PrintWriter out = response.getWriter();
        out.print(score + ";" + totalCard);
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
    }// </editor-fold>

}
