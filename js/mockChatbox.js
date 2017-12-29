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


		function GetQueryString(name)
			{
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			}

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

        var _userid = GetQueryString('userid')



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
        var url = '/mockChatbox?userid=' + _userid;
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
            	$('#unreads').append(json.msgNum)
            	$('#mockAvatar').attr('src', json.user.avatar +'?x-oss-process=image/resize,w_80')
            	$('#mockNickname').append(json.user.nickname)
              userids = json.user._id
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
            "data": 'user.avatar', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              if(data) {
                return '<img src='+ data +'?x-oss-process=image/resize,w_80></img>'
              } else {
                return ''
              }
            }
          },
          {
            "data": 'user.nickname', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              return data || ''
            }
          },
          {"data": 'last_chat_content'},
          {
            "data": 'meta.createdAt', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              data = moment(data).format('YYYY-MM-DD hh:mm:ss') || '';
              return data
            }
          },
          {"data": 'unReaderNews'},
          {
            "data": 'user._id', // 用户的id
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              var url = 'chatroom/index.html?userid=' + userids + '&toid=' + data;
              return '<a class="btn btn-default", href="'+url+'", target="_blank">发信</a>'
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

  });


})(window, document, window.jQuery);