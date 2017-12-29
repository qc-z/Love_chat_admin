// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    var HTTP = window.httpAjax

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

    function loadEditTr() {
      var accountUrl = '/editCoupon';
      accountUrl = HTTP.formatUrl(accountUrl);
      var identifier = [7, 'id'];
      var editable = [[3, 'meta.endAt']];

      var aa = $('#datatable4').Tabledit({
        url: accountUrl,
        deleteButton: true,
        saveButton: true,
        autoFocus: false,
        buttons: {
            edit: {
                class: 'btn btn-sm btn-primary',
                html: '<span class="glyphicon glyphicon-pencil"></span> &nbsp 编辑',
                action: 'edit'
            }
        },
        columns: {
            identifier: identifier,
            editable: editable
        },
        // onParamas: function(url, serialize) {
        //   var pwdUrl = '/ez/auth/manage/account/uuid/' + serialize.auth_code;
        //   var pwdQuery = {password: serialize.password}
        //   HTTP.put(pwdUrl, pwdQuery, function(result) {
        //   }, function(err) {
        //     console.log(err)
        //     window.alert(err.message)
        //   })
        // },
        onSuccess: function(onData, serialize) {
          console.log(onData, serialize)
          if(onData.ret === 2) {
            var table = $('#datatable4').DataTable();
            table.ajax.reload();
          }
        },
        onFail: function(onErr) {
          window.alert(onErr.message);
        }
      })
      $('.tabledit-input').css({
        'width': '200px'
      })
    }

    function getOrderList() {


      return function ( request, drawCallback, settings ) {

        var pageSize = 10
        var pageNumber = (request.start + request.length)/pageSize
        // console.log(request)

        var query ={
          content: $('input[name="searchContent"]').val(),
          pageNumber: pageNumber
        }

        var query = buildQueryString(query, [
          'content',
          'creater',
          'pageNumber'
        ])

        var url = '/couponList?' + query;
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
            // console.log(json)
            	$('.gtco-loader').addClass('hide')

              var returnData = {
                draw: draw,
                recordsTotal: json.recordTotal,
                recordsFiltered: json.recordTotal,
                data: json.coupons
              };
               
              drawCallback( returnData );
              loadEditTr();
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
          {"data": 'content'},
          {"data": 'methods' ,
            "render": function ( data, type, full, meta ) {
              if(data == "admin"){
                data = "系统管理员"
              }else if(data == "distribution"){
                data = "分销系统"
              }else if(data == "gift"){
                data = "系统赠送"
              }
              
              return '<span>'+ data +'</span>'
            }},
          {
          	"data": 'meta.createdAt',
          	"render": function ( data, type, full, meta ) {
          		data = moment(data).format('YYYY-MM-DD hh:mm:ss')
              return '<span>'+ data +'</span>';
            }
          },
          {
            "data": 'meta.endAt',
            "render": function ( data, type, full, meta ) {
              data = moment(data).format('YYYY-MM-DD hh:mm:ss')

              if(new Date(data) < new Date()){
                return '<span>'+ data +'(已过期)</span>';
              }else{
                return '<span>'+ data +'</span>';
              }
            }
          },
          {
            "data": 'isUse', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              if(data&& new Date(full.meta.endAt) > new Date()){
                data = "可使用"
              }else if(!data || new Date(full.meta.endAt) < new Date()){
                data = "不可使用"
              }
              return '<span>'+ data +'</span>'
            }
          },{
            "data": 'useLimit'
          },
          {
            "data": 'useCodeid', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无</a>",
            "render": function ( data, type, full, meta ) {
              if(data.length){
                data = data
              }else{
                data = "无"
              }
              
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": '_id', // can be null or undefined
            "defaultContent": "<a class='btn btn-default'>无法查看</a>",
            "render": function ( data, type, full, meta ) {
              return '<span>'+ data +'</span>';
            }
          }
        ],
        "columnDefs": [
          { "className": "hide-col", "targets": 7 }
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

    $('#addSensitiveBtn').click(function(e) {
      e.preventDefault();
      var id = $('input[name="id"]').val();
      var nickname = $('input[name="nickname"]').val();
      var mobile = $('input[name="mobile"]').val();
      var password = $('input[name="password"]').val();
      var email = $('input[name="email"]').val();
      var balance = $('input[name="balance"]').val();
      var remark = $('input[name="remark"]').val();
      var role = $("#select").find("option:selected").val()
      var body = {
        id: id,
        nickname: nickname,
        mobile: mobile,
        password: password,
        email: email,
        balance: balance,
        remark: remark,
      	role: role
      }





      
      httpAjax.post('/agent/addAgent', body, function(results) {
      	$("#addModal").modal('hide')
      	// $('input[name="addContent"]').val('');
       //  $('input[name="addName"]').val('');
      	console.log(results)
      	if(results.ret === 1) {
      		var table = $('#datatable4').DataTable();
      		table.ajax.reload();
      	} else {
      		alert(results.msg)
      	}
      }, function(err) {
      	console.log(err)
      })
    })

  });
    // $("html,body").animate({ scrollTop: 1400 }, 0);
    
    


})(window, document, window.jQuery);