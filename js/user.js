// jqGrid demo usage
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    var HTTP = window.httpAjax

    // datepicker
    $('#startTime').datetimepicker({
      format: 'YYYY-MM-DD HH:mm:ss',
      icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-crosshairs',
          clear: 'fa fa-trash'
        }
    });
    $('#endTime').datetimepicker({
      format: 'YYYY-MM-DD HH:mm:ss',
      icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-crosshairs',
          clear: 'fa fa-trash'
        }
    });

    var buildQueryString = function(query, keys){
        query = query || {};
        keys = keys || Object.keys(query);
        var vals = [];
        keys.forEach(function(key){
            if(query[key]){
                vals.push(key + '=' + encodeURIComponent(query[key]));
            }
        });
        return vals.join('&');
    };

    function getOrderList() {


      return function ( request, drawCallback, settings ) {

        var pageSize = 10
        var pageNumber = (request.start + request.length)/pageSize
        // console.log(request)

        var query ={
          startTime: $('input[name="startTime"]').val(),
          endTime: $('input[name="endTime"]').val(),
          auditStatus: $('#auditStatus').val(),
          vip: $('#vip').val(),
          sex: $('#sex').val(),
          froms: $('#from').val(),
          mock: $('#mock').val(),
          nickname: $('input[name="nickname"]').val(),
          mobile: $('input[name="mobile"]').val(),
          coupon: $('input[name="coupon"]').val(),
          userlist: 'yes',
          pageNumber: pageNumber
        }

        var query = buildQueryString(query, [
          'startTime',
          'endTime',
          'mobile',
          'froms',
          'nickname',
          'auditStatus',
          'vip',
          'coupon',
          'mock',
          'sex',
          'userlist',
          'pageNumber'
        ])

        var url = '/auditorLists?' + query;
        url = HTTP.formatUrl(url);
        // console.log(url)
        var draw = request.draw || 1
        settings.jqXHR = $.ajax({
          "type": 'GET',
          "url": url,
          "data": null,
          'crossDomain': false,
          "dataType": "json",
          "contentType": 'application/json;charset=UTF-8',
          "success":  function ( json ) {
            if(json.ret === 0) {
              alert(json.err)
              windows.location.href = '../index.html'
            }
            console.log(json)
            	$('.gtco-loader').addClass('hide')

              var returnData = {
                draw: draw,
                recordsTotal: json.recordTotal,
                recordsFiltered: json.recordTotal,
                data: json.lists
              };
               
              drawCallback( returnData );
          }
        });
      }
    }

    var request = {
      start: 0,
      length: 10,
    }

    $('#datatable4').dataTable({
        'paging':   true,  // Table pagination
        'ordering': false,  // Column ordering
        'info':     true,  // Bottom left status text
        'responsive': false, // https://datatables.net/extensions/responsive/examples/
        "processing": true,
        "serverSide": true,
        "bFilter": false,
        "ajax": getOrderList(request),
        "columns": [
          {"data": "_id"},
          {
            "data": 'avatar', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              if(data) {
                return '<img src='+ data +' style="width: 70px"></img>'
              } else {
                return ''
              }
            }
          },
          {
            "data": 'nickname', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              return data || ''
            }
          },
          {
            "data": 'isActive', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              if(data == 'no') {
                data = '已封号'
              } else {
                data = '正常'
              }
              return data || ''
            }
          },
          {"data": 'mobile'},
          {
            "data": 'sex', // can be null or undefined
            "render": function ( data, type, full, meta ) {
              if(data == '1') {
                data = '男'
              }
              if(data == '2') {
                data = '女'
              }
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'auditStatus',
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              var fill = {
                'ing': '待审核',
                'success': '审核通过',
                'failed': '审核拒绝'
              }
              data = fill[data] || '';
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'vipLevel', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {

              var vipText = {
                vip0: '普通用户',
                vip1: '尊贵会员',
                vip2: '黄金会员',
                vip3: '钻石会员',
                vip4: '至尊皇冠会员'
              }

              if(data) {
                data = vipText[data]
              }
              else {
                data = '普通用户'
              }
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'mock', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              if(data) {
                data = '是'
              }
              else {
                data = '否'
              }
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'meta.updatedAt',
            "render": function ( data, type, full, meta ) {
              data = moment(data).format('YYYY-MM-DD HH:mm:ss')
              return '<span>'+ data +'</span>';
            }
          },
          {
            "data": 'meta.createdAt',
            "render": function ( data, type, full, meta ) {
              data = moment(data).format('YYYY-MM-DD HH:mm:ss')
              return '<span>'+ data +'</span>';
            }
          },
          {
            "data": 'vip',
            "render": function ( data, type, full, meta ) {
              if(data && data.coupons) {
                data = data.coupons
              }
              else {
                data = ''
              }
              return '<span>'+ data +'</span>';
            }
          },
          {"data": '_id',
            "render": function ( data, type, full, meta ) {
              var  lehtml = "<a data-full='"+ JSON.stringify(full) +"' class='userDetail' style='cursor:pointer;'>详情 </a>"
              if(full.mock) {
                lehtml += "<a href='./editperson.html?mobile="+ full.mobile +"' target='_blank' style='cursor:pointer;'> 编辑</a>"
              }
              if(full.isActive == 'no') {
                lehtml += "<a data-id='"+ data +"' data-active=yes class='userActive' style='cursor:pointer;'> 解封</a>"
              } else {
                lehtml += "<a data-id='"+ data +"' data-active=no class='userActive' style='cursor:pointer;'> 封号</a>"
              }
              return lehtml;
            }
          },
          {
            "data": 'from',
            "render": function ( data, type, full, meta ) {
              if(data && data == "boss") {
                data = "BOSS"
              }
              else {
                data = '宠爱'
              }
              return '<span>'+ data +'</span>';
            }
          }
        ],
        "columnDefs": [
          { "className": "hide-col", "targets": 0 }
        ],
       	"bInfo" : true,
       	"initComplete": function(settings, json) {
       		// $('#datatable4_previous').children('a').text('上页')
       		// $('#datatable4_next').children('a').text('下页')
       		$('#datatable4_info').parent('.col-sm-5').hide()
       		$('#datatable4_length').hide()
       		$('#datatable4_paginate').parent('.col-sm-7').css({
       			width: "100%"
       		})
       		// $('#datatable4_filter').children('label').text('搜索')
			  }
    });

    //点击 详情 modal 弹出代码
    $("#datatable4").on('click', 'tr', function(e){
      var target = e.target
      var className = target.className
      if(className.indexOf('userDetail') > -1) {
        var full = $(target).data('full')

        $('.photoPriData').html('')
        $('.photoPubData').html('')

        if(full.auditStatus === 'ing') {
          full.auditStatus = '待审核'
        }
        if(full.auditStatus === 'success') {
          full.auditStatus = '审核成功'
        }
        if(full.auditStatus === 'failed') {
          full.auditStatus = '审核拒绝'
        }

        if(full.sex == '2') {
          full.sex = '女'
        }
        else {
          full.sex = '男'
        }

        full.auditAt = moment(full.auditAt).format('YYYY-MM-DD HH:mm:ss')
        console.log(full)

        $('.createdAtData').text('')
        $('.updatedAtData').text('')
        $('.createdAtData').text(moment(full.meta.createdAt).format('YYYY-MM-DD HH:mm:ss'))
        $('.updatedAtData').text(moment(full.meta.updatedAt).format('YYYY-MM-DD HH:mm:ss'))

        $('.avatarData').html('')
        if(full.avatar) {
          $('.avatarData').html('<img src='+ full.avatar +' style="width: 70px"></img>')
        }

        $('.vipData').text('')
        if(full.vip.role) {
          $('.vipData').text('高级会员')
        }
        else {
          $('.vipData').text('普通用户')
        }

        if(full.photoPub.length > 0) {
          var pubHtml = ''
          for (var i = 0; i < full.photoPub.length; i++) {
            pubHtml += '<img src='+ full.photoPub[i].addr +' style="width: 70px"></img>';
          }
          $('.photoPubData').html(pubHtml)
        }
        if(full.photoPri.length > 0) {
          var priHtml = ''
          for (var i = 0; i < full.photoPri.length; i++) {
            priHtml += '<img src='+ full.photoPri[i].addr +' style="width: 70px"></img>';
          }
          $('.photoPriData').html(priHtml)
        }

        $('.needData').each(function (index, _this) {
          var key = $(_this).data('predata')
          $(_this).text('')
          $(_this).text(full[key])
        })
        $('#detailModal').modal('show')
      }
      if(className.indexOf('userActive') > -1) {
        var id = $(target).data('id')
        var active = $(target).data('active') || 'no'

        var body = {
          id: id,
          active: active
        }

        HTTP.post('/setActive', body, function(results) {
          if(results.ret === 1) {
            var table = $('#datatable4').DataTable();
            table.ajax.reload();
          } else {
            alert(results.err)
          }
        }, function(err) {
          console.log(err)
        })
      }
    })

    // $('#datatable4_filter').hide();
    // $('#datatable4_length').hide();
    // $('.hide-col').hide();


    $('#searchbtn').click(function(e) {
      e.preventDefault();
      var table = $('#datatable4').DataTable();
      table.ajax.reload();
    })

  });
    // $("html,body").scrollTop(1200)


})(window, document, window.jQuery);