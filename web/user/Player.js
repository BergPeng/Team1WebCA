$(function () {
    var socket = null;
    $("#changeColor").hide();
    $("#connectBtn").on("click", function () {
        socket = new WebSocket("ws://localhost:19562/UnoGame/user/player/"
                + $("#room").val());
        socket.onopen = function () {
            $("#uppercase-msg").text("connected");
        };
        socket.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            var $li = $("<li>");

            if (msg.destination === $("#name").val()) {
                if (msg.message === "give 1 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + " -> " + msg.cardId + ":" + msg.cardPicture);
                    $("#chats").prepend($li);

                    // show the card list image
                    var subdiv = $("<button>", {id: msg.cardId, class: "sub-div"});
                    var image = new Image();
                    image.src = "/UnoGame/unoPicture/" + msg.cardPicture;
                    subdiv.append(image);
                    $('#sup-div').append(subdiv);

                    ajaxAsyncRequest("CardServlet/give?cardId=" + msg.cardId);
                }
                if (msg.message === "tell turn") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    //...
                    //buttons enabled,disabled for current player
                    $("#needBtn").attr("disabled", false);
                    $("#endTurnBtn").attr("disabled", false);
                    enableElements($("#sup-div").children());
                    //...
                }
                if (msg.message === "tell turn1") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    //...
                    //buttons enabled,disabled for current player
                    $("#needBtn").attr("disabled", false);
                    $("#endTurnBtn").attr("disabled", false);
                    enableElements($("#sup-div").children());
                    //...
                }
                if (msg.message === "put 1 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + " -> " + msg.cardId + ":" + msg.cardPicture);
                    $("#chats").prepend($li);
                    put1CardAjax(msg.cardId);
                }
                if (msg.message === "returnLastCard") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + " -> " + msg.cardId + "(" + msg.color + ");" + msg.refCardId);
                    $("#chats").prepend($li);
                    var text11 = msg.cardId;
                    var thisCardId = msg.refCardId;
                    var color = msg.color;
                    if (text11.charAt(0) === 'k') {
                        var textC = "";
                        if(color === "red")
                            textC = "r";
                        else if (color === "yellow")
                            textC = "y";
                        else if (color === "green")
                            textC = "g";
                        else if (color === "blue")
                            textC = "b";
                        
                        if (textC === thisCardId.charAt(0)) {
                            $("#" + thisCardId).remove();
                            passCard(thisCardId, "nono");
                        } else {
                            alert('Sorry! You cannot put this card!');
                        }
                    } else if (thisCardId.charAt(0) === 'k') {
                        $("#changeColor").show();
                        $("#chgBtn").on('click', function () {
                            var newCardId = $("select option:selected").val();

                            //console.log("new color ===>" + newCardId);
                            $("#" + thisCardId).remove();
                            //changeColor(thisCardId, newCardId);
                            passCard(thisCardId, newCardId);
                        });
                    } else if (text11.charAt(0) === thisCardId.charAt(0) && thisCardId.charAt(0) !== 'k') {
                        $("#" + thisCardId).remove();
                        passCard(thisCardId, "nono");
                    } else if (text11.substring(1, 3) === thisCardId.substring(1, 3)) {
                        $("#" + thisCardId).remove();
                        passCard(thisCardId, "nono");
                    } else {
                        alert('Sorry! You cannot put this card!');
                    }
                }
            } else if (msg.destination === "all") {
                if (msg.message === "start round") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    playerRoundStartAjax();
                }
                if (msg.message === "lets begin") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    specialMessage("im ready", "deck");
                }
                if (msg.message === "starting deck") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    specialMessage("need 7 card", "deck");
                }
                if (msg.message === "checkYo") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    ajaxAsyncRequest("PlayerCheck");
                }
                if (msg.message === "lets end round") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    calculateScoreAjax();
                }
                if (msg.message === "no winner") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + "->" + msg.round);
                    $("#chats").prepend($li);
                    //addScoreAjax(msg.round, 0);
                }
                if (msg.message === "we have winner") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + "->" + msg.round + ":" + msg.winner + ":" + msg.point);
                    $("#chats").prepend($li);
                    if($("#name").val() === msg.winner)
                        addScoreAjax(msg.round, msg.point);
                    else
                        addScoreAjax(msg.round, 0);
                }
            } else if (msg.destination === "deck") {

            } else {

            }
        };
    });

    $("#msgBtn").on("click", function () {
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: $("#msg").val(),
            destination: $("#dest").val()
        };
        socket.send(JSON.stringify(msg));
    });
    $("#needBtn").on("click", function () {
        //...buttons enabled,disabled for current player
        $("#needBtn").attr("disabled", true);
        $("#endTurnBtn").attr("disabled", false);
        enableElements($("#sup-div").children());
        //...
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: "need 1 card",
            destination: "deck"
        };
        socket.send(JSON.stringify(msg));
    });
    $("#endTurnBtn").on("click", function () {
        //buttons enabled,disabled for current player
        $("#needBtn").attr("disabled", true);
        $("#endTurnBtn").attr("disabled", true);
        
        disableElements($("#sup-div").children());
        //...
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: "end turn",
            destination: "deck"
        };
        socket.send(JSON.stringify(msg));
    });

    //put one card
    $('#sup-div button').live('click', function () {
        var thisCardId = $(this).attr('id');
        $("#endTurnBtn").attr("disabled", false);
        console.log("discard is ====>" + thisCardId);

        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: "getLastCard",
            destination: "deck",
            refCardId: thisCardId
        };
        socket.send(JSON.stringify(msg));
        // var request;
//        request = $.ajax({
//            url: "GetPreCard",
//            type: "post"
//        });
//        request.done(function (text11) {
//            if (text11.charAt(0) === 'k') {
//
//                console.log("preCard is ====>" + text11);
//
//                var request;
//                if (request) {
//                    request.abort();
//                }
//                event.preventDefault();
//                request = $.ajax({
//                    url: "GetColor",
//                    type: "get",
//                    data: {cardId: text11},
//                    success: function (text) {
//
//                        console.log("change color to ====>" + text);
//
//                        if (text === thisCardId.charAt(0)) {
//                            $("#" + thisCardId).remove();
//                            passCard(thisCardId);
//                        } else {
//                            alert('Sorry! You cannot put this card!');
//                        }
//                    },
//                    error: function () {
//
//                    }
//                });
//            } else if (text11.charAt(0) === 'c') {
//                $("#" + thisCardId).remove();
//                passCard(thisCardId);
//            } else if (thisCardId.charAt(0) === 'k') {
//                $("#changeColor").show();
//                $("#chgBtn").on('click', function () {
//                    newCardId = $("select option:selected").val();
//
//                    console.log("new color ===>" + newCardId);
//                    $("#" + thisCardId).remove();
//                    changeColor(thisCardId, newCardId);
//                    passCard(thisCardId);
//                });
//            } else if (text11.charAt(0) === thisCardId.charAt(0) && thisCardId.charAt(0) !== 'k') {
//                $("#" + thisCardId).remove();
//                passCard(thisCardId);
//            } else if (text11.substring(1, 3) === thisCardId.substring(1, 3)) {
//                $("#" + thisCardId).remove();
//                passCard(thisCardId);
//            } else {
//                alert('Sorry! You cannot put this card!');
//            }
//        });
    });

    //make button disabled/enabled here as player turn
    var disableElements = function (ele) {
        for (var i = 0; i < ele.length; i++) {
            ele[i].disabled = true;
            disableElements(ele[i].children);
        }
    };

    var enableElements = function (ele) {
        for (var i = 0; i < ele.length; i++) {
            ele[i].disabled = false;
            enableElements(ele[i].children);
        }
    };


    var passCard = function (thisCardId, color) {
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: "put 1 card",
            destination: $("#name").val(),
            cardId: thisCardId,
            color: color
        };
        socket.send(JSON.stringify(msg));
    };

    var changeColor = function (cardId, newColor) {
        $("#changeColor").hide();
        var request;
        request = $.ajax({
            url: "ChangeColor",
            type: "post",
            data: {cardId: cardId, newColor: newColor}
        });
        request.done(function () {

        });
    };

