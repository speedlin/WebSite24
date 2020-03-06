var form = document.querySelector('form');
var nameInp = document.querySelector('.username');
var passInp = document.querySelector('.password');

form.onsubmit = function(e){
    e = e || window.event
    e.preventDefault()

var uname = nameInp.value;
var upass = passInp.value;

// console.log(uname);
// console.log(upass);


$.ajax({
    url: '/login',
    type: 'post',
    data: {
        username: uname,
        password: upass
    },
    dataType: 'json',
    success: function(res){
        if(res.code == 1){
            setCookie('login',uname)
            window.location.href = '../pages/index.html';
        }
        if(res.code == 0){
            alert('用户名或密码错误');
        }
        
    }
})
}