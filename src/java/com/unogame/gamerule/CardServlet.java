package com.unogame.gamerule;

import com.unogame.data.Player;
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


@WebServlet("/user/CardServlet/*")
public class CardServlet extends HttpServlet {
    

    @Inject Player player;
    @Inject CompleteCard ccard;
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String path = request.getPathInfo();        
        String cardId = request.getParameter("cardId");
        PrintWriter out = response.getWriter();
        Card cd;
        switch(path){
            case "/give":
                cd = ccard.getCard(cardId);
                player.addCard(cd);
                break;
            case "/put":
                System.out.println("Remove Card : "+ cardId);
                cd = ccard.getCard(cardId);                
                player.putOne(cd);
                out.print(player.getTotalCard());
                break;
            default:
                break;
        }
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

}
