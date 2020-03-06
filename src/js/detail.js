//用户
var login = getCookie('login')
if(login){
    $('.login').html(login);
    $('.login').attr('href','')
}else{
    $('.login').html('登录');
    
}
const goodsInfo = JSON.parse(localStorage.getItem('goods_info'))

let str = `
    <section class="pic box">
        <div class="imgbox">
            <img src="${goodsInfo.scr}" alt="">
        </div>
        <nav>
            <li><img src="${goodsInfo.img1}" alt=""></li>
            <li><img src="${goodsInfo.img2}" alt=""></li>
            <li><img src="${goodsInfo.img3}" alt=""></li>
            <li><img src="${goodsInfo.img4}" alt=""></li>
            <li><img src="${goodsInfo.img5}" alt=""></li>
        </nav>
    </section>
    <section class="word">
        <p class="title">${goodsInfo.title}</p>
        <p class="price"><span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>￥${goodsInfo.price}</p>
        <p class="weight"><span>重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>${goodsInfo.weight}</p>
        <p class="shop"><span>商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店</span>${goodsInfo.shop}</p>
        <p class="sell"><span>销&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;售</span>${goodsInfo.sell}</p>
        <button class="add_cart">加入购物车</button>
        <button class="cart">去购物车结算</button>
    </section>
    `
$('.detail').html(str)
var add = document.querySelector('.add_cart');
const info = JSON.parse(localStorage.getItem('goods_info'));
add.onclick = function(){
    
    const cartList = JSON.parse(localStorage.getItem('cartList')) || []

    let exits = cartList.some(item => {
        return item.id == info.id
    })

    if(exits){
        for(let i = 0 ; i < cartList.length ; i++){
            if(cartList[i].id === info.id){
                cartList[i].number++;
                break
            }
        }
        
    }else{
        info.number = 1;
        cartList.push(info)
    }
    
    localStorage.setItem('cartList',JSON.stringify(cartList))
    alert('添加商品成功');
}
var cart = document.querySelector('.cart');
cart.onclick = function(){
    window.location.href = '../pages/cart.html'
}