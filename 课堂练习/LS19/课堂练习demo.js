//demo01.js
window.onload = function () {
    console.log("window onload");
    var div2 = document.getElementById("div2");
    
    div2.onclick = function () {
        console.log("div2 click");
    }
}
function div1click() {
    console.log("div1 click");
}
//demo02.js
window.onload = function (e) {

    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
    div1.onclick = eventHandler;
    div2.onclick = eventHandler;
   }
}
//demo03.js
//测试2 DOM0级事件处理

window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        console.log(e.clientX,e.clientY);
    }
    div1.onclick = eventHandler;
    div1.onclick = function(){
        console.log("xx");
    };
    div2.onclick = eventHandler;
    
}
//测试3 DOM2级事件处理
window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        console.log(e.clientX,e.clientY);
    }
    div1.addEventListener("click",eventHandler);
    div1.addEventListener("click",function(){
        console.log("xx");
    });

    div2.addEventListener("click",eventHandler);
    div2.addEventListener("MyEvent",function(){console.log("处理自定义事件")});
    div2.dispatchEvent(new Event("MyEvent"));

}
/*
//DOM0级事件响应 定义在哪里？
document.body.__proto__.hasOwnProperty("onclick");//false
document.body.__proto__.__proto__.hasOwnProperty("onclick");//true

//DOM2级事件响应  定义在哪里？
document.body.__proto__.hasOwnProperty("addEventListener");//false
"addEventListener" in document;//true
document.body.__proto__.__proto__.__proto__.__proto__.__proto__.hasOwnProperty("addEventListener");//true
*/



