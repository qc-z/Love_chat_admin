// jqGrid demo usage
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    var HTTP = window.httpAjax

    // datepicker
    // $('#startTime').datetimepicker({
    //   format: 'YYYY-MM-DD HH:mm:ss',
    //   icons: {
    //       time: 'fa fa-clock-o',
    //       date: 'fa fa-calendar',
    //       up: 'fa fa-chevron-up',
    //       down: 'fa fa-chevron-down',
    //       previous: 'fa fa-chevron-left',
    //       next: 'fa fa-chevron-right',
    //       today: 'fa fa-crosshairs',
    //       clear: 'fa fa-trash'
    //     }
    // });
    // $('#endTime').datetimepicker({
    //   format: 'YYYY-MM-DD HH:mm:ss',
    //   icons: {
    //       time: 'fa fa-clock-o',
    //       date: 'fa fa-calendar',
    //       up: 'fa fa-chevron-up',
    //       down: 'fa fa-chevron-down',
    //       previous: 'fa fa-chevron-left',
    //       next: 'fa fa-chevron-right',
    //       today: 'fa fa-crosshairs',
    //       clear: 'fa fa-trash'
    //     }
    // });

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

        // var query ={
        //   startTime: $('input[name="startTime"]').val(),
        //   endTime: $('input[name="endTime"]').val(),
        //   status: $('#status').val(),
        //   payType: $('#payType').val(),
        //   meal: $('#meal').val(),
        //   mobile: $('input[name="mobile"]').val(),
        //   pageNumber: pageNumber
        // }

        // var query = buildQueryString(query, [
        //   'startTime',
        //   'endTime',
        //   'mobile',
        //   'status',
        //   'payType',
        //   'meal',
        //   'pageNumber'
        // ])

        // var url = '/payList?' + query;
        var url = '/mockChatList';
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
                data: json.chats
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
        {
            "data": 'thatName', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              return data || ''
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
            "data": 'mobile'

          },
          {"data": 'chat.content',
            "render": function ( data, type, full, meta ) {
              data = data.length > 20? data.slice(0,20)+"......":data
              return data || ''
            }


        },
          {"data": 'chat.msgType', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              data = data == "text"? "文本消息":"私照请求"
              return data 
            }},
          {
            "data": 'chat.meta.createdAt', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              data = moment(data).format('YYYY-MM-DD hh:mm:ss') || '';
              return data
            }
          },
          {
            "data": 'userId', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              var url = 'mockChatbox.html?userid=' + data;
              return '<a class="btn btn-default", href="'+url+'" target="_blank">消息盒子</a>'
            }
          }
        ],

        // "columnDefs": [
        //   { "className": "hide-col", "targets": 8 }
        //   // { "width": "10%", "targets": 2 }
        // ],
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

    // $('#datatable4_filter').hide();
    // $('#datatable4_length').hide();
    // $('.hide-col').hide();




    $('#searchbtn').click(function(e) {
      e.preventDefault();
      var table = $('#datatable4').DataTable();
      table.ajax.reload();
    })

    // 添加聊天
    $('#addChatBtn').click(function(e) {
      e.preventDefault();
      var mockMobile = $('input[name="mockMobile"]').val();
      var commonMobile = $('input[name="commonMobile"]').val();
      var body = {
        from: mockMobile,
        to: commonMobile
      }
      httpAjax.post('/addAdminChat', body, function(results) {
        $("#addModal").modal('hide')
        $('input[name="mockMobile"]').val('');
        $('input[name="commonMobile"]').val('');
        console.log(results)
        if(results.ret === 1) {
          var url = 'chatroom/index.html?userid=' + results.userid + '&toid=' + results.toid;
          window.location.href = url
        } else {
          alert(results.err)
        }
      }, function(err) {
        console.log(err)
      })
    })

  });


})(window, document, window.jQuery);