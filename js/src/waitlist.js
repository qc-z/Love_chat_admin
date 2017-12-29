//加载时请求列表
window.onload = function(){
	$.ajax({
            type: "GET",
            url: server + "/getLists?auditStatus=ing",
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
            	if(res.ret == 1){
            		addList(res.results)
					$("#total").html(res.count)
            	}else if(res.ret == 0){
	    			layer.msg(res.err, {time: 1000});

            	}
                
            },
            error: function () {
            }
        });
}


//生成拒绝选项
$("#insert").on("click",".reject",function(){
	var str = ""
	var strm = ""
	var fuc = $(this).attr("failid")
	// console.log($('.'+fuc+'').attr(fuc+"data-prive"))
	if($('.'+fuc+'').attr(fuc+"data-public") !== "1"){
		var pubarr = $('.'+fuc+'').attr(fuc+"data-public").split(",http")
		var str = '<div class="checkpub">'
		for(var i = 0;i < pubarr.length;i++){
			if(i == 0){
				str += '<div class="check checkbox"><span>公开照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px" name="checkboxpub" data-val='+pubarr[i]+'></div>'
			}else{
				str += '<div class="check checkbox"><span>公开照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px" name="checkboxpub" data-val=http'+pubarr[i]+'></div>'
			}
		}
		str += '<div>'
	}
	if($('.'+fuc+'').attr(fuc+"data-prive") !== "1"){
		var priarr = $('.'+fuc+'').attr(fuc+"data-prive").split(",http")
		var strm = '<div class="checkmm">'
		for(var i = 0;i < priarr.length;i++){
			if(i == 0){
			strm += '<div class="check checkbox"><span>私密照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px" name="checkboxpri" data-val='+priarr[i]+'></div>'
				
			}else{
			strm += '<div class="check checkbox"><span>私密照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px" name="checkboxpri" data-val=http'+priarr[i]+'></div>'
				
			}
		}
		strm += '<div>'
	}
	var str1 = '<div class="check"><span>昵称</span><input type="checkbox" name="radio" data-val="nickname"></div>'
		str1 += '<div class="check"><span>职业描述</span><input type="checkbox" name="radio" data-val="work"></div>'
		str1 += '<div class="check"><span>详细信息</span><input type="checkbox" name="radio" data-val="character"></div>'
		str1 += '<div class="check"><span>个性签名</span><input type="checkbox" name="radio" data-val="selfInfo"></div>'
		str1 += '<div class="check"><span>正在寻找</span><input type="checkbox" name="radio" data-val="looking"></div>'
	var butstr = '<div class="butt"><button type="button" id='+fuc+' class="btn btn-primary">确定拒绝</button>'
		butstr += '<button type="button" class="btn btn-default">取消</button></div>'
	layer.open({
		  type: 1,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['420px', '400px'], //宽高
		  content: str1+str+strm+butstr
		});
	$(".btn-default").on("click",function(){
		$(".layui-layer-close").trigger("click")
	})



	//拒绝理由
	$('#'+fuc+'').click(function(){
		var obj = {};
		var pubarr = [];
		var priarr = [];
		//是一个数组，循环
		var val=$('input:checkbox[name="radio"]:checked')
		var pubval=$('input:checkbox[name="checkboxpub"]:checked')
		var prival=$('input:checkbox[name="checkboxpri"]:checked')
		for(var i = 0;i<val.length;i++){
			var name = $(val[i]).attr("data-val")
			if(name == "nickname"){
				obj.nickname = name
			}else if(name == "character"){
				obj.character = name
			}else if(name == "selfInfo"){
				obj.selfInfo = name
			}else if(name == "looking"){
				obj.looking = name
			}else if(name == "work"){
				obj.work = name
			}
		}
		for(var j = 0;j<pubval.length;j++){
			var pub = $(pubval[j]).attr("data-val")
			pubarr.push(pub)
		}
		for(var k = 0;k<prival.length;k++){
			var pri = $(prival[k]).attr("data-val")
			priarr.push(pri)
		}
		obj.pub = pubarr
		obj.pri = priarr
		//发送请求
		console.log(obj)
		$.ajax({
            type: "POST",
            url: server + "/sendRejust",
            dataType: 'json',
            data:{reason:obj,id:fuc},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
				console.log(res)
				if(res.ret == 1){
	    			layer.msg('操作成功', {time: 1000},function(){window.location.reload()});
				}
            },
            error: function () {
            }
        });
})
})

