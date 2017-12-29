
function login(){
    var mobile = $("#loginUsername").val();
    var password = $("#loginPassword").val();
    console.log(mobile,password)
    if(!mobile){
        layer.confirm('请填写手机号',function(index){
            layer.close(index);
            });
        return;
    }
    if(!password){
        layer.confirm('请填写密码',function(index){
            layer.close(index);
            });
        return;
    }
    if(mobile && password){
        $.ajax({
        type: "POST",
        url: server + "/agent/mngagentLogin",
        dataType: 'json',
        data: {mobile:mobile,password:password},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            if(result.ret==1){
                // layer.confirm('登陆成功，按确认将跳回首页',function(){
                    //这里是你点击确认后，要执行的事件
                    location.href="agent.html";
                // });
            }else{
                layer.confirm(result.err,function(index){
                    //这里是你点击确认后，要执行的事件
                    layer.close(index);
                    $("#loginUsername").val("");
                    $("#loginPassword").val("");
                });
            }
        },
        error: function () {
        }
    });
    }
}



function regist(){
    var registUsername = $("#nickname").val();
    var registPassword = $("#password").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val() || "";
    var role = $("#type").val();
    if(!registUsername){
        layer.confirm('请填写用户名',function(index){
            layer.close(index);
            });
        return;
    }
    if(!registPassword){
        layer.confirm('请填写密码',function(index){
            layer.close(index);
            });
        return;
    }
    if(!mobile){
        layer.confirm('请填写手机号',function(index){
            layer.close(index);
            });
        return;
    }
    var data = {
        nickname:registUsername,
        password:registPassword,
        email:email,
        role:role,
        mobile:mobile,
    }
        $.ajax({
        type: "POST",
        url: server + "/agent/mngagentSignup",
        dataType: 'json',
        data: data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            if(result.ret==1){
                location.href="login.html";     
            }else{
                layer.confirm(result.err,function(index){
                    //这里是你点击确认后，要执行的事件
                    layer.close(index);
                    $("#nickname").val("");
                    $("#password").val("");
                    $("#mobile").val("");
                    $("#email").val("");
                    $("#type").val("");
                });
            }
        },
        error: function () {
        }
    });
    }
// $("body").keypress(function(e){
//   if(e.keyCode === 13) {
//     login()
//   }
// })

$("#login").click(function(){
        login()
    })
$("#regist").click(function(){
        regist()
    })





