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
    </section>
    `
$('.detail').html(str)
