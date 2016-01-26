<%-- 
    Document   : Player
    Created on : Jan 19, 2016, 5:24:43 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Uno Game:Player</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="../lib/jquery-2.2.0.js"></script>
        <script src="../lib/jquery-1.7.1.js"></script>
        <script src="Player.js"></script>
        <link rel="stylesheet" type="text/css" href="unoCss.css">
        <link rel="stylesheet" type="text/css" href="PlayerViewStyle.css">
    </head>
    <body style="margin:0px; background-image:url(../unoPicture/background.jpg); background-repeat:repeat;">
        <div style="height:20px;"></div>
        <div style="font-size:18px; margin:0px auto; width:600px;">
            Name : 
            <input type="text" id="name" size="30" readonly="readonly" value="${player.playerId}" style="width:120px; font-size:18px;">
            <div style="height:5px;"></div>
            Game Room Name : 
            <input type="text" name="room" id="room" value="${room}" style="width:120px; font-size:18px;">
            <div style="height:5px;"></div>
            <button id="connectBtn" style="font-size:18px;">Connect</button>
            <hr ><br>
            <button id="needBtn" style="font-size:18px;" disabled="true">Draw</button>
            <button id="endTurnBtn" style="font-size:18px;" disabled="true">End Turn</button>
        </div>
        <div style="height:20px;"></div>
        <!--
        <div id="deckShowDiv" style="margin:0px auto; width:600px;">
            <div style="width:485px;">
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
                <button id="b072" class="sub-div"><img src="unoPicture/c0_00.png" width="200" /></button>
            </div>
        </div>
        -->
        
        <!-- Show Player Card List-->
        <div id="changeColor">
            <select >
                <option value="b">Blue</option>
                <option value="g">Green</option>
                <option value="r">Red</option>
                <option value="y">Yellow</option>
            </select>
            <button id="chgBtn">Submit</button>
        </div>
        <div id="sup-div"></div> 
        <!-- End Player Card List-->
        
        <div style="overflow:auto; height: 100px;">
            <ul id="chats">
            </ul>
        </div>
    </body>
</html>
