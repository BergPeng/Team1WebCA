
package com.unogame.controller;

import com.unogame.data.Player;
import com.unogame.biz.UserManager;
import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



@WebServlet("/authenticate")
public class LoginServlet extends HttpServlet{

    //@Resource(lookup="jdbc/unogame") DataSource ds;
    @Inject private UserManager um;
    @Inject private Player pl;
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {

        System.out.println("I am in login part");
        String userid = req.getParameter("userid");
        String password = req.getParameter("pwd");
 
        try {
            req.login(userid, password);
        } catch (Exception e) {
            System.out.println("Here is an acception ==>"+ e);
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        
        String pic = um.getByName(userid).getPicture();
        // put user data to player
        pl.setPlayerId(userid);
        
        pl.setPlayerPic(pic);
        
        resp.setHeader("Access-Control-Allow-Origin", "*");
        
        HttpSession session = req.getSession();
        session.setAttribute("login", true);
        resp.setStatus(HttpServletResponse.SC_ACCEPTED);

        System.out.println("I will go back to login page");
        
        
//        if(um.Login(userid, password)){  
//            System.out.println("user ok");
//            pl.setPlayerId(userid);
//            pl.setPicture(um.getPicture(userid));
//            System.out.println(pl);
//            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
//
//        }else{
//            System.out.println("usr not correct");
//            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            return;
//        }
    }
    
    
}
