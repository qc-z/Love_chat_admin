//加载时请求列表
window.onload = function(){
	selfajax("GET","/mockUserList",true,addList)
}


	
function selfajax(method,url,iscall,callback,data){
	// console.log(Object.keys(arguments))
	// for(var i = 0;i < arguments.length; i++){
	// 	console.log(arguments[i])
	// 	var obj = {}
	// 	obj.method =  
	// }
	if(iscall== true && method == "GET"){
		$.ajax({
            type: method,
            url: server + url,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
                console.log(res)
                callback(res)

            },
            error: function () {
            }
        });
	}else if(iscall !== true && method == "GET"){
		$.ajax({
            type: method,
            url: server + url,
            dataType: 'json',
            data:data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
                console.log(res)

            },
            error: function () {
            }
        });
	}else if(iscall == true && method == "POST"){
		$.ajax({
            type: method,
            url: server + url,
            dataType: 'json',
            data:data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
                console.log(res)
                callback(res)

            },
            error: function () {
            }
        });
	}else if(iscall !== true && method == "POST"){
		$.ajax({
            type: method,
            url: server + url,
            dataType: 'json',
            data:data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
                console.log(res)

            },
            error: function () {
            }
        });
	}else{
		return;
	}
	
}
	

//生成审核列表		
function addList(data){
	if(data.ret == 1){
		var list = 	data.results.length
	var datas = data.results
	var sex = ""	
	var age = 0	
	var str = ''
		str += '<div classs="content">'
	    	str += '<table cellspacing="0">'
	    		str += '<tbody>'
				    str += '<tr><th>头像</th><th>编号</th><th>昵称</th><th>年龄</th><th>性别</th><th>手机</th><th>完整度</th><th>是否会员</th><th>编辑</th><th>删除</th></tr>'
			for(var i = 0;i<list;i++){
				if(datas[i].avatar){
					avatar = datas[i].avatar
				}else{
					avatar = ""
				}
				if(avatar == ""){
					var alt = "没有头像"
				}else{
					var alt = "看到吗"
				}
				if(datas[i].sex == 1){
					sex = "男"
				}else{
					sex = "女"
				}
				if(!datas[i].age){
					age = 0
				}else{
					age = datas[i].age
				}
				if(datas[i].vip.role){
					vip = "是"
				}else{
					vip = "否"
				}
				    str += '<tr><td class="weight">'+(i+1)+'</td><td><img class="pic" alt='+alt+' src='+avatar+' ></td><td>'+datas[i].nickname+'</td><td>'+age+'</td><td>'+sex+'</td><td>'+datas[i].mobile+'</td><td>'+datas[i].completion+'%</td><td>'+vip+'</td><td><a href=editperson.html?mobile='+datas[i].mobile+'>编辑</a></td><td class="delete"><a data-id='+datas[i]._id+'>删除<a></td></tr>'
				}
				str += '<tbody>'
	    	str += '</table>'
		str += '</div>'  
		$("#insert").append(str)
	}else{
		layer.msg(data.err, {time: 1000});
	}
	
    // $("html,body").animate({ scrollTop: 600 }, 0);
    //删除事件
	$(".delete").on("click",function(){
		console.log($(this).find('a').attr("data-id"))
		var id = $(this).find('a').attr("data-id")
		// selfajax("GET",)
	})
}



//根据电话或者昵称搜索用户
$("#searchbtn").click(function(){
	var searchName = $("#search").val()
	var data = {}
	if(!isNaN(searchName) && searchName.length == 11){ 
		data = {mobile:searchName,auditStatus:'ing'}
    }else if(isNaN(searchName)){
		data = {nickName:searchName,auditStatus:'ing'}
    }else if(!isNaN(searchName) && searchName.length != 11){
        layer.msg('手机号不正确', {time: 1000});
        $("#search").val("")
        return;
    }
	if(searchName.length){
		selfajax("POST","/findAdmin",true,addList,data)
	}
})




var page = 1
//前一页
$("#pre").click(function(){
	if(page>=2){
		page--
	}else{
		layer.msg("前面页码不存在哦~", {time: 1000});
		return
	}
	prenext(page)

})
//后一页
$("#next").click(function(){
	page++
	prenext(page)
})
function prenext(pagination){
	$.ajax({
            type: "GET",
            url: server + "/findByNumber?pagination="+pagination+"&auditStatus=ing",
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
            	if(res.ret == 1){
            		$("#insert").html("")
					$("#turnNumber").val("")
					addList(res.results)
					// $(window).scrollTop(1000)
					$("#pages").html(pagination)
					$("#total").html(res.count)
    				$("html,body").animate({ scrollTop: 50 }, 0);

            	}
            	if(res.results.length == 0){
            		layer.msg("没有更多的数据", {time: 1000});
					$(".over").html("请输入页码跳转，当前页码没有数据哦~")

            	}
            		
				
            },
            error: function () {
            }
        });
}



















