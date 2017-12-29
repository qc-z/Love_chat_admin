

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
				str += '<div class="check checkbox"><span>公开照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px;margin-top: 10px;" name="checkboxpub" data-val='+pubarr[i]+'><input class="reason2 pubreason" placeholder="拒绝理由，选填"></div>'
			}else{
				str += '<div class="check checkbox"><span>公开照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px;margin-top: 10px;" name="checkboxpub" data-val=http'+pubarr[i]+'><input class="reason2 pubreason" placeholder="拒绝理由，选填"></div>'
			}
		}
		str += '<div>'
	}
	if($('.'+fuc+'').attr(fuc+"data-prive") !== "1"){
		var priarr = $('.'+fuc+'').attr(fuc+"data-prive").split(",http")
		var strm = '<div class="checkmm">'
		for(var i = 0;i < priarr.length;i++){
			if(i == 0){
			strm += '<div class="check checkbox"><span>私密照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px;margin-top: 10px;" name="checkboxpri" data-val='+priarr[i]+'><input class="reason2 prireason" placeholder="拒绝理由，选填"></div>'
				
			}else{
			strm += '<div class="check checkbox"><span>私密照片</span>'+(i+1)+'<input type="checkbox" style="margin-left:5px;margin-top: 10px;" name="checkboxpri" data-val=http'+priarr[i]+'><input class="reason2 prireason" placeholder="拒绝理由，选填"></div>'
				
			}
		}
		strm += '<div>'
	}
	var isname = $('.'+fuc+'').attr("data-nickname")
	var iswork = $('.'+fuc+'').attr("data-work")
	var isselfinfo = $('.'+fuc+'').attr("data-selfinfo")
	var isavatar = $('.'+fuc+'').attr("data-avatar")
	// var islooking = $('.'+fuc+'').attr("data-looking")
	var ischaracter = $('.'+fuc+'').attr("data-character")
	var str1 = ""
	if(isname !== ""){
		str1 += '<div class="check"><span>昵称</span><input type="checkbox" name="radio" data-val="nickname"><input class="reason reason1" data-name="nickname" placeholder="拒绝理由，选填"></div>'
	}if(isavatar !== ""){
		str1 += '<div class="check"><span>头像</span><input type="checkbox" name="radio" data-val="avatar"><input class="reason reason1" data-name="avatar" placeholder="拒绝理由，选填"></div>'
	} if(iswork !== ""){
		str1 += '<div class="check"><span>职业描述</span><input type="checkbox" name="radio" data-val="work"><input class="reason" data-name="work" placeholder="拒绝理由，选填"></div>'
	} if(isselfinfo !== ""){
		str1 += '<div class="check"><span>详细信息</span><input type="checkbox" name="radio" data-val="character"><input class="reason" data-name="character" placeholder="拒绝理由，选填"></div>'
	} 
	// if(islooking !== ""){
	// 	str1 += '<div class="check"><span>正在寻找</span><input type="checkbox" name="radio" data-val="looking"></div>'
	// } 
	if(ischaracter !== ""){
		str1 += '<div class="check"><span>个性签名</span><input type="checkbox" name="radio" data-val="selfInfo"><input class="reason" data-name="selfInfo" placeholder="拒绝理由，选填"></div>'
	}
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
		var prireason = [];
		var pubreason = [];
		//是一个数组，循环
		var val=$('input:checkbox[name="radio"]:checked')
		var pubval=$('input:checkbox[name="checkboxpub"]:checked')
		var prival=$('input:checkbox[name="checkboxpri"]:checked')
		// var textreason =$('.reason').val()
		for(var i = 0;i<$('.reason').length;i++){
			var reasonname = $('.reason')[i].dataset.name
			var value = $('.reason')[i].value
			if(value != ""){
				if(reasonname == "nickname"){
				obj.nicknameReason = value
				}else if(reasonname == "character"){
					obj.characterReason = value
				}else if(reasonname == "selfInfo"){
					obj.selfInfoReason = value
				}
				else if(reasonname == "work"){
					obj.workReason = value
				}
				else if(reasonname == "avatar"){
					obj.avatarReason = value
				}
			}
		}

		for(var i = 0;i<$('.pubreason').length;i++){
			var pubreasons = $('.pubreason')[i].value
			pubreason.push(pubreasons)
		}
		obj.pubReason = pubreason
		for(var i = 0;i<$('.prireason').length;i++){
			var prireasons = $('.prireason')[i].value
			prireason.push(prireasons)
		}
		obj.priReason = prireason

		for(var i = 0;i<val.length;i++){
			var name = $(val[i]).attr("data-val")
			if(name == "nickname"){
				obj.nickname = name
			}else if(name == "character"){
				obj.character = name
			}else if(name == "selfInfo"){
				obj.selfInfo = name
			}
			// else if(name == "looking"){
			// 	obj.looking = name
			// }
			else if(name == "work"){
				obj.work = name
			}else if(name == "avatar"){
				obj.avatar = name
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
		if(obj.pri.length == 0 && obj.pub.length == 0 && !obj.nickname&& !obj.character&& !obj.selfInfo&&  !obj.work&&  !obj.avatar){
			layer.msg('请勾选理由', {time: 1000});
			return
		}
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
	    			layer.msg('操作成功', {time: 1000},function(){
	    				custom_close()
	    			});
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
	    		layer.msg('审核通过', {time: 1000},function(){
	    			if($(window).width() <376){
				        window.location.href = "../../appAdmin/auditor.html"
				    }else{
	    				custom_close()
				    }
	    		});
            }
        },
            error: function () {
            }
        });
	
	});
	

