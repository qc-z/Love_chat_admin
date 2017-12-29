//点击确认增加
$('#add').click(function(){
	getInfo()
	obj = Object.assign(imgObj, getInfo())
	console.log(obj)
	login(obj)
})
//加载默认是男的
$(document).ready(function(){ 
    

	$("#con6").css("display","none")
	$("#con7").css("display","none")
	$("#con8").css("display","none")
	$("#con9").css("display","none")
	$("#con10").css("display","none")
	$("#womenselfInfo").css("display","none")
	$("#womencharacter").css("display","none")


}); 
var val = "1"
//性别改变事件，默认是男的
$("#sex select").change(function(){
	val = $(this).find("option:selected").val()
	// console.log($(this).find("option:selected").val())
	if(val == 2){
		//把男的的隐藏
		$("#con4").css("display","none")
		$("#con5").css("display","none")
		$("#con6").css("display","none")
		//把女的显示
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


	}else if(val == 1){
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
	}
	
  
});

//获取注册数据
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
	var works	 = $('#takework input[type="radio"][checked]').val() || $('#work').val() || ""
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
	// 	layer.msg('参数不全，请检查', {time: 1000},function(){
	// 		return	
	// 	});
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


function login(obj){
	$.ajax({
            type: "POST",
            url: server + "/addMockUser",
            dataType: 'json',
            data:obj,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
            	if(res.ret == 1){
            		layer.msg('注册成功', {time: 1000},function(){window.location.reload()});
            		
            	}else{
            		layer.msg('注册失败'+res.err, {time: 1000});
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
    imgObj.common.remove($(this).attr("data-name"))
  }
  else if($(this).attr("data-index") == "photoPub"){
    imgObj.pub.remove($(this).attr("data-name"))
  }else{
    var index = $(this).attr("data-index")
    console.log(index)
    imgObj[index] = ""
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

