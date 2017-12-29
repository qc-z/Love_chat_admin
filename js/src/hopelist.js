

//生成拒绝选项
$("#insert").on("click",".reject",function(){
	var url = $(this).attr("data-url")
	var content = $(this).attr("data-content")
	var id = $(this).attr("data-id")
	var strm = ""
	var butstr = ""
	var str1 = ""

		var str1 = '<div class="check"><span>心愿墙文字</span><input type="checkbox" name="radio" data-val="content"><input class="reason reason1" id="content" data-name="content" styl="margin-left:5rem" placeholder="拒绝理由，选填"></div>'
		
		var strm = '<div class="checkmm">'
				strm += '<div class="check checkbox"><span>心愿墙照片</span><input type="checkbox" style="margin-left:5px;margin-top: 10px;" name="checkbox" data-val="imgUrl"><input class="reason2 prireason"  id="imgUrl" data-name="imgUrl"  placeholder="拒绝理由，选填"></div>'
			strm += '<div>'
	
	
	
	var butstr = '<div class="butt"><button type="button" id='+id+' class="btn btn-primary">确定拒绝</button>'
		butstr += '<button type="button" class="btn btn-default">取消</button></div>'
	layer.open({
		  type: 1,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['420px', '240px'], //宽高
		  content: str1+strm+butstr
		});
	$(".btn-default").on("click",function(){
		$(".layui-layer-close").trigger("click")
	})



	//拒绝理由
	$('#'+id+'').click(function(){
		var obj = {}
		var content=$('input:checkbox[name="radio"]:checked')
		var imgUrl=$('input:checkbox[name="checkbox"]:checked')
		var reasonC=$('#content').val()
		var reasonI=$('#imgUrl').val()
		if(content.length !== 0){
				obj.content = "yes"
			}
		if(imgUrl.length !== 0){
			obj.imgUrl = "yes"
		}
		if(reasonC !== ""){
			obj.reasonC = reasonC
		}
		if(reasonI !== ""){
			obj.reasonI = reasonI
		}
		
		//发送请求
		console.log(content.length)
		if(!content.length &&  !imgUrl.length){
			layer.msg('请勾选理由', {time: 1000});
			return
		}
		$.ajax({
            type: "POST",
            url: server + "/boss/sendWishRejust",
            dataType: 'json',
            data:{reason:obj,id:id},
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
	var id = $(this).attr("data-id")
	var data = {wishId:id}
	$.ajax({
            type: "POST",
            url: server + "/boss/wishPass",
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
				        window.location.href = "../../appAdmin/hopelist.html"
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
	var str = ''
		str += '<div class="content">'
	    str += '<table cellspacing="0">'
	    if(status == "ing"){
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">1</span><span class="checking">审核中</span><span>(注册时间：'+moment(data.meta.createdAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span class="listbutton pass pull-right" data-id='+data._id+'>审核通过</span><span class="listbutton faile pull-right reject"  data-id='+data._id+'>拒绝</span></th></tr>'
	    }else if(status == "success"){
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">1</span><span class="successing">已审核</span><span>(审核时间：'+moment(data.auditAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span class="listbutton faile pull-right reject"   data-id='+data._id+'  data-id='+data._id+'>拒绝</span></th></tr>'
	    }else if(status == "failed"){
		    str += '<tr><th colspan="2"><span class="listNumber pull-left">1</span><span class="failing">审核不通过</span><span class="listbutton pass pull-right" data-id='+data._id+'>审核通过</span><span>(审核时间：'+moment(data.auditAt).format('YYYY-MM-DD HH:mm:ss')+')</span><span  class="listbutton faile pull-right reject"   data-id='+data._id+'>再次拒绝</span></th></tr>'
	    }
	    if(data.auditReson && data.auditReson.content &&data.auditContent.content == "failed"){
    		var reasonContent = data.auditReson.content
    	}else{
    		var reasonContent = ""
    	}
	    if(data.auditReson && data.auditReson.imgUrl &&data.auditContent.imgUrl == "failed"){
    		var reasonimgUrl = data.auditReson.imgUrl
    	}else{
    		var reasonimgUrl = ""
    	}

		    str += '<tr><td>昵称</td><td>'+data.nickname+'</td></tr>'
	    
	    	// str += '<tr><td>心愿墙照片</td><td><img src='+data.imgUrl+' alt="Image" class="img-responsive" style="width: 50rem;height: 25rem;"></td></tr>'

		    if(reasonimgUrl !== ""){
	    		str += '<tr><td>心愿墙照片</td><td><img src='+data.imgUrl+' alt="Image" class="img-responsive" style="width: 50rem;height: 25rem;"><span>(审核理由:'+reasonimgUrl+')</span></td></tr>'
		    }else{
	    		str += '<tr><td>心愿墙照片</td><td><img src='+data.imgUrl+' alt="Image" class="img-responsive" style="width: 50rem;height: 25rem;"></td></tr>'
		    }

		    if(reasonContent !== ""){
		    	str += '<tr><td>心愿墙文字</td><td>'+data.content+'&nbsp&nbsp&nbsp&nbsp&nbsp(审核理由：'+reasonContent+')</td></tr>'
		    }else{
		    	str += '<tr><td>心愿墙文字</td><td>'+data.content+'</td></tr>'
		    }
	    str += '</table>'
		str += '</div>'  
	$("#insert").append(str)
}

test(GetQueryString("id"),GetQueryString("status"))
function test(id,status){
	$.ajax({
            type: "POST",
            url: server + "/boss/findWish",
            dataType: 'json',
            data:{id:id},
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
// $("#insert").on("click",".push",function(){
// 	var butstr = '<div class="butt"><button type="button" class="btn btn-primary surepush">确定</button>'
// 		butstr += '<button type="button" class="btn btn-default">取消</button></div>'
// 		var str = '<input class="reason reason1 pushinput"  placeholder="填写推送的东西">'
// 	layer.open({
// 		  type: 1,
// 		  skin: 'layui-layer-rim', //加上边框
// 		  area: ['400px', '200px'], //宽高
// 		  content: str+butstr
// 		});
// 	$(".btn-default").on("click",function(){
// 		$(".layui-layer-close").trigger("click")
// 	})

// 	$(".surepush").click(function(){
// 		if(!!$(".pushinput").val()){
// 			$.ajax({
// 	            type: "POST",
// 	            url: server + "/push",
// 	            dataType: 'json',
// 	            data:{content:$(".pushinput").val(),id:id},
// 	            xhrFields: {
// 	                withCredentials: true
// 	            },
// 	            crossDomain: true,
// 	            success: function (res) {
// 					if(res.ret == 1){
// 		    			layer.msg(res.msg, {time: 1000},function(){
// 		    				$(".layui-layer-close").trigger("click")
// 		    			});
// 					}
// 	            },
// 	            error: function () {
// 	            }
//         });
// 		}
		
// 	})
// })










