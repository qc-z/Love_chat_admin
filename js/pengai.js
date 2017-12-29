var pagination = 0;
var data = {}
//获取列表
function list() {
    $.post("http://test.legle.cc:81/boss/getAdminWish",{pagination},function(result){
        console.log(result)
        //总页数=所有数据/每页显示的10条
        totalPage = result.length/10;
        //统计数据
        $('#count').html(result.length);
        $('#total1').html('心愿墙总条数:  ' + result.length);
        $('#total2').html('通过总条数:  ' + result.a);
        $('#total3').html('审核中总条数:  ' + result.b);
        $('#total4').html('不通过总条数:  ' + result.c);
        $('#currentCount').html(result.today)
        // 用户列表
        $('#tables').bootstrapTable({
            classes: 'table table-hover',
            striped: true, //是否显示行间隔色
            // showColumns: true,
            // pagination: true,
            columns: [
                {
                    title: "用户名",
                    field: "nickname",
                    align: "center",
                    valign: "middle"
                },
                {
                    title: "性别",
                    field: "sex",
                    align: "center",
                    valign: "middle",
                    formatter: function (value, row, index) {
                        if (value == 2) {
                            return '女';
                        } else {
                            return '男';
                        }
                    },
                },
                {
                    title: "心愿墙照片",
                    field: "imgUrl",
                    detailView: true,
                    align: "center",
                    valign: "middle",
                    formatter: function (value, row, index) {
                        
                            return "<img class=' imgk' src='"  + value +  "' alt='' style='width: 50%;height: 50%;'>"
                    },
                },
                {
                    title: '心愿墙文字',
                    align: "center",
                    valign: "middle",
                    field: "content"
                },
                {
                    title: "审核状态",
                    field: "auditStatus",
                    align: "center",
                    valign: "middle",
                    formatter: function (value, row, index) {

                        if(value == "ing"){
                            return "待审核"
                        }else if(value == "success"){
                            return "审核通过"
                        }else if(value == "failed"){
                            return "审核失败"
                        }
                    },
                },
                // {
                //     title: "审核时间",
                //     field: "meta.createdAt",
                //     align: "center",
                //     valign: "middle",
                //     formatter: function (value, row, index) {
                //         var time=row.meta.createdAt;
                //         if(time==null){
                //             return "";
                //         }else{
                //             return moment(time).format('YYYY-MM-DD HH:mm:ss')
                //         }
                //     },
                // },
                {
                    title: "发布时间",
                    field: "meta.createdAt",
                    align: "center",
                    valign: "middle",
                    formatter: function (value, row, index) {
                        var time=row.meta.createdAt;
                        if(time==null){
                            return "";
                        }else{
                            return moment(time).format('YYYY-MM-DD HH:mm:ss')
                        }
                    },
                },
                {
                    title: "操作",
                    field: "_id",
                    align: "center",
                    valign: "middle",
                    formatter: function (value, row, index) {
                            return "<button class='btn btn-info'><a href='www.baidu.com'>审核<a/></button>"
                    },
                }
            ],
            data: result.users
        });
    })
}
list();

// 搜索
function search() {
    data = {
        nickname: $('#name').val(),
        sex: $('#sex').val(),
        mobile: $('#mobile').val(),
        state: $('#state').val()
    }
    $.post("http://test.legle.cc:81/boss/getAdminWish",data,function (result) {
        console.log(result)
        $('#tables').bootstrapTable('load', result.users);
    })
}

//刷新列表
function refresh(pagination) {
    if(data &&  JSON.stringify(data) == "{}"){
        $.post("http://test.legle.cc:81/boss/getAdminWish",{pagination},function(result){
            $('#tables').bootstrapTable('load', result.users);
        })
    }else{
        data.pagination = pagination
        $.post("http://test.legle.cc:81/boss/getAdminWish",{data},function(result){
            $('#tables').bootstrapTable('load', result.users);
        })
    }
    
}

// 上一页
function prevPage(){
    // !=0说明不是第一页
    if( pagination !=0 ){
        pagination--
        refresh(pagination);

        if( pagination == 0 ){
            $('#prevPage').attr('disabled', 'true');
        }
        $('#nextPage').attr('disabled', false);
    }

}

// 下一页
function nextPage(){
    $("#prevPage").attr('disabled', false);
    pagination++;
    console.log(pagination+"   "+totalPage)
    if(pagination >= totalPage){
        $('#nextPage').attr('disabled', 'true');
        refresh(pagination);
    }else{
        refresh(pagination);
    }
}



























