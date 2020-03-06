function setCookie(key,value,expires){
    if(expires){
        var time = new Date()
        time.setTime(time.getTime() - 1000*60*60*8 + 1000 * expires)
        document.cookie = key + '=' + value + ';expires=' + time
    }else{
        document.cookie = key + '=' + value
    }
}
function getCookie(key){
    var str = '';
    
    var tmp = document.cookie.split('; ')
    tmp.forEach(item => {
        var t = item.split('=');
        if(t[0] === key){
            str = t[1]
        }
    })
    return str
}
function getRandomNum(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min)
}
function ma() {
    var stryan = '0123456789qwertyuiopasdfghjklzxcvbnm';
    var num = '';
    for (var i = 0; i < 4; i++) {
        num += stryan[getRandomNum(0, 35)]
    }
    return num;
}