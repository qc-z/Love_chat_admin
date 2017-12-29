//加载时把照片记录
  var imgObject = {}
  imgObject.common = [];
  imgObject.pub = []
//加载时请求列表
window.onload = function(){
  var mobile = window.location.search.split("=")[1]
  var val = 1
	$.ajax({
            type: "GET",
            url: server + "/mockUserList?mobile="+mobile,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
                console.log(res.results[0])
                edit(res)
            },
            error: function () {
            }
        });
}

function edit(res){
    var data = res.results[0]
    //昵称
    if(data.nickname){
        $("#name").val(data.nickname)
    }
    //性别,照片类型
    if(data.sex == 1){
      val = 1
        //男
        $("#sex select").find("option[value='1']").attr("selected",true);
        //把男的显示
        $("#con4").css("display","block")
        $("#con5").css("display","block")
        $("#con6").css("display","block")
        //把女的隐藏
        $("#con7").css("display","none")
        $("#con8").css("display","none")
        $("#con9").css("display","none")
        $("#con10").css("display","none")
        //隐藏女性标签
    $("#manselfInfo").css("display","block")
    $("#womenselfInfo").css("display","none")
    //隐藏男性个性签名
    $("#mancharacter").css("display","block")
    $("#womencharacter").css("display","none")

    }else if(data.sex == 2){
      val = 2
        //女
        $("#sex select").find("option[value='2']").attr("selected",true);
        //把女的显示
        $("#con4").css("display","none")
        $("#con5").css("display","none")
        $("#con6").css("display","none")
        //把女的隐藏
        $("#con7").css("display","block")
        $("#con8").css("display","block")
        $("#con9").css("display","block")
        $("#con10").css("display","block")
        //隐藏男性标签
    $("#manselfInfo").css("display","none")
    $("#womenselfInfo").css("display","block")

    //隐藏男性个性签名
    $("#mancharacter").css("display","none")
    $("#womencharacter").css("display","block")
    }
    //年龄    
    if(data.age){
        $("#age").val(data.age)
    }
    //地址
    if(data.addr){
        $("#area").val(data.addr)
    }
    //手机号
    if(data.mobile){
        $("#phone").val(data.mobile)
    }
    //是否vip
    if(data.vip){
        for(var i = 0;i < $("#isvip input").length;i++){
        if(data.vip.role){
            var flag = 1
        }else{
            var flag = 0
        }
          if($("#isvip input")[i].value == flag){
              $($("#isvip input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#isvip input")[i]).attr("checked","checked")
          }
        }
    }
    

    //宠爱指数
    if(data.lovePrice){
        for(var i = 0;i < $("#lovePrice input").length;i++){
          if($("#lovePrice input")[i].value == data.lovePrice){
              $($("#lovePrice input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#lovePrice input")[i]).attr("checked","checked")
          }
        }
    }
    //甜蜜目标
    if(data.loveDate){
        for(var i = 0;i < $("#loveDate input").length;i++){
          if($("#loveDate input")[i].value == data.loveDate){
              $($("#loveDate input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#loveDate input")[i]).attr("checked","checked")
          }
        }
    }
    //总资产
    if(data.assets){
        for(var i = 0;i < $("#assets input").length;i++){
          if($("#assets input")[i].value == data.assets){
              $($("#assets input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#assets input")[i]).attr("checked","checked")
          }
        }
    }
    //年收入
    if(data.income){
        for(var i = 0;i < $("#income input").length;i++){
          if($("#income input")[i].value == data.income){
              $($("#income input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#income input")[i]).attr("checked","checked")
          }
        }
    }
    //运动
    if(data.sports){
        for(var i = 0;i < $("#sports input").length;i++){
          for(var j = 0;j < data.sports.length;j++){
            if($("#sports input")[i].value == data.sports[j]){
              $($("#sports input")[i]).parent().parent(".check-box").addClass("check-box checkedBox")
              $($("#sports input")[i]).attr("checked","checked")
            }
          }
        }
    }
    //旅游
    if(data.tour){
        for(var i = 0;i < $("#tour input").length;i++){
          for(var j = 0;j < data.tour.length;j++){
            if($("#tour input")[i].value == data.tour[j]){
              $($("#tour input")[i]).parent().parent(".check-box").addClass("check-box checkedBox")
              $($("#tour input")[i]).attr("checked","checked")
            }
          }
        }
    }
    //体型
    if(data.body){
        for(var i = 0;i < $("#body input").length;i++){
          if($("#body input")[i].value == data.body){
              $($("#body input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#body input")[i]).attr("checked","checked")
          }
        }
    }
    //身高
    if(data.height){
        for(var i = 0;i < $("#height input").length;i++){
          if($("#height input")[i].value == data.height){
              $($("#height input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#height input")[i]).attr("checked","checked")
          }
        }
    }
    //喝酒习惯
    if(data.drink){
        for(var i = 0;i < $("#drink input").length;i++){
          if($("#drink input")[i].value == data.drink){
              $($("#drink input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#drink input")[i]).attr("checked","checked")
          }
        }
    }
    //抽烟习惯
    if(data.smoking){
        for(var i = 0;i < $("#smoking input").length;i++){
          if($("#smoking input")[i].value == data.smoking){
              $($("#smoking input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#smoking input")[i]).attr("checked","checked")
          }
        }
    }
    //学历
    if(data.education){
        for(var i = 0;i < $("#education input").length;i++){
          if($("#education input")[i].value == data.education){
              $($("#education input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#education input")[i]).attr("checked","checked")
          }
        }
    }
    //身高
    if(data.drink){
        for(var i = 0;i < $("#drink input").length;i++){
          if($("#drink input")[i].value == data.drink){
              $($("#drink input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#drink input")[i]).attr("checked","checked")
          }
        }
    }
    //职业描述
    if(data.work){
      for(var i = 0;i < $("#takework input").length;i++){
          if($("#takework input")[i].value == data.work){
              $($("#takework input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#takework input")[i]).attr("checked","checked")
          }
        }

        workindex = 0
        for(var j = 0;j < $("#takework input").length;j++){
            if($("#takework input")[j].checked == true){
              workindex++
            }
          }
          if(workindex == 0){
            $("#work").val(data.work)
          }
    }
    //个性签名
    if(data.character){
      if(data.sex == 2){

        for(var i = 0;i < $("#womencharacter input").length;i++){
          if($("#womencharacter input")[i].value == data.character){
              $($("#womencharacter input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#womencharacter input")[i]).attr("checked","checked")
          }
        }

        characterindex = 0
        for(var j = 0;j < $("#womencharacter input").length;j++){
            if($("#womencharacter input")[j].checked == true){
              characterindex++
            }
          }
          if(characterindex == 0){
            $("#character").val(data.character)
          }
      }


        
      }
      

      if(data.sex == 1){
        
        for(var i = 0;i < $("#mancharacter input").length;i++){
          if($("#mancharacter input")[i].value == data.character){
              $($("#mancharacter input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#mancharacter input")[i]).attr("checked","checked")
          }
        }

        characterindex = 0
        for(var j = 0;j < $("#mancharacter input").length;j++){
            if($("#mancharacter input")[j].checked == true){
              characterindex++
            }
          }
          if(characterindex == 0){
            $("#character").val(data.character)
          }
    }
    //自我介绍
    if(data.selfInfo){
        var selfInfoArr = data.selfInfo.split(",")
        if(data.sex == 2){
          for(var i = 0;i < $("#womenselfInfo input").length;i++){
          for(var j = 0;j < selfInfoArr.length;j++){
            if($("#womenselfInfo input")[i].value == selfInfoArr[j]){
              $($("#womenselfInfo input")[i]).parent().parent(".check-box").addClass("check-box checkedBox")
              $($("#womenselfInfo input")[i]).attr("checked","checked")
            }
          }
        }
        index2 = 0
        for(var j = 0;j < $("#womenselfInfo input").length;j++){
            if($("#womenselfInfo input")[j].checked == true){
              index2++
            }
          }
          if(index2 == 0){
            $("#selfInfo").val(data.selfInfo)
          }
        }
        
        }


        if(data.sex == 1){
          for(var i = 0;i < $("#manselfInfo input").length;i++){
          for(var j = 0;j < selfInfoArr.length;j++){
            if($("#manselfInfo input")[i].value == selfInfoArr[j]){
              $($("#manselfInfo input")[i]).parent().parent(".check-box").addClass("check-box checkedBox")
              $($("#manselfInfo input")[i]).attr("checked","checked")
            }
          }
        }

        
        index1 = 0
        for(var j = 0;j < $("#manselfInfo input").length;j++){
            if($("#manselfInfo input")[j].checked == true){
              index1++
            }
          }
          if(index1 == 0){
            $("#selfInfo").val(data.selfInfo)
          }

    }
    // //我正寻找
    // if(data.looking){
    //     $("#looking").val(data.looking)
    // }
    //我需要的
    if(data.iNeed){
        for(var i = 0;i < $("#ineed input").length;i++){
          if($("#ineed input")[i].value == data.iNeed){
              $($("#ineed input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#ineed input")[i]).attr("checked","checked")
          }
        }
    }
    //我能提供的
    if(data.afford){
        for(var i = 0;i < $("#afford input").length;i++){
          if($("#afford input")[i].value == data.afford){
              $($("#afford input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#afford input")[i]).attr("checked","checked")
          }
        }
    }
    //我期待的关系
    if(data.hopeful){
        for(var i = 0;i < $("#hopeful input").length;i++){
          if($("#hopeful input")[i].value == data.hopeful){
              $($("#hopeful input")[i]).parent().parent(".radio-btn").addClass("radio-btn checkedRadio")
              $($("#hopeful input")[i]).attr("checked","checked")
          }
        }
    }

    //公开照
    if(data.photoPub.length != 0){
      for(var i = 0;i < data.photoPub.length;i++){
        $('#con').append('<div class="block"><img  src='+ data.photoPub[i].addr +' /><span class="del" data-index="photoPub" data-name='+data.photoPub[i].addr+'>删除</span></div>');
          imgObject.pub.push(data.photoPub[i].addr)
      }

    }


    //私密普通照
    if(data.photoPri.length != 0){
      for(var i = 0;i < data.photoPri.length;i++){
        if(data.photoPri[i].category == "common"){
          $('#con1').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="common" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.common.push(data.photoPri[i].addr)
        }
        if(data.photoPri[i].category == "life"){
          $('#con2').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="life" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.life = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "tour"){
          $('#con3').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="tour" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.tour = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "car"){
          $('#con4').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="car" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.car = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "house"){
          $('#con5').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="house" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.house = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "goods"){
          $('#con6').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="goods" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.goods = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "sport"){
          $('#con7').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="sport" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.sport = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "work"){
          $('#con8').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="work" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.work = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "swimwear"){
          $('#con9').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="swimwear" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.swimwear = data.photoPri[i].addr
        }
        if(data.photoPri[i].category == "looks"){
          $('#con10').append('<div class="block"><img  src='+ data.photoPri[i].addr +' /><span class="del" data-index="looks" data-name='+data.photoPri[i].addr+'>删除</span></div>');
          imgObject.looks = data.photoPri[i].addr
        }
        
      }

    }


      //头像
      if(data.avatar){
          $('#con11').append('<div><img  src='+ data.avatar +' /><span class="del" data-index="avatar" data-name='+data.avatar+'>删除</span></div>');
          imgObject.avatar = data.avatar
        }
    
}

