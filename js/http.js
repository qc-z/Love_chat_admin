(function(window, document, $, undefined){

  $(function(){

    var httpAjax = {}

    var server = 'http://test.legle.cc:81';
    // var server = "http://lovechat.legle.cc";


    function formatUrl(uri) {
      if (uri.length < 4 || uri.substring(0, 4).toUpperCase() != 'HTTP') {
          uri = server + uri;
      }
      if (-1 == uri.indexOf('?')) {
          uri += '?';
      } else {
          uri += '&';
      }
      return uri;
    };

    function request(method, uri, body, successFun, errorFun) {
      var url = formatUrl(uri);
      if ('post' === method.toLocaleLowerCase() || 'put' === method.toLocaleLowerCase()) {
        body = JSON.stringify(body);
      }
      $.ajax({
        url: url,
        type: method,
        data: body,
        crossDomain: true,
        dataType: 'JSON',
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
          var err;
          switch (result.ret) {
              case 1:
                  result = result;
                  break;
              default :
                  console.log(url + " [" + result.ret + "]" + result.err);
                  err = {
                      ret: result.ret
                      , message: result.err
                  };
          }
          if(err){
              errorFun && errorFun(err.message);
          }else{
              successFun && successFun(result);
          }
        },
        error: function(err) {
          console.log(err)
          if(err.code === '401') {
            err.message = '帐户已经在其它地方登陆'
          }
          errorFun({message: err.message})
          return false
        }
      });
    };
            
    httpAjax = {
        post: function (uri, body, successFun, errorFun) {
            request('POST', uri, body, successFun, errorFun);
        },
        get: function (uri, successFun, errorFun) {
            request('GET', uri, null, successFun, errorFun);
        },
        put: function (uri, body, successFun, errorFun) {
            request('PUT', uri, body, successFun, errorFun);
        },
        del: function (uri, successFun, errorFun) {
            request('DELETE', uri, null, successFun, errorFun);
        },
        formatUrl: function(uri) {
          return formatUrl(uri);
        }
    };
    window.httpAjax = httpAjax;


  });

})(window, document, window.jQuery);