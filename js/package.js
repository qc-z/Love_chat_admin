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
      var accountUrl = '/editApk';
      accountUrl = HTTP.formatUrl(accountUrl);
      var identifier = [11, '_id'];
      var editable = [[0, 'id'],[1, 'prrv'],[2, 'vest'],[3, 'versionName'],[4, 'versionCode'],[5, 'pay', '{"00": "男女都关","11": "男女都开","01": "男关女开","10": "男开女关"}'],[6, 'coupon', '{"00": "男女都关","11": "男女都开","01": "男关女开","10": "男开女关"}'],[7, 'couponNeed'],[8, 'shiel', '{"yes": "打开","no": "关闭"}'], [10, 'updateHard', '{"yes": "是","no": "否"}'], [12, 'vipHide', '{"yes": "是","no": "否"}'],[13, 'couponBitian', '{"00": "男女都必填","11": "男女都选填","01": "男必填女选填","10": "男选填女必填"}']];

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
        'width': '80px'
      })
      // $('.tabledit-input:nth-last-child(7)').css({
      //   'width': '200px'
      // })
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

        var url = '/getApkList?' + query;
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
          {"data": 'id'},
          {"data": 'prrv'},
          {"data": 'vest'},
          {"data": 'versionName'},
          {"data": 'versionCode'},
          {
            "data": 'pay' ,
            "render": function ( data, type, full, meta ) {
              if(data == '00'){
                data = "男女都关"
              }
              else if(data == '01'){
                data = "男关女开"
              }
              else if(data == '10'){
                data = "男开女关"
              }
              else if(data == '11'){
                data = "男女都开"
              }
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'coupon' ,
            "render": function ( data, type, full, meta ) {
              if(data == '00'){
                data = "男女都关"
              }
              else if(data == '01'){
                data = "男关女开"
              }
              else if(data == '10'){
                data = "男开女关"
              }
              else if(data == '11'){
                data = "男女都开"
              }
              return '<span>'+ data +'</span>'
            }
          },
          {"data": 'couponNeed'},
          {"data": 'shiel' ,
            "render": function ( data, type, full, meta ) {
              if(data == 'yes'){
                data = "打开"
              }else if(data == 'no'){
                data = "关闭"
              }
              return '<span>'+ data +'</span>'
            }
          },
          {"data": 'download' ,
            "render": function ( data, type, full, meta ) {
              return '<a data-url="'+ data +'" data-id="'+ full._id +'" class="download">点击</a>';
            }
          },
          {
            "data": 'updateHard' ,
            "render": function ( data, type, full, meta ) {
              if(data == 'yes'){
                data = "是"
              }else if(data == 'no'){
                data = "否"
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
          },
          {
            "data": 'vipHide',
            "render": function ( data, type, full, meta ) {
              if(data == 'yes'){
                data = "是"
              }else if(data == 'no'){
                data = "否"
              }
              return '<span>'+ data +'</span>'
            }
          },
          {
            "data": 'couponBitian' ,
            "render": function ( data, type, full, meta ) {
              if(data == '00'){
                data = "男女都必填"
              }
              else if(data == '01'){
                data = "男必填女选填"
              }
              else if(data == '10'){
                data = "男选填女必填"
              }
              else if(data == '11'){
                data = "男女都选填"
              }
              return data || ''
            }
          }
        ],
        "columnDefs": [
          { "className": "hide-col", "targets": 11 }
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

    $("#datatable4").on('click', 'tr', function(e){
      var target = e.target
      var className = target.className
      if(className.indexOf('download') > -1) {
        var url = $(target).data('url')
        var _id = $(target).data('id')
        $('input[name="editUrl"]').val(url);
        $('#editModal').modal('show')
        $('#editDownloadBtn').click(function(e) {
          var newUrl = $('input[name="editUrl"]').val()
          var body = {
            download: newUrl,
            action: 'edit',
            _id: _id
          }
          httpAjax.post('/editApk', body, function(results) {
            $('input[name="editUrl"]').val('');
            if(results.ret === 1) {
              var table = $('#datatable4').DataTable();
              table.ajax.reload();
              $('#editModal').modal('hide')
            } else {
              alert(results.msg)
            }
          }, function(err) {
            console.log(err)
          })
        })

      }
    })


    $('#searchbtn').click(function(e) {
      e.preventDefault();
      var table = $('#datatable4').DataTable();
      table.ajax.reload();
    })

    $('#addSensitiveBtn').click(function(e) {
      e.preventDefault();
      var id = $('input[name="1"]').val();
      var prrv = $('input[name="2"]').val();
      var vest = $('input[name="3"]').val();
      var versionName = $('input[name="4"]').val();
      var versionCode = $('input[name="5"]').val();
      var pay = $("#select6").find("option:selected").val()
      var coupon = $("#select5").find("option:selected").val()
      var download = $('input[name="8"]').val();
      var shiel = $("#select1").find("option:selected").val()
      var updateHard = $("#select2").find("option:selected").val()
      var vipHide = $("#vipHide").find("option:selected").val()
      var couponBitian = $("#bitian").find("option:selected").val()
      var couponNeed = $('input[name="couponTips"]').val();
      var body = {
        id: id,
        prrv: prrv,
        vest: vest,
        versionName: versionName,
        versionCode: versionCode,
        pay: pay,
        coupon: coupon,
        couponNeed: couponNeed,
        couponBitian: couponBitian,
        download: download,
        shiel: shiel,
        vipHide: vipHide,
        updateHard: updateHard
      }
      httpAjax.post('/addApk', body, function(results) {
        $("#addModal").modal('hide')
        $('input[name="addContent"]').val('');
        $('input[name="addName"]').val('');
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