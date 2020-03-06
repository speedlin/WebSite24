// 轮播图设置
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项
    autoplay: {
        disableOnInteraction: false,
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})  

//数据渲染
$.ajax({
    url: 'https://o2api.jd.com/data',
    data: {
        body: '{"query":"query getAds($ids: String){advertInfo(ids: $ids){groupId groupName adList {groupId pictureUrl link linkType advertId}}}","operationName":"getAds","variables":{"ids":"[03569460,03569483,03569500,03569815,03569851,03569933,03569985,03570005,03570020,03570037]"},"config":{"cache":false,"trim":true,"map":{"keyBy":"groupId","valueField":"adList"}}}'
    },
    dataType: 'jsonp',
    success: function (res){
        // console.log(res.data['03569851'][0].pictureUrl);
        $('.s1 .jdty').append(`<img src="${res.data['03569483'][0].pictureUrl}" alt="">`)
        $('.s2 .jdty').append(`<img src="${res.data['03569500'][0].pictureUrl}" alt="">`)
        $('.s3 .jdty').append(`<img src="${res.data['03569815'][0].pictureUrl}" alt="">`)
        $('.s4 .jdty').append(`<img src="${res.data['03569851'][0].pictureUrl}" alt="">`)
    }
})
$.ajax({
    url: 'https://o2api.jd.com/data',
    data: {
        body: '{"query":"query getCommodities($ids: String){commodities(ids: $ids){groupId, groupName, productList{canSell skuId name image commentCount goodRate jdPrice pcpPrice plusPrice tag copyWriting copyWritingDown backUpWords}}}","operationName":"getCommodities","variables":{"ids":"[09919738,09920106,09920379,09920437,09921505,09921604,09921870,09921901,09921950,09922019,09922170]"},"config":{"cache":false,"trim":true,"map":{"keyBy":"groupId","valueField":"productList"}}}'
    },
    dataType: 'jsonp',
    success: function (res){
        // 09920379 饼干蛋糕
        // console.log(res.data['09920379']);
        // console.log(res);
        var str;
        for(const {image,name,pcpPrice} of res.data['09920379']){
            str = `
                <li>
                    <div class="goods_pic">
                        <img src="${image}" alt="">
                    </div>
                    <div class="goods_title">
                        <p>${name}</p>
                        <span>￥${pcpPrice}</span>
                    </div>    
                </li>
            `
            $('.s1 ul').append(str);
        }
        // 09920437 坚果蜜饯
        for(const {image,name,pcpPrice} of res.data['09920437']){
            str = `
                <li>
                    <div class="goods_pic">
                        <img src="${image}" alt="">
                    </div>
                    <div class="goods_title">
                        <p>${name}</p>
                        <span>￥${pcpPrice}</span>
                    </div>    
                </li>
            `
            $('.s2 ul').append(str);
        }
        // 09921505 牛奶
        for(const {image,name,pcpPrice} of res.data['09921505']){
            str = `
                <li>
                    <div class="goods_pic">
                        <img src="${image}" alt="">
                    </div>
                    <div class="goods_title">
                        <p>${name}</p>
                        <span>￥${pcpPrice}</span>
                    </div>    
                </li>
            `
            $('.s3 ul').append(str);
        }
        // 09921604 速食
        for(const {image,name,pcpPrice} of res.data['09921604']){
            str = `
                <li>
                    <div class="goods_pic">
                        <img src="${image}" alt="">
                    </div>
                    <div class="goods_title">
                        <p>${name}</p>
                        <span>￥${pcpPrice}</span>
                    </div>    
                </li>
            `
            $('.s4 ul').append(str);
        }
    }
})



