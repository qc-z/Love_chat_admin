//新的插件
accessid = ''
accesskey = ''
host = ''
policyBase64 = ''
signature = ''
callbackbody = ''
filename = ''
key = ''
expire = 0
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000;
var service = "http://arpt.leglear.com:82/";
var imgObj = {};
var temp = "";
imgObj.pub = [];
imgObj.common = [];
function send_request(){
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp!=null)
    {
        serverUrl = server+'/aliyunToken'
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        return xmlhttp.responseText
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");


    }
};

function check_object_radio(){
    g_object_name_type = 'random_name';
}

function get_signature(){
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3)
    {
        body = send_request()
        var obj = eval ("(" + body + ")");
        // console.log(obj)
        host = obj['host']
        policyBase64 = obj['policy']
        accessid = obj['accessId']
        signature = obj['signature']
        expire = parseInt(obj['expire'])
        callbackbody = obj['callback']
        key = obj['dir']
        return true;
    }
    return false;
};

function random_string(len){
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename){
    suffix = get_suffix(filename)
    g_object_name = key + random_string(10) + suffix
    return ''
}

function get_uploaded_object_name(filename){
        return g_object_name
}

function set_upload_param(up, filename, ret){
    if (ret == false)
    {
        ret = get_signature()
    }
    g_object_name = key;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : callbackbody,
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}

