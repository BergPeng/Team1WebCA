<%-- 
    Document   : UnoGame
    Created on : Jan 19, 2016, 3:13:06 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Uno Game:Deck</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="lib/jquery-2.2.0.js"></script>
        <script src="UnoGame.js"></script>
        <link rel="stylesheet" type="text/css" href="unoCss.css">
    </head>
    <body style="margin:0px; background-image:url(unoPicture/background.jpg); background-repeat:repeat;">
        <div style="height:20px;"></div>
        <div id="deckShowDiv" style="margin:0px auto; width:640px">
            <div style="float:left; text-align:center;">
                <span style="font-size:36px;">Deck</span>
                <div style="height:10px;"></div>
                <div id="cardListDiv">
                    <img src="unoPicture/back.png" width="200" />
                </div>
            </div>
            <div style="float:left; width:60px; height:1px;"></div>
            <div style="float:left; text-align:center;">
                <span style="font-size:36px;">Open Card</span>
                <div style="height:10px;"></div>
                <!--<div id="discardDiv" class="discardDiv">-->
                    
                    <div id="discardDiv" class="discardDiv">
                        <img id="frontImage" src="unoPicture/back.png" width="200" />
                    </div>
                    
                <!--</div>-->
            </div>
            <div style="float:left; width:20px; height:1px;"></div>
            <div style="float:left; font-size:18px;">
                <div style="height:50px;"></div>
                Game Room Name : <br />
                <input type="text" name="room" id="room" readonly="readonly" value="${game.gameId}" style="width:120px; font-size:18px;">
                <div style="height:10px;"></div>
                Max Player : <br />
                <input type="text" name="maxPlayer" id="maxPlayer" readonly="readonly" value="${game.maxPlayer}" style="width:120px; font-size:18px;">
                <div style="height:10px;"></div>
                Round Limit : <br />
                <input type="text" name="roundLimit" id="roundLimit" readonly="readonly" value="${game.roundLimit}" style="width:120px; font-size:18px;">
                <div style="height:10px;"></div>
                <button id="connectBtn" style="font-size:18px;">Connect</button>
                <button id="startBtn" style="font-size:18px;">Start</button>
                <div style="height:10px;"></div>
                <button id="endRoundBtn" style="font-size:18px;">End Round</button>
                <div style="height:10px;"></div>
                <button id="exitGameBtn" style="font-size:18px;">Exit Game</button>
            </div>
            <div style="clear:both; height:30px;"></div>
        </div>
        <div id="allPlayerDiv">            

        <div style="clear:both;"></div>
        </div>
        <div style="overflow:auto; height: 100px;">
            <ul id="chats">
            </ul>
        </div>
        <div id="outPopUp" style="font-size:50px; text-align:center; border:2px solid black; 
             display:none; position:absolute;
             width:500px; height:300px; z-index:15;
             top:50%; left:50%; margin:-150px 0 0 -250px;
             background:white;">
            <div style="height:80px;"></div>
            Winner is : <span id="plWinner">Player 2</span><br />
            This Round Point : <span id="plScore">200</span>
            <div style="height:20px;"></div>
            <button id="newRoundBtn" style="font-size:24px;">New Round</button>
        </div>
    </body>
</html>
