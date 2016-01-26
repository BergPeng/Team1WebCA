
package com.unogame.controller;

import com.unogame.biz.UserManager;
import com.unogame.model.User;
import java.io.IOException;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/check")
public class RigesterNameCheck extends HttpServlet{

    @Inject private UserManager um;
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        System.out.println("I will check whether user exit");
        String userid = req.getParameter("userid");
        System.out.println(userid);
        
        User usr = um.getByName(userid);
        System.out.println(usr);
        // if user not in the database, it can add in
        if( usr == null){
            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
        }else{
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

}
