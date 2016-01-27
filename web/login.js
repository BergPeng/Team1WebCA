$(function(){
    
    $("#btnLogin").on("click",function(){
        var usrid = $("#userid").val();
        var pwd = $("#pwd").val();
        console.log(usrid+"+"+pwd)
        $.ajax({
            url:"/UnoGame/authenticate",
            type:"POST",
            data:{"userid":usrid, "pwd":pwd},
            success:function(){
                alert("Login Successful")
                window.location.replace("/UnoGame/user/gamelist.jsp")
            },
            error:function(){
                alert("UserID or Password not correct!")
            }
        })
    })
})