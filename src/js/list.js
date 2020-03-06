var login = getCookie('login')
if(login){
    $('.login').html(login);
    $('.login').attr('href','')
}else{
    $('.login').html('登录');
    
}
getlist();
var flag = 0;
var list = [];
var oldlist = [];
function getlist() {
    $.ajax({
        url: '../lib/data.json',
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            list = res;
            res.forEach(item => {
                oldlist.push(item)
            })
            pagi(res);
        }
    })
}
function pagi(res){
    $('.pagi').pagination({
        pageCount: Math.ceil(res.length / 16),
        current: 1,
        coping: true,
        homePage: '首页',
        endPage: '末页',
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) {
            let curr = api.getCurrent()
            console.log(curr);
            //slice 包前不包后
            var list = res.slice((curr - 1) * 16, curr * 16)
            // console.log(list);
            bindHtml(list)//每次点击
        }
    })
    bindHtml(res.slice(0, 16))//第一次
}
function bindHtml(list) {
    let str = '';

    list.forEach(item => {
        str += `
            <li data-id="${ item.id}">
                <div class="Goods-one"> 
                    <img src="${item.scr}" />
                    <p class="price">￥${item.price}</p>
                    <p class="title">${item.title}</p>
         	        <p class="shop"><span class="shop_name">${item.shop}</span><span class="shop_sell">已售${item.sell}</span></p>
                    <p class="check"><a href="">查看详情</a></p>
                </div>
            </li>
            `
    })
    $('.Goods-items').html(str)
    // for (const { scr, price, title, shop, sell } of lists) {
    //     str = `
    //     <li>
    //         <div class="Goods-one"> 
    //           <img src="${scr}" />
    //           <p class="price">${price}</p>
    //           <p class="title">${title}</p>
    // 		  <p class="shop"><span class="shop_name">${shop}</span><span class="shop_sell">已售${sell}</span></p>
    //           <p class="check"><a href="">查看详情</a></p>
    //         </div>
    //       </li>
    //     `
    //     ul.innerHTML += list;
    // }
}
var pbtn = document.querySelector('.pbtn');
pbtn.onclick = function () {
    $(this).addClass('active').
    parent().siblings().children().removeClass('active');
     
    if (flag == 0) {
        flag = 1;
        pbtn.innerHTML = '价格 ↑'
        list.sort(function(a,b){
            return a.price - b.price;
        })
        pagi(list)
        
    }
    else if (flag == 1) {
        flag = 2; 
        pbtn.innerHTML = '价格 ↓'
        list.sort(function(a,b){
            return b.price - a.price;
        })
        pagi(list)
    }
    else if (flag == 2) { 
        flag = 0; 
        pbtn.innerHTML = '价格' 
        pagi(oldlist);
        $(this).removeClass('active')
        .parent().siblings().children().addClass('active');
    }
    
    
}
var cbtn = document.querySelector('.cbtn');
cbtn.onclick = function(){
    $(this).addClass('active').
    parent().siblings().children().removeClass('active');
    $(this).parent().siblings().children().html('价格');
    pagi(oldlist);
}
$('.Goods-items').on('click','li',function(){
    const id = $(this).data('id')
    let data = {}

    for(let i = 0;i<list.length;i++){
        if(list[i].id == id){
            data = list[i]
            break
        }
    }
    // console.log(data);
    localStorage.setItem('goods_info',JSON.stringify(data))
    window.location.href = '../pages/detail.html'
    
})