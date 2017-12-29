$(document).ready(function(e) {
  getInfo()
  //默认加载一个人的聊天记录
  localStorage.setItem("toid", getUrlParms("toid"));
  if(localStorage.getItem("othertoid")){
    getNew(getUrlParms("userid"),localStorage.getItem("othertoid"))
  }else{
    getNew(getUrlParms("userid"),localStorage.getItem("toid"))
  }
	$('#message_box').scrollTop($("#message_box")[0].scrollHeight + 20);
	
  var userid = getUrlParms("userid")
  localStorage.setItem("userid", getUrlParms("userid"));
  $('.user_list').on("click","li",function(){
      //点击头像与相对应的人聊天
      toid = $(this).attr("data-id")
      console.log(toid)
      $("small").removeClass("online")
      $(this).find("small").addClass("online")
      localStorage.setItem("othertoid", toid);
      getNew(userid,toid)
  })
	//点击发送
	$('.sub_but').click(function(event){
	    sendMessage();
	});
	
	/*按下按钮或键盘按键*/
  $(document).keydown(function(event){ 
      if(event.keyCode == 13){
          sendMessage();
      }
    });

  


	
});
//发送消息
function sendMessage(){
  var msg = $("#message").val();
  if(localStorage.getItem("othertoid")){
    sendMsg(localStorage.getItem("othertoid"),msg)
  }else{
    sendMsg(getUrlParms("toid"),msg)
  }
  if(msg.length == 0){
    return
  }
  var htmlData =   '<div class="msg_item fn-clear">'
                     + '<div class="floatRight">'
                      + '<div class="uface"><img src='+selfimg+' alt=""/></div>'
                      + '<div class="item_right">'
                        + '<div class="name_time">'+selfname+'</div>'
                        + '<div class="msg own">' + msg + '</div>'
                      + '</div>'
                     + '</div>'
                 + '</div>'
  $("#message_box").append(htmlData);
  $('#message_box').scrollTop($("#message_box")[0].scrollHeight + 20);
  $("#message").val('');
}
//拼接联系人
function addchatbox(data){
  var htmlData = ""
  if(data && data.length){
    for (var i = 0 ;i < data.length ; i++ ) {
      if(!data[i].user.avatar){
        var avatar = "images/hetu.jpg"
      }else{
        var avatar = data[i].user.avatar
      }
      htmlData +=   '<li class="fn-clear" data-id='+data[i].user._id+'>'
                  htmlData += '<span>'
                      htmlData += '<img src='+avatar+'>'
                  htmlData += '</span>'
                  htmlData += '<em>'+data[i].user.nickname+'</em>'
              if(!data[i].unReaderNews || data[i].unReaderNews == 0){
                  htmlData += '<em>&nbsp(0)</em>'
              }else{
                  htmlData += '<em>&nbsp('+data[i].unReaderNews+')</em>'
              }
                

              if(getUrlParms("toid") == data[i]._id){
                  htmlData += '<small class="online"></small>'
              }else{
                  htmlData += '<small></small>'
              }
        htmlData += '</li>'
    }
    
  $(".user_list").append(htmlData);
  }
}
//得到联系人信息
function sendMsg(to,msg){
  $.ajax({
        type: "POST",
        url: server+"/mockSendMsg",
        dataType: 'json',
        data:{msg:msg,to:to,id:localStorage.getItem("userid")},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            if(result.ret==4){
                alert("没有权限发消息，请联系管理员修改权限")  
            }
        },
        error: function () {
        }
    });
}

//得到联系人信息
function getInfo(){
  $.ajax({
        type: "GET",
        url: server+"/mockChatbox?userid="+getUrlParms("userid"),
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            if(result.ret==1){
                selfimg = result.user.avatar || "images/53f442834079a.jpg"
                selfname = result.user.nickname || "浪里小白龙"
                $(".uname").html(selfname)
                $("#selfimg").attr("src",selfimg)
                //聊天盒子联系人
                addchatbox(result.chats)
            }else{
                
            }
        },
        error: function () {
        }
    });
}
//得到与当前聊天对象的聊天记录
function getNew(userid,toid){
  // console.log(getUrlParms("userid"))
  $.ajax({
        type: "GET",
        url: server+"/mockReadMsg?userid="+userid+"&toid="+toid,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            if(result.ret==1){
                addrecord(result)
            }else{
                
            }
        },
        error: function () {
        }
    });
}

   

