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
          status: $('#status').val(),
          payType: $('#payType').val(),
          meal: $('#meal').val(),
          mobile: $('input[name="mobile"]').val(),
          pageNumber: pageNumber
        }

        var query = buildQueryString(query, [
          'startTime',
          'endTime',
          'mobile',
          'status',
          'payType',
          'meal',
          'pageNumber'
        ])

        var url = '/payList?' + query;
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
                data: json.pays
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
            "data": 'trade_no', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              data = data || ''
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'meal', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              let appData = {
                meal_a: '7天VIP',
                meal_b: '14天VIP',
                meal_c: '28天VIP'
              }
              data = appData[data] || '';
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'status', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              let appData = {
                ing: '付款中',
                success: '支付成功',
                failed: '支付失败'
              }
              data = appData[data] || '';
              return '<span>'+ data +'</span>'
            }
          },
          {"data": 'mobile' },
          {
            "data": 'payType', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              let appData = {
                alipay: '支付宝',
                wechat: '微信',
                apple: '苹果'
              }
              data = appData[data] || '';
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'value', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              data = data + '元';
              return '<span>'+ data +'</span>'
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
          	"data": 'meta.updatedAt',
          	"render": function ( data, type, full, meta ) {
              if(full.status === 'ing') {
                return ''
              }
          		data = moment(data).format('YYYY-MM-DD HH:mm:ss')
              return '<span>'+ data +'</span>';
            }
          },
          {
            "data": '_id', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              return '<span>'+ data +'</span>';
            }
          }
        ],
        "columnDefs": [
          { "className": "hide-col", "targets": 8 }
          // { "width": "10%", "targets": 2 }
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