function custom_close() { 
	window.opener = null; 
	window.open('', '_self'); 
	window.close()
} 	
// $("#close").click(function(){
// 	window.location.href = "window.opener=null;window.open('','_self');window.close()"
// })


//生成某一个审核列表		
function addOneList(data,status){
	id = data._id
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
	    	if(!data.avatar){
	    		avatar = ""
	    	}else{
	    		avatar = data.avatar
	    		
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
	    	//审核理由
	    	if(data.auditReson && data.auditReson.nickname){
	    		reasonName = data.auditReson.nickname
	    	}else{
	    		reasonName = ""
	    	}
	    	if(data.auditReson && data.auditReson.character){
	    		reasonCharacter = data.auditReson.character
	    	}else{
	    		reasonCharacter = ""
	    	}
	    	if(data.auditReson && data.auditReson.selfInfo){
	    		reasonSelfInfo = data.auditReson.selfInfo
	    	}else{
	    		reasonSelfInfo = ""
	    	}
	    	if(data.auditReson && data.auditReson.work){
	    		reasonWork = data.auditReson.work
	    	}else{
	    		reasonWork = ""
	    	}
	    	if(data.auditReson && data.auditReson.avatar){
	    		reasonAvatar = data.auditReson.avatar
	    	}else{
	    		reasonAvatar = ""
	    	}
	var str = ''
		str += '<div class="content">'
	    str += '<table cellspacing="0">'
	    if(status == "ing"){
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">1</span><span class="checking">审核中</span><span>(注册时间：'+moment(data.meta.createdAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span class="listbutton pass pull-right" data-id='+data._id+'>审核通过</span><span '+data._id+'data-prive='+priArr+' '+data._id+'data-public='+pubArr+' failid='+data._id+' class="'+data._id+' listbutton faile pull-right reject" data-nickname="'+nickname+'" data-work="'+work+'" data-selfInfo="'+selfInfo+'" data-avatar="'+avatar+'"  data-character="'+character+'">拒绝</span><span class="listbutton push pull-right">单独推送</span></th></tr>'
	    }else if(status == "success"){
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">1</span><span class="successing">已审核</span><span>(审核时间：'+moment(data.auditAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span '+data._id+'data-prive='+priArr+' '+data._id+'data-public='+pubArr+' failid='+data._id+' class="'+data._id+' listbutton faile pull-right reject" data-nickname="'+nickname+'" data-work="'+work+'" data-selfInfo="'+selfInfo+'"  data-avatar="'+avatar+'"  data-character="'+character+'">拒绝</span><span class="listbutton push pull-right">单独推送</span></th></tr>'
	    }else if(status == "failed"){
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">1</span><span class="failing">审核不通过</span><span class="listbutton pass pull-right" data-id='+data._id+'>审核通过</span><span>(审核时间：'+moment(data.auditAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span '+data._id+'data-prive='+priArr+' '+data._id+'data-public='+pubArr+' failid='+data._id+' class="'+data._id+' listbutton faile pull-right reject" data-avatar="'+avatar+'"  data-nickname="'+nickname+'" data-work="'+work+'" data-selfInfo="'+selfInfo+'"  data-character="'+character+'">再次拒绝</span><span class="listbutton push pull-right">单独推送</span></th></tr>'
	    }

	    if(reasonName !== "" && status == "failed"){
		    str += '<tr><td>昵称</td><td>'+nickname+'&nbsp&nbsp&nbsp&nbsp&nbsp(审核理由：'+reasonName+')</td></tr>'
	    }else{
		    str += '<tr><td>昵称</td><td>'+nickname+'</td></tr>'
	    }

	    if(reasonAvatar !== "" && status == "failed"){

		    str += '<tr><td>头像</td><td><img style="width:12rem;height:12rem" src='+avatar+'><span>审核理由:（'+reasonAvatar+')</span></td></tr>'
	    }else{
		    str += '<tr><td>头像</td><td><img style="width:12rem;height:12rem" src='+avatar+'></td></tr>'
		    
	    }
		str += '<tr><td>电话</td><td>'+mobile+'</td></tr>'
	    if(reasonWork !== "" && status == "failed"){
		    str += '<tr><td>职业描述</td><td>'+work+'&nbsp&nbsp&nbsp&nbsp&nbsp(审核理由：'+reasonWork+')</td></tr>'
	    }else{
	    	str += '<tr><td>职业描述</td><td>'+work+'</td></tr>'
		}

	    if(reasonSelfInfo !== "" && status == "failed"){
		    str += '<tr><td>自我介绍</td><td>'+selfInfo+'&nbsp&nbsp&nbsp&nbsp&nbsp(审核理由：'+reasonSelfInfo+')</td></tr>'
	    }else{
		    str += '<tr><td>自我介绍</td><td>'+selfInfo+'</td></tr>'
	    }

	    if(reasonCharacter !== "" && status == "failed"){
		    str += '<tr><td>个性签名</td><td>'+character+'&nbsp&nbsp&nbsp&nbsp&nbsp(审核理由：'+reasonCharacter+')</td></tr>'
	    }else{
		    str += '<tr><td>个性签名</td><td>'+character+'</td></tr>'
	    }
		    
		    str += '<tr><td>公开照片</td>'
			    str += '<td>'
					str += '<div class="row list">'
					for(var j = 0;j<data.photoPub.length;j++){
						str += '<div class="col-lg-4 col-md-4 col-sm-6">'
								str += '<figure>'
									str += '<img src='+data.photoPub[j].addr+' alt="Image" class="img-responsive">'
								str += '</figure>'
								if(data.photoPub[j].reason && data.photoPub[j].reason !== "" && status == "failed"){
									str += '<span style="position:absolute">(审核理由:'+data.photoPub[j].reason+')</span>'
								}
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
								if(data.photoPri[k].reason && data.photoPri[k].reason !== "" && status == "failed"){
									str += '<span style="position:absolute">(审核理由:'+data.photoPri[k].reason+')</span>'
								}
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

test(GetQueryString("mobile"),GetQueryString("status"))
function test(mobile,status){
	$.ajax({
            type: "POST",
            url: server + "/findAdmin",
            dataType: 'json',
            data:{mobile:mobile},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
            	if(res.ret == 1){
            		$("#insert").html("")
					addOneList(res.results,status)
            	}else{
            		layer.msg(res.err, {time: 1000},function(){
	    				custom_close()
            		});
            	}
				
            },
            error: function () {
            }
        });

}
		

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//单独发送推送
$("#insert").on("click",".push",function(){
	var butstr = '<div class="butt"><button type="button" class="btn btn-primary surepush">确定</button>'
		butstr += '<button type="button" class="btn btn-default">取消</button></div>'
		var str = '<input class="reason reason1 pushinput"  placeholder="填写推送的东西">'
	layer.open({
		  type: 1,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['400px', '200px'], //宽高
		  content: str+butstr
		});
	$(".btn-default").on("click",function(){
		$(".layui-layer-close").trigger("click")
	})

	$(".surepush").click(function(){
		if(!!$(".pushinput").val()){
			$.ajax({
	            type: "POST",
	            url: server + "/push",
	            dataType: 'json',
	            data:{content:$(".pushinput").val(),id:id},
	            xhrFields: {
	                withCredentials: true
	            },
	            crossDomain: true,
	            success: function (res) {
					if(res.ret == 1){
		    			layer.msg(res.msg, {time: 1000},function(){
		    				$(".layui-layer-close").trigger("click")
		    			});
					}
	            },
	            error: function () {
	            }
        });
		}
		
	})
})