//通过
$("#insert").on("click",".pass",function(){
	console.log($(this).attr("data-id"))
	var id = $(this).attr("data-id")
	var data = {auditStatus:"success",personId:id}
	$.ajax({
            type: "POST",
            url: server + "/isPass",
            dataType: 'json',
            data:data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
				if(res.ret == 1){
	    		layer.msg('审核通过', {time: 1000},function(){window.location.reload()});
            }
        },
            error: function () {
            }
        });
	
	});
	

	

//生成审核列表		
function addList(data){
	var str = ''
	
	for(var i = 0;i<data.length;i++){
		var priArr = []
		var pubArr = []
	var list = 	data.length	
		str += '<div classs="content">'
	    str += '<table cellspacing="0">'
	    for(var j = 0;j < data[i].photoPri.length;j++){
	    	priArr.push(data[i].photoPri[j].addr)
	    }
	    // console.log(priArr)
	    for(var k = 0;k < data[i].photoPub.length;k++){
	    	pubArr.push(data[i].photoPub[k].addr)
	    }
	    // console.log(pubArr)
	    	if(!data[i].nickname){
	    		nickname = ""
	    	}else{
	    		nickname = data[i].nickname
	    	}
	    	if(!data[i].work){
	    		work = ""
	    	}else{
	    		work = data[i].work

	    	}
	    	if(!data[i].character){
	    		character = ""
	    	}else{
	    		character = data[i].character
	    		
	    	}
	    	if(!data[i].selfInfo){
	    		selfInfo = ""
	    	}else{
	    		selfInfo = data[i].selfInfo
	    		
	    	}
	    	if(!data[i].looking){
	    		looking = ""
	    	}else{
	    		looking = data[i].looking
	    		
	    	}
	    	if(!data[i].mobile){
	    		mobile = ""
	    	}else{
	    		mobile = data[i].mobile
	    		
	    	}
	    	if(priArr.length == 0){
	    		priArr = ["1"]
	    	}
	    	if(pubArr.length == 0){
	    		pubArr = ["1"]
	    	}
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">'+(i+1)+'</span><span class="checking">审核中</span><span>(注册时间：'+moment(data[i].meta.createdAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span class="listbutton pass pull-right" data-id='+data[i]._id+'>审核通过</span><span '+data[i]._id+'data-prive='+priArr+' '+data[i]._id+'data-public='+pubArr+' failid='+data[i]._id+' class="'+data[i]._id+' listbutton faile pull-right reject">拒绝</span></th></tr>'
		    str += '<tr><td>昵称</td><td>'+nickname+'</td></tr>'
		    str += '<tr><td>电话</td><td>'+mobile+'</td></tr>'
		    str += '<tr><td>职业描述</td><td>'+work+'</td></tr>'
		    str += '<tr><td>详细介绍</td><td>'+character+'</td></tr>'
		    str += '<tr><td>个性签名</td><td>'+selfInfo+'</td></tr>'
		    // str += '<tr><td>我正在寻找</td><td>'+looking+'</td></tr>'
		    str += '<tr><td>公开照片</td>'
			    str += '<td>'
					str += '<div class="row list">'
					for(var j = 0;j<data[i].photoPub.length;j++){
						str += '<div class="col-lg-4 col-md-4 col-sm-6">'
								str += '<figure>'
									str += '<img src='+data[i].photoPub[j].addr+' alt="Image" class="img-responsive">'
								str += '</figure>'
							str += '</a>'
						str += '</div>'
					}
					str += '</div>'
				str += '</td>'
			str += '</tr>'
			str += '<tr><td>私密照片</td>'
			    str += '<td>'
					str += '<div class="row list">'
					for(var k = 0;k<data[i].photoPri.length;k++){
						str += '<div class="col-lg-4 col-md-4 col-sm-6">'
								str += '<figure>'
									str += '<img src='+data[i].photoPri[k].addr+' alt="Image" class="img-responsive">'
								str += '</figure>'
							str += '</a>'
						str += '</div>'
					}
					str += '</div>'
				str += '</td>'
			str += '</tr>'
	    str += '</table>'
		str += '</div>'  
}
	$("#insert").append(str)
    // $("html,body").animate({ scrollTop: 1000 }, 0);
}


