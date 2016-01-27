$(function () {
    var socket = null;
    var howManySaid = 0;
    var signsign = 0;
    var totalPlayer = 0;
    var tempPlayer = 0;
    console.log($("#room").val())

    $("#connectBtn").on("click", function () {
        socket = new WebSocket("ws://"+window.location.host+"/UnoGame/game/"
                + $("#room").val());
        socket.onopen = function () {
            $("#uppercase-msg").text("connected");
        };
        socket.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            var $li = $("<li>");
            if (msg.destination === "deck") {
                if (msg.message === "im ready") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    
                    //show player in Deck
                    var playerdiv = $("<div>", {class: "playerDiv"});
                    var img = $(document.createElement('img'));
                    img.attr('src', "unoPicture/1.jpg");
                    img.addClass("playerImage");
                    playerdiv.append(img);
                    
                    var namediv = $("<div>", {class:"playerName", text: msg.name});
                    playerdiv.append(namediv);
                    var carddiv = $("<input>", {class:"numberOfCard", id: msg.name+"Number", type:"text", value:"0"});
                    playerdiv.append(carddiv);
                    $('#allPlayerDiv').append(playerdiv);
                    
                    img.appendTo('#imagediv');
                    $('#allPlayerDiv').append(playerdiv);
                    
                    totalPlayer++;
                    addPlayerAjax(msg.name);
                }
                if (msg.message === "start game") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    gameStartAjax();
                }
                if (msg.message === "open first card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    openFirstCardAjax();
                }
                if (msg.message === "need 1 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    giveCardAjax(msg.name);
                }
                if (msg.message === "need 7 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    giveCardAjax(msg.name);
                    giveCardAjax(msg.name);
                    giveCardAjax(msg.name);
                    giveCardAjax(msg.name);
                    giveCardAjax(msg.name);
                    giveCardAjax(msg.name);
                    giveCardAjax(msg.name);
                }
                if (msg.message === "prepare turn") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + "->" + msg.cardId + ":" + msg.cardPicture);
                    $("#chats").prepend($li);
                    // put first card here

                    //show first open card                
                    document.getElementById("frontImage").src = "unoPicture/" + msg.cardPicture;

                    tellTurnAjax();
                }
                if (msg.message === "prepare turn1") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    tellTurnAjax();
                }
                if (msg.message === "end turn") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    if (signsign === 1) {
                        signsign = 0;
                        tellTurn1Ajax();
                    } else {
                        getTellNextTurnAjax();
                    }
                    //getNextTurnAjax();
                }
                if (msg.message === "normal card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    getNextTurnAjax();
                }
                if (msg.message === "plus 2 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    get2CardAjax();
                }
                if (msg.message === "plus 4 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    get4CardAjax();
                }
                if (msg.message === "skip card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    getNextTurnAjax();
                    getNextTurnAjax();
                }
                if (msg.message === "reverse card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    getReverseAjax();
                }
                if (msg.message === "Wild Card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
//                    getReverseAjax();
                }
                if (msg.message === "player score") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + "->" + msg.score + "& " + msg.totalCard + " card(s)");
                    $("#chats").prepend($li);
                    receiveScoreAjax(msg.name, msg.score, msg.totalCard);
                }
                if (msg.message === "close round") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    closeRoundAjax();
                }
                if (msg.message === "CanNewRound") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + ".." + msg.cann);
                    $("#chats").prepend($li);
                    if(msg.cann === "can"){                        
                        document.getElementById("newRoundBtn").style.display = "inline";
                        document.getElementById("exitBtn").style.display = "none";
                    } else {
                        document.getElementById("newRoundBtn").style.display = "none";
                        document.getElementById("exitBtn").style.display = "inline";
                    }
                }
                if (msg.message === "getLastCard"){
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + "->" + msg.refCardId);
                    $("#chats").prepend($li);
                    getLastCardAjax(msg.name, msg.refCardId);
                }
            } else if (msg.destination === "all") {
                if (msg.message === "start round") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    
                    roundStartAjax();
                }
                if (msg.message === "checkYo") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    ajaxAsyncRequest("GameCheck");
                }
                if (msg.message === "lets begin") {
                    howManySaid = 0;
                }
                if (msg.message === "no winner") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + "->" + msg.round);
                    $("#chats").prepend($li);
                    $("#plWinner").text("no winner");
                    $("#plScore").text(0);
                    $("#plRound").text(msg.round);
                    document.getElementById("outPopUp").style.display = "block";
                    canNewRoundAjax();
                }
                if (msg.message === "we have winner") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + "->" + msg.round + ":" + msg.winner + ":" + msg.point);
                    $("#chats").prepend($li);
                    $("#plWinner").text(msg.winner);
                    $("#plScore").text(msg.point);
                    $("#plRound").text(msg.round);
                    document.getElementById("outPopUp").style.display = "block";
                    canNewRoundAjax();
                }
                if (msg.message === "lets end round") {
                    tempPlayer = 0;
                }
            } else {
                if (msg.message === "tell turn") {
                    $(".numberOfCard").attr("value",'0');
                    specialMessage("starting deck", "all");
                }
                if (msg.message === "put 1 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + " -> " + msg.cardId + ":" + msg.cardPicture);
                    $("#chats").prepend($li);
                    
                    //replace with open card
                    document.getElementById("frontImage").src = "unoPicture/" + msg.cardPicture;
                    
                    var currentNum=parseInt($("#"+msg.name+"Number").attr("value"));
                    currentNum--;
                    $("#"+msg.name+"Number").attr("value",currentNum);
                    
                    
                    signsign = 1;
                    
                    put1CardAjax(msg.cardId, msg.color);
                }
            }
        };
    });

    $("#msgBtn").on("click", function () {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: $("#msg").val(),
            destination: $("#dest").val()
        };
        socket.send(JSON.stringify(msg));
    });
    $("#startBtn").on("click", function () {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: "lets begin",
            destination: "all"
        };
        socket.send(JSON.stringify(msg));
    });
    $("#endRoundBtn").on("click", function () {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: "lets end round",
            destination: "all"
        };
        socket.send(JSON.stringify(msg));
    });
    $("#newRoundBtn").on("click", function () {
		document.getElementById("outPopUp").style.display = "none";
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: "start round",
            destination: "all"
        };
        socket.send(JSON.stringify(msg));
    });

    var giveCardAjax = function (dest) {
        var request;
        
        var currentNum=parseInt($("#"+dest+"Number").attr("value"));
        currentNum++;
        $("#"+dest+"Number").attr("value",currentNum);

        request = $.ajax({
            url: "GetOneCard",
            type: "post"
        });
        request.done(function (text11) {
            if (text11 === "0")
                specialMessage("lets end round", "all");
            else
                giveCardMessage("give 1 card", dest, text11);
        });
    };
    var addPlayerAjax = function (par) {
        var request;

        request = $.ajax({
            url: "AddPlayer",
            type: "get",
            data: {playerId: par},
            success: function () {
                if (howManySaid === 0) {
                    specialMessage("start game", "deck");
                    howManySaid++;
                }
            },
            error: function () {

            }
        });
    };
    var gameStartAjax = function () {
        var request;

        request = $.ajax({
            url: "GameStartEffect",
            type: "get",
            success: function () {
                specialMessage("open first card", "deck");
            },
            error: function () {

            }
        });
    };
    var openFirstCardAjax = function () {
        var request;

        request = $.ajax({
            url: "OpenFirstCard",
            type: "get",
            success: function (text11) {
//                if(text11.charAt(0)==='k'){
//                    openFirstCardAjax();
//                }
                var array_data = String(text11).split(";");
                giveCard12Message("prepare turn", "deck", array_data[0], array_data[1]);
            },
            error: function () {

            }
        });
    };
    var roundStartAjax = function () {
        var request;

        request = $.ajax({
            url: "RoundStartEffect",
            type: "get",
            success: function () {
                specialMessage("open first card", "deck");
            },
            error: function () {

            }
        });
    };
    var tellTurnAjax = function () {
        var request;

        request = $.ajax({
            url: "GetCurrentTurn",
            type: "get",
            success: function (text11) {
                specialMessage("tell turn", text11);
            },
            error: function () {

            }
        });
    };
    console.log(signsign);
    var put1CardAjax = function (par, par2) {
        var request;

        request = $.ajax({
            url: "ChangeDiscardedCard",
            type: "get",
            data: {cardId: par, color: par2},
            success: function () {
                if (par.charAt(1) === "0") {
                    specialMessage("normal card", "deck");
                }
                if (par.charAt(1) === "1" && par.charAt(2) === "0") {
                    specialMessage("skip card", "deck");
                }
                if (par.charAt(1) === "1" && par.charAt(2) === "1") {
                    specialMessage("reverse card", "deck");
                }
                if (par.charAt(1) === "1" && par.charAt(2) === "2") {
                    specialMessage("plus 2 card", "deck");
                }
                if (par.charAt(1) === "1" && par.charAt(2) === "3") {
                    specialMessage("Wild Card", "deck");
                }
                if (par.charAt(1) === "1" && par.charAt(2) === "4") {
                    specialMessage("plus 4 card", "deck");
                }
            },
            error: function () {

            }
        });
    };
    var tellTurn1Ajax = function () {
        var request;

        request = $.ajax({
            url: "GetCurrentTurn",
            type: "get",
            success: function (text11) {
                specialMessage("tell turn1", text11);
            },
            error: function () {

            }
        });
    };
    var getTellNextTurnAjax = function () {
        var request;

        request = $.ajax({
            url: "GetNextTurn",
            type: "get",
            success: function (text11) {
                specialMessage("tell turn1", text11);
            },
            error: function () {

            }
        });
    };
    var getNextTurnAjax = function () {
        var request;

        request = $.ajax({
            url: "GetNextTurn",
            type: "get",
            success: function (text11) {
                //specialMessage("tell turn1", text11);
            },
            error: function () {

            }
        });
    };
    var get2CardAjax = function () {
        var request;

        request = $.ajax({
            url: "GetNextTurn",
            type: "get",
            success: function (text11) {
                giveCardAjax(text11);
                giveCardAjax(text11);
                //specialMessage("tell turn1", text11);
            },
            error: function () {

            }
        });
    };
    var get4CardAjax = function () {
        var request;

        request = $.ajax({
            url: "GetNextTurn",
            type: "get",
            success: function (text11) {
                giveCardAjax(text11);
                giveCardAjax(text11);
                giveCardAjax(text11);
                giveCardAjax(text11);
                //specialMessage("tell turn1", text11);
            },
            error: function () {

            }
        });
    };
    var getReverseAjax = function () {
        var request;

        request = $.ajax({
            url: "GetReverse",
            type: "get",
            success: function (text11) {
                getNextTurnAjax();
//                specialMessage("tell turn1", text11);
            },
            error: function () {
            }
        });
    };
    var receiveScoreAjax = function (par1, par2, par3) {
        var request;
        request = $.ajax({
            url: "ReceiveScore",
            type: "get",
            data: {playerId: par1, scoreId: par2, totalCard: par3},
            success: function () {
                tempPlayer++;
                if (tempPlayer === totalPlayer)
                    specialMessage("close round", "deck");
            },
            error: function () {
            }
        });
    };
    var closeRoundAjax = function () {
        var request;

        request = $.ajax({
            url: "EndRound",
            type: "get",
            success: function (text11) {
                var array_data = String(text11).split(";");
                if (array_data[0] === "0")
                    drawMessage("no winner", "all", array_data[1]);
                else {
                    winnerMessage("we have winner", "all", array_data[0], array_data[1], array_data[2]);
                }
            },
            error: function () {
            }
        });
    };
    var canNewRoundAjax = function () {
        var request;

        request = $.ajax({
            url: "CanNewRound",
            type: "get",
            success: function (text11) {
                canNewRoundMessage("CanNewRound","deck",text11);
            },
            error: function () {
            }
        });
    };
    var getLastCardAjax = function (dest,ref) {
         var request;
        request = $.ajax({
            url: "GetPreCard",
            type: "post"
        });
        request.done(function (text11) {
            var array_data = String(text11).split(";");
            giveCard20Message("returnLastCard",dest,array_data[0],array_data[1],ref);
        });
    };

    var giveCardMessage = function (message, dest, cardId) {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: message,
            destination: dest,
            cardId: cardId
        };
        socket.send(JSON.stringify(msg));
    };
    var giveCard20Message = function (message, dest, cardId, color, refCardId) {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: message,
            destination: dest,
            cardId: cardId,
            color: color,
            refCardId: refCardId
        };
        socket.send(JSON.stringify(msg));
    };
    var giveCard12Message = function (message, dest, cardId, cardPicture) {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: message,
            destination: dest,
            cardId: cardId,
            cardPicture: cardPicture
        };
        socket.send(JSON.stringify(msg));
    };
    var winnerMessage = function (message, dest, round, winner, point) {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: message,
            destination: dest,
            round: round,
            winner: winner,
            point: point
        };
        socket.send(JSON.stringify(msg));
    };
    var drawMessage = function (message, dest, round) {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: message,
            destination: dest,
            round: round
        };
        socket.send(JSON.stringify(msg));
    };
    var specialMessage = function (message, dest) {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: message,
            destination: dest
        };
        socket.send(JSON.stringify(msg));
    };
    var canNewRoundMessage = function (message, dest, cann) {
        var msg = {
            name: "deck",
            room: $("#room").val(),
            message: message,
            destination: dest,
            cann: cann
        };
        socket.send(JSON.stringify(msg));
    };

    var ajaxAsyncRequest = function (reqURL) {
        //Creating a new XMLHttpRequest object
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest(); //for IE7+, Firefox, Chrome, Opera, Safari
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //for IE6, IE5
        }
        //Create a asynchronous GET request
        xmlhttp.open("GET", reqURL, true);

        //When readyState is 4 then get the server output
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200)
                {
                    //document.getElementById("message").innerHTML = xmlhttp.responseText;
                    //alert(xmlhttp.responseText);
                } else
                {
                    alert('Something is wrong !!');
                }
            }
        };

        xmlhttp.send(null);
    };

$("#btnCheck").on("click",function(){
    var msg = {
            name: "deck",
            room: $("#room").val(),
            message: "checkYo",
            destination: "all"
        };
        socket.send(JSON.stringify(msg));
})

});