//    $("#putBtn").on("click", function () {
//        var msg = {
//            name: $("#name").val(),
//            room: $("#room").val(),
//            message: "put 1 card",
//            destination: $("#name").val(),
//            cardId: $("#cardId").val()
//        };
//        socket.send(JSON.stringify(msg));
//    });

    var playerRoundStartAjax = function () {
        var request;

        request = $.ajax({
            url: "PlayerRoundStart",
            type: "get",
            success: function () {

            },
            error: function () {

            }
        });
    };
    var calculateScoreAjax = function () {
        var request;

        request = $.ajax({
            url: "CalculateScore",
            type: "get",
            success: function (text11) {
                var array_data = String(text11).split(";");
                scoreMessage("player score", "deck", array_data[0], array_data[1]);
            },
            error: function () {

            }
        });
    };
    var addScoreAjax = function (par1, par2) {
        var request;

        request = $.ajax({
            url: "PlayerAddScore",
            type: "get",
            data: {round: par1, score:par2},
            success: function () {

            },
            error: function () {

            }
        });
    };
    var put1CardAjax = function (par1) {
        var request;

        request = $.ajax({
            url: "CardServlet/put",
            type: "get",
            data: {cardId: par1},
            success: function (text11) {
                if(text11 === "0"){ // if this is last card, and player win
                    specialMessage("lets end round","all");
                }
            },
            error: function () {

            }
        });
    };

    var specialMessage = function (message, dest) {
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: message,
            destination: dest
        };
        socket.send(JSON.stringify(msg));
    };
    var scoreMessage = function (message, dest, score, totalCard) {
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: message,
            destination: dest,
            score: score,
            totalCard : totalCard
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
});

