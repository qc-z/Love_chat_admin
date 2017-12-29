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
          froms: $('#from').val(),
          vip: $('#vip').val(),
          sex: $('#sex').val(),
          nickname: $('input[name="nickname"]').val(),
          mobile: $('input[name="mobile"]').val(),
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
          'sex',
          'pageNumber'
        ])

        var url = '/auditorLists?' + query;
        url = HTTP.formatUrl(url);
        // console.log(url)
        var draw = request.draw || 1
        settings.jqXHR = $.ajax( {
          "type": 'GET',
          "url": url,
          "data": null,
          'crossDomain': false,
          "dataType": "json",
          "contentType": 'application/json;charset=UTF-8',
          "success":  function ( json ) {
            if(json.ret === 0) {
              alert(json.err)
              return
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
            "data": 'auditAt',
            "render": function ( data, type, full, meta ) {
              if(full.auditStatus == 'ing') {
                data = ''
              } else {
                data = moment(data).format('YYYY-MM-DD HH:mm:ss')
              }
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
          {"data": 'mobile',
            "render": function ( data, type, full, meta ) {
              return '<a data-status="'+ full.auditStatus +'" href="./list.html?mobile='+ data +'&status='+full.auditStatus+'" target="_blank" data-full="'+ full +'" class="download">审核</a>';
              // return '<a data-id="'+ data +'" href="../appAdmin/list.html?mobile="'+data data-full="'+ full +'" class="download">审核</a>';
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

    // 点击审核 modal 弹出代码
    // $("#datatable4").on('click', 'tr', function(e){
    //   var target = e.target
    //   var className = target.className
    //   if(className.indexOf('download') > -1) {
    //     var url = $(target).data('url')
    //     var _id = $(target).data('id')
    //     $('input[name="editUrl"]').val(url);
    //     $('#editModal').modal('show')
    //     $('#editDownloadBtn').click(function(e) {
    //       var newUrl = $('input[name="editUrl"]').val()
    //       var body = {
    //         download: newUrl,
    //         action: 'edit',
    //         _id: _id
    //       }
    //       httpAjax.post('/editApk', body, function(results) {
    //         $('input[name="editUrl"]').val('');
    //         if(results.ret === 1) {
    //           var table = $('#datatable4').DataTable();
    //           table.ajax.reload();
    //           $('#editModal').modal('hide')
    //         } else {
    //           alert(results.msg)
    //         }
    //       }, function(err) {
    //         console.log(err)
    //       })
    //     })

    //   }
    // })

    // $('#datatable4_filter').hide();
    // $('#datatable4_length').hide();
    // $('.hide-col').hide();


    $('#searchbtn').click(function(e) {
      e.preventDefault();
      var table = $('#datatable4').DataTable();
      table.ajax.reload();
    })

  });
    


})(window, document, window.jQuery);