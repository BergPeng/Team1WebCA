/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unogame.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Set;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.unogame.data.GameRooms;

@WebServlet("/checkroomname")
public class GameNameCheck extends HttpServlet{

    @Inject GameRooms gm;
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        Boolean IsRoomNameAva = true;
        Set<String> roomNames = gm.getRoom().keySet();
        String roomname = req.getParameter("room");
        System.out.println("The new room name is "+roomname);
        for(String name : roomNames){
            System.out.println(name);
            if(name.equals(roomname)){
                IsRoomNameAva = false;
                break;
            }
        }
        System.out.println(IsRoomNameAva);
        if(IsRoomNameAva == true){
            System.out.println("roomName ava");
            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
        }else{
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        
    }
    
}
