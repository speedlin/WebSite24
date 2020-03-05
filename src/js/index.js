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
/* 
https://o2api.jd.com/data?
body=%7B%22query%22%3A%22query%20getCommodities(%24ids%3A%20String)%7Bcommodities(ids%3A%20%24ids)%7BgroupId%2C%20groupName%2C%20productList%7BcanSell%20skuId%20name%20image%20commentCount%20goodRate%20jdPrice%20pcpPrice%20plusPrice%20tag%20copyWriting%20copyWritingDown%20backUpWords%7D%7D%7D%22%2C%22operationName%22%3A%22getCommodities%22%2C%22variables%22%3A%7B%22ids%22%3A%22%5B09919738%2C09920106%2C09920379%2C09920437%2C09921505%2C09921604%2C09921870%2C09921901%2C09921950%2C09922019%2C09922170%5D%22%7D%2C%22config%22%3A%7B%22cache%22%3Afalse%2C%22trim%22%3Atrue%2C%22map%22%3A%7B%22keyBy%22%3A%22groupId%22%2C%22valueField%22%3A%22productList%22%7D%7D%7D
&callback=o2237712c1f4f728d5494f9a78e4cc8454
&_=1583329390597

https://o2api.jd.com/data?
body=%7B%22query%22%3A%22query%20getAds(%24ids%3A%20String)%7BadvertInfo(ids%3A%20%24ids)%7BgroupId%20groupName%20adList%20%7BgroupId%20pictureUrl%20link%20linkType%20advertId%7D%7D%7D%22%2C%22operationName%22%3A%22getAds%22%2C%22variables%22%3A%7B%22ids%22%3A%22%5B03569460%2C03569483%2C03569500%2C03569815%2C03569851%2C03569933%2C03569985%2C03570005%2C03570020%2C03570037%5D%22%7D%2C%22config%22%3A%7B%22cache%22%3Afalse%2C%22trim%22%3Atrue%2C%22map%22%3A%7B%22keyBy%22%3A%22groupId%22%2C%22valueField%22%3A%22adList%22%7D%7D%7D
&callback=o2dac59b87596193cf2b96c46ff83cc8d5
&_=1583306956052

*/
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
        console.log(res);
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



