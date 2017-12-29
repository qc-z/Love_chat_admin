
function login(){
    var username = $("#loginUsername").val();
    var password = $("#loginPassword").val();
    console.log(username,password)
    if(!username){
        layer.confirm('请填写用户名',function(index){
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
    if(username && password){
        $.ajax({
        type: "POST",
        url: server + "/adminUserLogin",
        dataType: 'json',
        data: {userName:username,userPassword:password},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            if(result.ret==1){
                // layer.confirm('登陆成功，按确认将跳回首页',function(){
                    //这里是你点击确认后，要执行的事件
                    location.href="auditor.html";
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

$("body").keypress(function(e){
  if(e.keyCode === 13) {
    login()
  }
})

$("#login").click(function(){
        login()
    })





