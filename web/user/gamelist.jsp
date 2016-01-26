<%-- 
    Document   : gamelist
    Created on : Jan 18, 2016, 1:13:03 PM
    Author     : tobenothing
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script src="../lib/jquery-2.2.0.js"></script>
        <script src="gamelist.js"></script>
        <link rel="stylesheet" type="text/css" href="style1.css">
        <title>Game List</title>
    </head>
    <body>
        <div id="weclome">Welcome <%= request.getRemoteUser() %></div>
        <div><button id="btnlogout">Logout</button></div>
        <ul>
            <c:forEach var = "ga" items="${gameRooms.room.values()}" >
                <li id="${ga.gameId}" class="gameList">
                    <div  >
                        <span>${ga.gameId}</span><br/>
                        Join Player: ${ga.playerList.size()}<br/>
                        Max Number:${ga.maxPlayer}<br/>

                    </div>
                </li>
            </c:forEach>
        </ul>
    </body>
</html>
