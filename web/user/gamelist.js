$(document).ready(function () {
    
    $(".gameList").on("click", function () {
        var room = jQuery(this).attr("id");
        console.log(room);
        $.ajax({
            url:"http://localhost:19562/UnoGame/checkroom",
            type:"POST",
            data:{"room":room},
            success: function () {
                window.location.replace("http://localhost:19562/UnoGame/user/Player.jsp")
            }
        })
    })
    
    $("#btnlogout").on("click",function(){
        $.ajax({
           url: "http://localhost:19562/UnoGame/logout",
           success: function(){
               window.location.replace("http://localhost:19562/UnoGame/index.html")
           } 
        })
                
           
        });
    })
  

//                .done(function(){
//                 socket = new WebSocket("ws://localhost:30044/UnoGame/player/"
//                + room);
//        socket.onopen = function () {
//            
//        };
//        socket.onmessage = function (evt) {
//            var msg = JSON.parse(evt.data);
//            var $li = $("<li>");
//            
//            if(msg.destination === $("#name").val()){
//                if(msg.message === "give 1 card"){
//                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination + " -> " + msg.cardId + ":" + msg.cardPicture);
//                    $("#chats").prepend($li);
//                }
//            } else if(msg.destination === "all"){
//                if(msg.message === "game start"){
//                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
//                    $("#chats").prepend($li);
//                    specialMessage("need 7 card", "deck");
//                } else {
//                    $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
//                    $("#chats").prepend($li);
//                }
//            } else {
//                $li.text("[" + msg.name + "] " + msg.message + ":" + msg.destination);
//                $("#chats").prepend($li);
//            }
//        };              
//        }).fail(function(){
//            alert("home already full")
//        })
//    });
//
//    $("#msgBtn").on("click", function () {
//        var msg = {
//            name: $("#name").val(),
//            room: $("#room").val(),
//            message: $("#msg").val(),
//            destination : $("#dest").val()
//        };
//        socket.send(JSON.stringify(msg));
//    });
//    
//    var specialMessage = function (message, dest) {
//        var msg = {
//            name: $("#name").val(),
//            room: $("#room").val(),
//            message: message,
//            destination : dest
//        };
//        socket.send(JSON.stringify(msg));
//    };
//});
