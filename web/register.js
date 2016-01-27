$(function(){

    $("#btncheck").on("click",function(){
        var userid = $("#userid").val();
        console.log(userid);
        if(userid !== ""){
            $.ajax({
                url:"check",
                type: "GET",
            data: {"userid": userid}
            }).done(function(){
                $("#idmsg").text("UserID can be use.")
            }).fail(function(){
                $("#idmsg").text("Alredy have the User.")
            });
        };                
    });
    
    $("#btnConfirm").attr("disabled", true);
    console.log("hello");
    $("#confirmpwd").focusout(function(){
        console.log("here");
        var pwd = $("#pwd").val();
        var confirmpwd = $("#confirmpwd").val();
        
        if (pwd === confirmpwd){
            console.log("is the same");
            $("#btnConfirm").attr("disabled", false)
            $(".pwdmsg").text("");
        }else{
            $(".pwdmsg").text("password and confirm password not the same");
            
        }
    });
    
    $("#btnConfirm").on("click",function(){
        var usrid = $("#userid").val();
        var pwd = $("#pwd").val();
        var confirmpwd = $("#confirmpwd").val();
        var email = $("#email").val();
        var picture = $('input[name="picture"]:checked').val();
        console.log(usrid+"+"+pwd+"+"+confirmpwd+"+"+email+"+"+picture);
        $.ajax({
            url:"/UnoGame/register",
            type:"POST",
            data:{"userid":usrid,"pwd":pwd,"confirmpwd": confirmpwd, "email":email, "picture":picture},
            success: function () {
                alert("Register sucsessful");
                window.location.replace("login.html")
            },
            error: function (){
                alert("Register fail")
            }
        })    
    });
})