var ids = new Array("selectfiles","selectfiles1","selectfiles2","selectfiles3","selectfiles4","selectfiles5","selectfiles6","selectfiles7","selectfiles8","selectfiles9","selectfiles10","selectfiles11");
$.each(ids,function(i,n){
    var self = this.toString();
    //实例化一个plupload上传对象
    var uploader = new plupload.Uploader({
        preserve_headers:false,
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : self,
        container: document.getElementById('container'),
        flash_swf_url : './Moxie.swf',
        silverlight_xap_url : './Moxie.xap',
        url : 'http://oss.aliyuncs.com',
        filters: {
            max_file_size : '200mb', //最大只能上传10mb的文件
            prevent_duplicates : false, //允许选取重复文件
            mime_types : [ //只允许上传图片和zip,rar文件
            { title : "Image files", extensions : "jpg,png,jpeg" }
        ]
    },
        multi_selection:false,
    });

    //在实例对象上调用init()方法进行初始化
    uploader.init({

    });

    uploader.bind('PostInit',function(){
        // document.getElementById('postfiles').onclick = function() {
        //     set_upload_param(uploader, '', false);
        // };
    });
    //绑定各种事件，并在事件监听函数中做你想做的事.当文件添加进来时
        uploader.bind('FilesAdded',function(uploader,files){
        set_upload_param(uploader, '', false);
        // 添加图片预览图
        if(self == "selectfiles"){
            if($('#con').find('img').length>=6){
                layer.msg('最多只能上传6张图片', {time: 1000});
                return false;
            }
            temp = "pub";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    // $('#con').append('<img  src='+ imgsrc +' />');
                    $('#con').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="photoPub" data-name='+imgsrc+'>删除</span></div>');

                });
            });
        }else if(self == "selectfiles1"){
            if($('#con1').find('img').length>=6){
                layer.msg('最多只能上传6张图片', {time: 1000});
                return false;
            }
            temp = "common";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con1').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="common" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles2"){
            if($('#con2').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "life";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con2').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="life" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles3"){
            if($('#con3').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "tour";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con3').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="tour" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles4"){
            if($('#con4').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "car";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con4').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="car" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles5"){
            if($('#con5').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "house";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con5').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="house" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles6"){
            if($('#con6').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "goods";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con6').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="goods" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles7"){
            if($('#con7').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "sport";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con7').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="sport" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles8"){
            if($('#con8').find('img').length>=1){
                layer.msg('最多只能上传8张图片', {time: 1000});
                return false;
            }
            temp = "work";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con8').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="work" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles9"){
            if($('#con9').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "swimwear";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con9').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="swimwear" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles10"){
            if($('#con10').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "looks";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con10').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="looks" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }else if(self == "selectfiles11"){
            if($('#con11').find('img').length>=1){
                layer.msg('最多只能上传1张图片', {time: 1000});
                return false;
            }
            temp = "avatar";
            plupload.each(files, function(file) {
                previewImage(file,function(imgsrc){
                    $('#con11').append('<div class="block"><img  src='+ imgsrc +' /><span class="del" data-index="avatar" data-name='+imgsrc+'>删除</span></div>');
                });
            });
        }
    })

uploader.bind('BeforeUpload',function(up, file) {
        check_object_radio();
        set_upload_param(up, file.name, true);
    })

uploader.bind('FileUploaded', function(up, file, info) {
        // console.log(file.name)
        if (info.status == 200)
        {

            imgUrl = "http://love-chat.oss-cn-shanghai.aliyuncs.com/"+get_uploaded_object_name(file.name) || "";

            function_name(imgUrl).then(function(imgUrl) {
    
            console.log(imgUrl);
            if(temp == "pub"){
                //公开照片
                if(imgObj.pub.length < 6 ){
                    imgObj.pub.push(imgUrl)
                    $("#con .del").last().attr("data-name",imgUrl)  

                }
            }else if(temp == "common"){
            //私密照片
                if(imgObj.common.length < 6 ){
                    imgObj.common.push(imgUrl)
                    $("#con1 .del").last().attr("data-name",imgUrl) 
                }
            }else if(temp == "tour"){
            //旅游照片
                imgObj.tour = imgUrl;
            }else if(temp == "car"){
            //座驾照片
                imgObj.car = imgUrl;
            }else if(temp == "life"){
            //生活照片
                imgObj.life = imgUrl;
            }else if(temp == "house"){
            //豪宅照片
                imgObj.house = imgUrl

            }else if(temp == "goods"){
            //奢物照片
                imgObj.goods = imgUrl

            }else if(temp == "looks"){
            //素颜照片
                imgObj.looks = imgUrl

            }else if(temp == "sport"){
            //运动照片
                imgObj.sport = imgUrl

            }else if(temp == "work"){
            //工作照片
                imgObj.work = imgUrl

            }else if(temp == "swimwear"){
            //泳衣照片
                imgObj.swimwear = imgUrl

            }else if(temp == "avatar"){
            //头像照片
                imgObj.avatar = imgUrl

            }
    })

        }
    })
})

//预览图片
function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    if(!file || !/image\//.test(file.type)) return;
        if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
            var fr = new mOxie.FileReader();
            fr.onload = function(){
                callback(fr.result);
                fr.destroy();
                fr = null;
            }
            fr.readAsDataURL(file.getSource());
        }else{
            var preloader = new mOxie.Image();
            preloader.onload = function() {
                preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
                var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80):preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                callback && callback(imgsrc); //callback传入的参数为预览图片的url
                preloader.destroy();
                preloader = null;
            };
        preloader.load( file.getSource() );
    }
}

function function_name(src) {
    var _src = src + '?x-oss-process=image/info'
    return new Promise(function(resolve, reject) {
       var x,y,w,h,mw,mh
        $.get(_src, function(data) {
            console.log(data)
        　　mw = data.ImageWidth.value;
            mw = Number(mw)
        　　mh = data.ImageHeight.value;
            mh = Number(mh)
            if(mh > mw) {
                h = mw
                w = mw
                x = 0
                y = (mh - mw)/2
            } else {
                h = mh
                w = mh
                y = 0
                x = (mw - mh)/2
            }
            x = Math.floor(x)
            y = Math.floor(y)
            w = Math.floor(w)
            h = Math.floor(h)
            console.log(mw, mh)
            resolve(src + '?x-oss-process=image/crop,x_'+ x +',y_'+ y +',w_'+ w +',h_' + h)
        })
    })
}