//生成某一个审核列表		
function addOneList(data){
	var priArr = []
	var pubArr = []
	for(var j = 0;j < data.photoPri.length;j++){
	    	priArr.push(data.photoPri[j].addr)
	    }
	    for(var k = 0;k < data.photoPub.length;k++){
	    	pubArr.push(data.photoPub[k].addr)
	    }
	    if(!data.nickname){
	    		nickname = ""
	    	}else{
	    		nickname = data.nickname

	    	}
	    	if(!data.character){
	    		character = ""
	    	}else{
	    		character = data.character
	    		
	    	}
	    	if(!data.work){
	    		work = ""
	    	}else{
	    		work = data.work
	    		
	    	}
	    	if(!data.selfInfo){
	    		selfInfo = ""
	    	}else{
	    		selfInfo = data.selfInfo
	    		
	    	}
	    	if(!data.looking){
	    		looking = ""
	    	}else{
	    		looking = data.looking
	    		
	    	}
	    	if(!data.mobile){
	    		mobile = ""
	    	}else{
	    		mobile = data.mobile
	    		
	    	}
	    	if(priArr.length == 0){
	    		priArr = ["1"]
	    	}
	    	if(pubArr.length == 0){
	    		pubArr = ["1"]
	    	}
	var str = ''
		str += '<div classs="content">'
	    str += '<table cellspacing="0">'
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">1</span><span class="checking">审核中</span><span>(注册时间：'+moment(data.meta.createdAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span class="listbutton pass pull-right" data-id='+data._id+'>审核通过</span><span '+data._id+'data-prive='+priArr+' '+data._id+'data-public='+pubArr+' failid='+data._id+' class="'+data._id+' listbutton faile pull-right reject">拒绝</span></th></tr>'
		    str += '<tr><td>昵称</td><td>'+data.nickname+'</td></tr>'
		    str += '<tr><td>电话</td><td>'+mobile+'</td></tr>'
		    str += '<tr><td>职业描述</td><td>'+data.work+'</td></tr>'
		    str += '<tr><td>详细介绍</td><td>'+data.character+'</td></tr>'
		    str += '<tr><td>个性签名</td><td>'+data.selfInfo+'</td></tr>'
		    str += '<tr><td>我正在寻找</td><td>'+data.looking+'</td></tr>'
		    str += '<tr><td>公开照片</td>'
			    str += '<td>'
					str += '<div class="row list">'
					for(var j = 0;j<data.photoPub.length;j++){
						str += '<div class="col-lg-4 col-md-4 col-sm-6">'
								str += '<figure>'
									str += '<img src='+data.photoPub[j].addr+' alt="Image" class="img-responsive">'
								str += '</figure>'
							str += '</a>'
						str += '</div>'
					}
					str += '</div>'
				str += '</td>'
			str += '</tr>'
			str += '<tr><td>私密照片</td>'
			    str += '<td>'
					str += '<div class="row list">'
					for(var k = 0;k<data.photoPri.length;k++){
						str += '<div class="col-lg-4 col-md-4 col-sm-6">'
								str += '<figure>'
									str += '<img src='+data.photoPri[k].addr+' alt="Image" class="img-responsive">'
								str += '</figure>'
							str += '</a>'
						str += '</div>'
					}
					str += '</div>'
				str += '</td>'
			str += '</tr>'
	    str += '</table>'
		str += '</div>'  
	$("#insert").append(str)
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
		$.ajax({
            type: "POST",
            url: server + "/findAdmin",
            dataType: 'json',
            data:data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
            	if(res.ret == 1){
            		$("#insert").html("")
					$("#search").val("")
					addOneList(res.results)
            	}else{
					$("#search").val("")
            		layer.msg('没有找到该用户', {time: 1000});
            	}
				
            },
            error: function () {
            }
        });
	}else{
		layer.msg('请输入昵称或者电话', {time: 1000});
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















