function getAlllength(username){
     // 先获取username的长度，中文也算1个长度
     var name = username.value;
     var namelen = name.length;    
     if(name.match(/[\u4e00-\u9fa5]/g) !== null){
         namelen += name.match(/[\u4e00-\u9fa5]/g).length;
     }
     return namelen;
}
var span1, span2, span3;
var numRule = /^1[3578]\d{9}\b/;
var passRule = /\W/;
username.onblur = function(){
    span1 = document.querySelector('.name1');
    // console.log(name.value);
    
    if(username.value){
        span1.style.display = 'none';
        username.style.borderColor = 'yellowgreen';
        
    }else{
        span1.style.display = 'block';
        username.style.borderColor = 'red';
    }

} 
phone.onblur = function () {
    span1 = document.querySelector('.num1');
    span2 = document.querySelector('.num2');
    if (phone.value) {
        span1.style.display = 'none';
        if (numRule.test(phone.value)) {
            span2.style.display = 'none';
            phone.style.borderColor = 'yellowgreen';
        } else {
            span2.style.display = 'block';
            phone.style.borderColor = 'red';
        }

    } else {
        span1.style.display = 'block';
        span2.style.display = 'none';
        phone.style.borderColor = 'red';
    }
}
yanzhengma.onblur = function () {
    span1 = document.querySelector('.num3');
    span2 = document.querySelector('.num4');
    if (yanzhengma.value) {
        span1.style.display = 'none';
        if (yanzhengma.value == yzm.innerHTML) {
            span2.style.display = 'none';
            yanzhengma.style.borderColor = 'yellowgreen';
        } else {
            span2.style.display = 'block';
            yanzhengma.style.borderColor = 'red';
        }

    } else {
        span1.style.display = 'block';
        span2.style.display = 'none';
        yanzhengma.style.borderColor = 'red';
    }
}
// 验证码
yzm.innerHTML = ma();
yzm.onclick = function () {
    yzm.innerHTML = ma();
    yanzhengma.value = ''
}

pass.onblur = function () {
    span1 = document.querySelector('.num5');
    span2 = document.querySelector('.num6');
    span3 = document.querySelector('.num7');
    if (pass.value) {
        span1.style.display = 'none';
        if (pass.value.length == getAlllength(pass)) {
            span3.style.display = 'none';
            if (pass.value.length >= 6 && pass.value.length <= 14) {
                span2.style.display = 'none';
                pass.style.borderColor = 'yellowgreen';
            } else {
                span2.style.display = 'block';
                pass.style.borderColor = 'red';
            }
        }else{
            span2.style.display = 'none';
            span3.style.display = 'block';
            pass.style.borderColor = 'red';
        }
    } else {
        span1.style.display = 'block';
        span2.style.display = 'none';
        span3.style.display = 'none';
        pass.style.borderColor = 'red';
    }
}
cmf.onblur = function(){
    span1 = document.querySelector('.num8');
    
    if(cmf.value == pass.value){
        span1.style.display = 'none';
        cmf.style.borderColor = 'yellowgreen';
    }else{
        span1.style.display = 'block';
        cmf.style.borderColor = 'red';
    }
}   
var spanall = document.querySelectorAll('span');
var flag = true;
for(let i = 0 ; i < spanall.length ; i++){
    if(spanall[i].style.display == 'block'){
        flag = false;
        break;
    }
}

var form = document.querySelector('.form');
var nameInp = document.querySelector('.username');
var passInp = document.querySelector('.password');


form.onsubmit = function(e){
    e = e || window.event
    e.preventDefault()

    // console.log("我要提交表单了");
    var uname = nameInp.value;
    var upass = passInp.value;

    if(!uname || !upass){
        alert('请完整填写表单')
    }else{
        $.ajax({
            url: '/regi',
            type: 'post',
            data: {
                username: uname,
                password: upass
            },
            dataType: 'json',
            success: function(res){
                // window.location.href = '../pages/index.html'
                if(res.code == 1){
                    // document.cookie = 'username:'+uname+',password:'+upass'
                    setCookie('login',uname)
                    window.location.href = '../pages/index.html';

                }
                if(res.code == 0){
                    alert('注册失败');
                }
            }
        })
    }
    
}

// sub.setAttribute('disabled');