//加载时请求列表
window.onload = function(){
	$.ajax({
            type: "GET",
            url: server + "/normalList",
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
                addList(res)
                console.log(res)

            },
            error: function () {
            }
        });
}


	

	

//生成审核列表		
function addList(data){
	var list = 	data.results.length
	var datas = data.results
	var sex = ""	
	var age = 0	
	var str = ''
		str += '<div classs="content">'
	    	str += '<table cellspacing="0">'
	    		str += '<tbody>'
				    str += '<tr><th>编号</th><th>头像</th><th>昵称</th><th>年龄</th><th>性别</th><th>手机</th><th>完整度</th><th>审核状态</th><th>是否会员</th><th>邀请码</th><th>注册时间</th></tr>'
			for(var i = 0;i<list;i++){
				if(datas[i].avatar){
					avatar = datas[i].avatar
				}else{
					avatar = ""
				}
				if(datas[i].sex == 1){
					sex = "男"
				}else{
					sex = "女"
				}
				if(!datas[i].nickname){
					name = ""
				}else{
					name = datas[i].nickname
				}
				if(!datas[i].age){
					age = ""
				}else{
					age = datas[i].age
				}
				if(datas[i].vip.role){
					vip = "是"
				}else{
					vip = "否"
				}
				if(datas[i].vip.coupons){
					coupons = datas[i].vip.coupons
				}else{
					coupons = ""
				}
				if(datas[i].auditStatus == "success"){
					auditStatus = "通过"
				}else if(datas[i].auditStatus == "ing"){
					auditStatus = "审核中"
				}else if(datas[i].auditStatus == "failed"){
					auditStatus = "不通过"
				}
					if(avatar == ""){
						var alt = "没有头像"
					}else{
						var alt = "看到吗"
					}
				    str += '<tr><td class="weight">'+(i+1)+'</td><td><img class="pic" alt='+alt+' src='+avatar+' ></td><td>'+name+'</td><td>'+age+'</td><td>'+sex+'</td><td>'+datas[i].mobile+'</td><td>'+datas[i].completion+'%</td><td>'+auditStatus+'</td><td>'+vip+'</td><td>'+coupons+'</td><td>'+moment(datas[i].meta.createdAt).format('YYYY-MM-DD HH:mm:ss')+'</td></tr>'
				}
				str += '<tbody>'
	    	str += '</table>'
		str += '</div>'
	$("#insert").append(str)
    

}




