//拼接聊天记录
function addrecord(data){
  var msg = data.chats
  var oterimg = data.chatTo.avatar || "images/53f44283a4347.jpg"
  var othername = data.chatTo.nickname
  var selfimg = data.user.avatar || "images/53f442834079a.jpg"
  var selfname = data.user.nickname
  if(msg && msg.length !== 0){
    var other = ''
    for(var i = 0;i < msg.length; i++){
      if(msg[i].msgType == "text"){
        if(localStorage.getItem("userid") == msg[i].toid){
        //别人给我
         other += '<div class="msg_item fn-clear">'
            other += '<div class="uface"><img src="'+oterimg+'" alt=""/></div>'
            other += '<div class="item_right">'
              other += '<div class="name_time">'+othername+'</div>'
              other += '<div class="msg own">'+msg[i].content+'</div>'
            other += '</div>'
         other += '</div>'
      }else{
        //自己发的
        other += '<div class="msg_item fn-clear">'
            other += '<div class="floatRight">'
            other += '<div class="uface"><img src="'+selfimg+'" alt=""/></div>'
            other += '<div class="item_right">'
              other += '<div class="name_time">'+selfname+'</div>'
              other += '<div class="msg own">'+msg[i].content+'</div>'
            other += '</div>'
            other += '</div>'
         other += '</div>'
      }
      }//请求私照
    else if(msg[i].msgType == "requirePhotoPri" && localStorage.getItem("userid") == msg[i].toid && msg[i].photo == "ing"){
        other += '<div class="msg_item fn-clear">'
            other += '<div class="uface"><img src="'+oterimg+'" alt=""/></div>'
            other += '<div class="item_right">'
              other += '<div class="name_time">'+othername+'</div>'
              other += '<div class="msg own" id="buttons">对方请求你的私照<hr><button class="but agree" id="agree">同意</button><button class="but rejust" id="rejust" style="float:right">拒绝</button></div>'
            other += '</div>'
         other += '</div>'
    }else if(msg[i].msgType == "requirePhotoPri" && localStorage.getItem("userid") == msg[i].toid && msg[i].photo == "yes"){
        other += '<div class="msg_item fn-clear">'
            other += '<div class="floatRight">'       
            other += '<div class="uface"><img src="'+selfimg+'" alt=""/></div>'
            other += '<div class="item_right">'
              other += '<div class="name_time">'+selfname+'</div>'
              other += '<div class="msg own" id="buttons">已经同意对方的私照请求</div>'
            other += '</div>'
            other += '</div>'
         other += '</div>'
    }else if(msg[i].msgType == "requirePhotoPri" && localStorage.getItem("userid") == msg[i].toid && msg[i].photo == "no"){
        other += '<div class="msg_item fn-clear">'
            other += '<div class="floatRight">'
            other += '<div class="uface"><img src="'+selfimg+'" alt=""/></div>'
            other += '<div class="item_right">'
              other += '<div class="name_time">'+selfname+'</div>'
              other += '<div class="msg own" id="buttons">已经拒绝对方的私照请求</div>'
            other += '</div>'
            other += '</div>'
         other += '</div>'
    }     
}
    //清空聊天记录
    $("#message_box").html("")
    $("#message_box").append(other)
    var div = document.getElementById('message_box');
    div.scrollTop = div.scrollHeight;

  }
    

  //发送同意
  $(".agree").click(function(){
    if(localStorage.getItem("othertoid")){
      reply(localStorage.getItem("othertoid"),"yes",getUrlParms("userid"))
  }else{
    reply(localStorage.getItem("toid"),"yes",getUrlParms("userid"))
  }   
})


  //发送拒绝
  $(".rejust").click(function(){
    if(localStorage.getItem("othertoid")){
      reply(localStorage.getItem("othertoid"),"no",getUrlParms("userid"))
  }else{
    reply(localStorage.getItem("toid"),"no",getUrlParms("userid"))
  }   
  })

}


//同意或者拒绝私照请求
function reply(id,reply,userId){
  $.ajax({
        type: "POST",
        url: server+"/adminReplyPhotoPri",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        data:{id:id,reply:reply,userId:userId},
        crossDomain: true,
        success: function (result) {
            if(result.ret==1 && result.state == "yes"){
                window.location.href=window.location.href; 
            }if(result.ret==1 && result.state == "no"){
                window.location.href=window.location.href; 
            }
        },
        error: function () {
        }
    });
}


//得到地址栏参数
function getUrlParms(name){
   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
   var r = window.location.search.substr(1).match(reg);
   if(r!=null)
   return unescape(r[2]);
   return null;
}