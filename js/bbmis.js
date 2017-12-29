var service = "http://test.legle.cc/";
//获取QueryString的数组
function getQueryString(){
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
    if(result == null){
        return "";
    }

    for(var i = 0; i < result.length; i++){
        result[i] = result[i].substring(1);
    }
    return result;
}

//根据QueryString参数名称获取值
function getQueryStringByName(name){
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}

//根据QueryString参数索引获取值
function getQueryStringByIndex(index){
    if(index == null){
        return "";
    }

    var queryStringList = getQueryString();
    if (index >= queryStringList.length){
        return "";
    }

    var result = queryStringList[index];
    var startIndex = result.indexOf("=") + 1;
    result = result.substring(startIndex);
    return result;
}

// 登录
var logout_confrim = function () {
    $.confirm({
        theme: 'supervan',
        title: '',
        content: '' +
        '<input type="text" placeholder="账号" class="account form-control" required  style="margin-bottom: 10px;"/>' +
        '<input type="password" placeholder="xxxxxx" class="password form-control" required />'
        ,
        buttons: {
            formSubmit: {
                text: '登录',
                btnClass: 'btn-blue',
                action: function () {
                    var data = {
                        username: this.$content.find('.account').val()
                        , password: this.$content.find('.password').val()
                    }
                    if (!data.username || !data.password) {
                        $.alert('缺少参数');
                        return false;
                    } else {
                        $.post(service+'/h5login', data, function (result) {
                            console.log(result)
                            if (result.code == 1) {
                                sessionStorage.setItem('token', result.token);
                                return true;
                            }else {
                                alert("账户或密码错误！")
                                logout_confrim();
                            }
                        })
                    }

                }
            }
        }
    });
}

var logout = function () {
    localStorage.clear();
    sessionStorage.clear();
    logout_confrim();
};

if (!sessionStorage.token) {
    logout_confrim();
}
