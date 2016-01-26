/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unogame.controller;

import com.unogame.biz.UserManager;
import com.unogame.model.Hashgenerator;
import java.io.IOException;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/register")
public class register extends HttpServlet {

    @Inject
    UserManager um;
    
        
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        System.out.println("I am in register");
        String id = req.getParameter("userid");
        String pwd = req.getParameter("pwd");
        
        
        System.out.println(pwd);
        String confirmpwd = req.getParameter("confirmpwd");
        String email = req.getParameter("email");
        String picture = req.getParameter("picture");
        String groupid = "user";
        
        System.out.println(um.getByName(id));
        if(um.getByName(id)==null){
            if (pwd.equals(confirmpwd)) {
                
                Hashgenerator hashcode = new Hashgenerator();
                String password = hashcode.generateHash(req.getParameter("pwd")) ;
                System.out.println("Hello I going to create");
                um.create(id, password, email, picture,groupid);
                
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        }else{
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

};
    

