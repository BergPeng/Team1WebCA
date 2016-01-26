$(function (){
    
    $("#maxValue").text($("#maxPlayer").val());
    $("#roomName").focusout(function(){
        
        var room = $("#roomName").val();
        console.log(room)
        $.ajax({
            url:"http://localhost:19562/UnoGame/checkroomname",
            type:"Get",
            data:{"room":room},
            success: function () {
                $("#msg").text("name avaiable");
            },
            error:function(){
                $("#msg").text("room already exist, pls change")
            }
        })    
    })
    
    
    
    
    $("#maxPlayer").on("change",function(){
        $("#maxValue").text($("#maxPlayer").val());
        
    })
    
    
})


