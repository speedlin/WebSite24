//用户
var login = getCookie('login')
if(login){
    $('.login').html(login);
    $('.login').attr('href','')
}else{
    $('.login').html('登录');
    
}
// 获取数据
const lists = JSON.parse(localStorage.getItem('cartList'));

// console.log(lists);

// 数据渲染
var sum = 0;
var tbody = document.querySelector('.shopS');
lists.forEach(function (item) {
    item.total = item.number * item.price;
    var str = `
            <tr class="shopList" data-id="${item.id}">
                <td class="imgTd"><img class="shops" src="${item.scr}" alt="" srcset=""></td>
                <td class="titleTd">
                    <h6>${item.title}</h6>
                    <span>重量：${item.weight}</span>
                    <span>店铺：${item.shop}</span>
                </td>
                <td class="Son2">
                    <span class="reduce">-</span>
                    <input type="text" value="${item.number}" class="count" disabled>
                    <span class="add">+</span>
                </td>
                <td class="Son3">
                    <span class="Price">${item.price} 元</span>
                </td>
                <td class="Son4">
                    <span class="priceAll">${(item.total).toFixed(2)} 元</span>
                </td>
                <td class="Son5">
                    <img class="del" src="../images/del.png" alt=""  style="cursor: pointer;">
                </td>
            </tr>
            `

    tbody.innerHTML += str;
    sum += item.total;

})
var div1 = document.createElement('div');
div1.className = 'total';
var str1 = `总价为<span style="color:red;font-weight:bolder;font-size:50px"> ${sum.toFixed(2)}</span> 元`
div1.innerHTML = str1;
var main = document.querySelector('main');
main.appendChild(div1);

// 点击事件
var nullgood = document.querySelector('.nullgoods');
tbody.onclick = function (e) {
    var evt = e.target;
    var alltr = document.querySelectorAll('.shopS tr');
    // 取两位小数点数字
    var OnlyNum = /\d+.\d{2}/;
    if (evt.innerHTML == '+') {
        // priceall 获取单排总价格
        let data = [];
            
        for(let i = 0 ; i < lists.length ; i++){
            if(lists[i].id == evt.parentNode.parentNode.getAttribute('data-id')){
                lists[i].number++;
            }
        }
        localStorage.setItem('cartList',JSON.stringify(lists))

        var priceall = evt.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
        // 点击+号input的value增加
        evt.previousElementSibling.value++;
        // 单排总价格 重新赋值
        priceall.innerHTML = (evt.previousElementSibling.value * evt.parentNode.nextElementSibling.lastElementChild.innerHTML.slice(0, -3)).toFixed(2) + '元';
        rePriceAll();
    }
    if (evt.innerHTML == '-') {
        if (evt.nextElementSibling.value > 1) {
            // priceall 获取单排总价格
            var priceall = evt.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
            // 点击-号input的value增加
            evt.nextElementSibling.value--;
            // 单排总价格 重新赋值
            priceall.innerHTML = (evt.nextElementSibling.value * evt.parentNode.nextElementSibling.lastElementChild.innerHTML.slice(0, -3)).toFixed(2) + '元';
            // pricecha 为 You save....
    

            rePriceAll();
        }
    }
    if (evt.className == 'del') {
        if (confirm("是否删除")) {
            evt.parentNode.parentNode.remove();
            let data = [];
            
            for(let i = 0 ; i < lists.length ; i++){
                if(lists[i].id == evt.parentNode.parentNode.getAttribute('data-id')){
                    console.log(lists[i]);
                    
                }else{
                    data.push(lists[i])
                }
                
            }
            localStorage.setItem('cartList',JSON.stringify(data))
            rePriceAll();
            if ((alltr.length - 3) == 0) {
                nullgood.style.display = 'flex';
            }
        }
    }
}
// 总价重新计算函数
function rePriceAll() {
    var totalspan = document.querySelector('.total span');
    var alltr = document.querySelectorAll('.shopS tr');
    var newsum = 0;

    // 重新计算总价
    alltr.forEach(function (item) {
        if (item.children[4]) {
            if (item.children[4].firstElementChild) {
                newsum += item.children[4].firstElementChild.innerHTML.slice(0, -3) * 1;
            }
        }

    })
    totalspan.innerHTML = newsum.toFixed(2);
    // // 重新计算优惠价格
    // alltr.forEach(function (item) {
    //     if (item.children[4]) {
    //         if (item.children[4].lastElementChild) {
    //             newsalesum += OnlyNum.exec(item.children[4].lastElementChild.innerHTML)[0] * 1;
    //         }
    //     }
    // })
}
