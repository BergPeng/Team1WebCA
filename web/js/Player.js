$(function () {
//    var socket = null;

//    $("#connectBtn").on("click", function () {
        socket = new WebSocket("ws://localhost:19562/UnoGame/player/"
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
                    image.src = "unoPicture/" + msg.cardPicture;
                    subdiv.append(image);
                    $('#sup-div').append(subdiv);


                    ajaxAsyncRequest("CardServlet/give?cardId=" + msg.cardId);
                }
                if (msg.message === "starting deck") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    specialMessage("need 7 card", "deck");
                }
            } else if (msg.destination === "all") {
                if (msg.message === "lets begin") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    specialMessage("im ready", "deck");
                } else if (msg.message === "checkYo") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                    ajaxAsyncRequest("PlayerCheck");
                } else {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                    $("#chats").prepend($li);
                }
            } else if (msg.destination === "deck") {
                if (msg.message === "put 1 card") {
                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + " -> " + msg.cardId + ":" + msg.cardPicture);
                    $("#chats").prepend($li);
                    ajaxAsyncRequest("CardServlet/put?cardId=" + msg.cardId);
                }
            } else {
                $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
                $("#chats").prepend($li);
            }
        };
//    });

    var ready = function(){
        var msg = { 
            name: $("#name").val(),
            room: $("#room").val(),
            message: "I am ready",
            destination: $("#dest").val()
        };
        socket.send(JSON.stringify(msg));

    }
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
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: "need 1 card",
            destination: "deck"
        };
        socket.send(JSON.stringify(msg));
    });

    //put one card
    $('#sup-div button').live('click', function () {
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: "put 1 card",
            destination: "deck",
            cardId: $(this).attr('id')
        };
        socket.send(JSON.stringify(msg));
        $(this).remove();
        return false;
        //connect CardServlet, removing card from player HandCards 
        ajaxAsyncRequest("CardServlet/put?cardId=" + $(this).attr('id'));

    });
    var specialMessage = function (message, dest) {
        var msg = {
            name: $("#name").val(),
            room: $("#room").val(),
            message: message,
            destination: dest
        };
        socket.send(JSON.stringify(msg));
    };

    var ajaxAsyncRequest = function (reqURL)
    {
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