//修改
//点击确认增加
$('#add').click(function(){
  getInfo()
  var obj = Object.assign(imgObject, getInfo())
  console.log(obj)
  sureEdit(obj)
})
//
function getInfo(){
  var data = {}
  var name = $('#name').val() || "" 
  var area = $('#area').val() || ""
  var phone = $('#phone').val() || ""
  var age = $('#age').val() || ""
  var password = $('#password').val() || ""
  var isvip = $('#isvip input[type="radio"][checked]').val() || ""
  var lovePrice = $('#lovePrice input[type="radio"][checked]').val() || ""
  var loveDate = $('#loveDate input[type="radio"][checked]').val() || ""
  var assets = $('#assets input[type="radio"][checked]').val() || ""
  var income = $('#income input[type="radio"][checked]').val() || ""
  var body = $('#body input[type="radio"][checked]').val() || ""
  var height = $('#height input[type="radio"][checked]').val() || ""
  var drink = $('#drink input[type="radio"][checked]').val() || ""
  var smoking = $('#smoking input[type="radio"][checked]').val() || ""
  var education = $('#education input[type="radio"][checked]').val() || ""
  var works  = $('#takework input[type="radio"][checked]').val() || $('#work').val() || ""
  var character = $('#mancharacter input[type="radio"][checked]').val() || $('#womencharacter input[type="radio"][checked]').val() ||$('#character').val() || ""
  
  var iNeed = $('#ineed input[type="radio"][checked]').val() ||  ""
  var afford = $('#afford input[type="radio"][checked]').val() ||  ""
  var hopeful = $('#hopeful input[type="radio"][checked]').val() ||  ""

  // var looking = $('#looking').val() || ""

  var sports = $('#sports input[type="checkbox"][checked]') || 0
  var tour = $('#tour input[type="checkbox"][checked]') || 0
  var sportsArr = []
  var tourArr = []
  var selfInfoArr = []
  for(var j = 0;j<$('#sports input[type="checkbox"][checked]').length;j++){
    sportsArr.push($('#sports input[type="checkbox"][checked]')[j].value)
  }

  for(var k = 0;k<$('#tour input[type="checkbox"][checked]').length;k++){
    tourArr.push($('#tour input[type="checkbox"][checked]')[k].value)
  }
  var man = $('#manselfInfo input[type="checkbox"][checked]').length
  var women = $('#womenselfInfo input[type="checkbox"][checked]').length
  if(man != 0){
    for(var k = 0;k<$('#manselfInfo input[type="checkbox"][checked]').length;k++){
    selfInfoArr.push($('#manselfInfo input[type="checkbox"][checked]')[k].value)
  }
  } 
  if(women != 0){
    for(var k = 0;k<$('#womenselfInfo input[type="checkbox"][checked]').length;k++){
    selfInfoArr.push($('#womenselfInfo input[type="checkbox"][checked]')[k].value)
  }
  } 
  
  if(selfInfoArr.length !== 0){
    var selfInfo = selfInfoArr
  }else{
    var selfInfo = $('#selfInfo').val() || ""
  }
  

  // if(name && area && phone&& age&& passeword&& isvip&& lovePrice&& loveDate&& assets&& income&& body&& height&& drink&& smoking&& education&& work&& selfs&& selfInfo&& looking&& sports&& tour){
  //  layer.msg('参数不全，请检查', {time: 1000},function(){
  //    return  
  //  });
  // }

  data.nickname = name
  data.addr = area
  data.mobile = phone
  data.age = age
  data.password = password
  data.lovePrice = lovePrice
  data.isvip = isvip
  data.sex = val  
  data.loveDate = loveDate
  data.assets = assets
  data.income = income
  data.body = body
  data.height = height
  data.drink = drink
  data.smoking = smoking
  data.education = education
  data.works = works
  data.character = character
  data.selfInfo = selfInfo
  // data.looking = looking
  data.sports = sportsArr
  data.tour = tourArr
  data.iNeed = iNeed
  data.afford = afford
  data.hopeful = hopeful
  // console.log(data)
  return data
}


function sureEdit(obj){
  $.ajax({
            type: "POST",
            url: server + "/editMockUser",
            dataType: 'json',
            data:obj,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
              if(res.ret == 1){
                layer.msg('修改成功', {time: 1000},function(){window.location.reload()});
                
              }else{
                layer.msg('修改失败，请重新检查资料', {time: 1000});
              }
        
            },
            error: function () {
            }
        });
}

//删除照片事件
$("#container").on("click",".del",function(){
  console.log($(this).attr("data-name"))
  console.log($(this).attr("data-index"))

  $(this).parent().remove()
  if($(this).attr("data-index") == "common"){
    imgObject.common.remove($(this).attr("data-name"))
  }
  else if($(this).attr("data-index") == "photoPub"){
    imgObject.pub.remove($(this).attr("data-name"))
  }else{
    var index = $(this).attr("data-index")
    console.log(index)
    imgObject[index] = ""
  }
})


//修改原型方法
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};






