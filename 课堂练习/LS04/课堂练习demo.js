//JS语法、表达式及语句综述
语法二义性
//Part1
var a = [1,2,3];
var b = a;
console.log(a,b);//(3) [1, 2, 3],(3) [1, 2, 3]
b.pop();
console.log(a,b);//(2) [1, 2] (2) [1, 2]
b = [4,5,6];
console.log(a,b);//(2) [1, 2] (3) [4, 5, 6]

//Part2
function foo(x) {
    x.push(4);
    x = [5,6,7];
    x.push(8);
    //console.log(x);//(4) [5, 6, 7, 8]
}
var a = [1,2,3];
foo(a);
console.log(a);//(4) [1, 2, 3, 4]

//Part3
function foo(x) {
    x.push(4);
    //console.log(x);// [1, 2, 3, 4]
    x.length = 0;
    x.push(5,6,7,8);
    //console.log(x);//[5, 6, 7, 8]
}
var a = [1,2,3];
foo(a);
console.log(a);//(4) [5, 6, 7, 8]




//字面量
var obj = {x:1,y:2};
var arr = [1,2,3,4,5];

//表达式与语句 表达式语句
var o = {x:1,y:2};
a>b;

// 存在二义性的语句，要避免有二义性的语句
var max = function (x,y) {
    return x>y?x:y;
};
// 下述代码是对象还是语句块
{
    foo:max(2,3)
}

// 存在二义性的语句 补充一
var max = function (x,y) {
    return x>y?x:y;
};
var x = {
    foo:max(2,3)
}

// 存在二义性的语句 补充二
var max = function (x,y) {
    return x>y?x:y;
};
{
    console.log(123);//123
    console.log(456);//456
    foo:max(2,3)
}//3
 



//Part 1 不同类型的表达式
23;//其中的23为原始表达式
obj = {x:2};// ={x:2}为对象初始化表达式
arr = [1,2];// =[1,2]为数组初始化表达式
var foo = function(){ // = function(){}为函数定义表达式
    console.log("foo");
};
obj.x;//obj.x为属性访问表达式
foo();//foo()为函数调用表达式
2+3;//2+3为算数运算表达式
2>3;//2>3为关系运算表达式
1&&2;//1&&2为逻辑运算表达式


//Part 2关于语句
2>3;//表达式语句
//条件语句
var a=2,b=3;
if(a>b){
    console.log("a > b");
}else{
    console.log("a < b");
}//a<b


function foo(){
	var a=b=3;
}
foo();
console.log("b:",b);//b: 3
console.log("a:",a);//a: 2


//循环语句
for(var i = 0;i<5;i++){
    console.log("in for ",i);
}    
    //in for  0
    //in for  1
    //in for  2
    //in for  3
    //in for  4
console.log("out for ",i);//out for  5



//ES5 中没有块作用域
{
    var a = 20;
}
console.log("大括号外依然能访问到a:",a);//大括号外依然能访问到a: 20

for(var i = 0;i<5;i++){
    console.log("in for ",i);
}
//in for  0
//in for  1
//in for  2
//in for  3
//in for  4
console.log("out of for ",i);//out of for  5

if(true){
    var a = 20;
}
console.log(a);//20


// 你是否能够区分undefined和undeclared
if(false){
    var b = 30;
}
console.log(b);//3



// 严格模式的目的：
// 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
// 消除代码运行的一些不安全之处，保证代码运行的安全


// 严格模式使用方式
"use strict"//全局使用

function foo() {
    "use strict"//函数内部使用
}


function  sloppyFunc() {
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);//123


//下边的实例，若使用严格模式则报错
function  sloppyFunc() {
    //'use strict'
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);//123

//检测是否在严格模式的方法

"use stirct"
function isStrictMode() {
    return this === window?false:true;
}
//"use stirct" 
console.log(isStrictMode());



//严格模式下禁止删除不可改变的属性的变量
var str = "abc";
var strDescriptor = Object.getOwnPropertyDescriptor(window,"str");
console.log(strDescriptor);

function  sloppyFunc() {
    str.length = 7;
    //console.log(Object.getOwnPropertyDescriptor(str,"length"));
    console.log(str.length);//
}
sloppyFunc();

function  strictFunc() {
    'use strict';
    console.log(Object.getOwnPropertyDescriptor(str,"length"));
    str.length = 7;
    console.log(str.length);
}
strictFunc();//报错

//严格模式下禁止删除未定义的变量
delete foo;
delete window.foo;
'use strict';
delete foo;
delete window.foo;

//严格模式下禁止函数参数重名

function f(a, a, b) {
    return a+b;
}
f(2,3,4);//非严格模式下正常执行 7

"use strict";
function f(a, a, b) {
    return a+b;
}
f(2,3,4);//严格模式下报错


//严格模式下的arguments，变与不变
function f(a){
    "use strict";
    a = 42;
    return [a, arguments[0]];
}
var pair = f(17);

console.log(pair[0]);//console.assert(pair[0] === 42);
console.log(pair[1]);//console.assert(pair[1] === 17);



// switch 语句在比较值时使用的是全等操作符,因此不会发生类型转换
// var j = 23;//case_111
// var j = "23";//case_222
// var j = new String("23");///case_default
var j = new Number(23);//case_default
switch (j){
    case 23:
        console.log("case_111");
        break;
    case "23":
        console.log("case_222");
        break;
    case new Number(23):
        console.log("case_333");
        break;
    default:
        console.log("case_default");
}


// 在switch语句中使用表达式，如下
var i = 65;
switch(true){ //思考若是改为 switch(new Boolean(true)){ //default
    case i>=60:
    console.log('及格');
        break;
    case i<60:
    console.log('不及格');
        break;
    default:
    console.log('default');
}//及格


var i = 1;//i=2、3、4
switch(i){
    case 1:
        console.log("case 1");
    case 2:
        console.log("case 2");
        break;
    case 3:
        console.log("case 3");
    //break;
    case 4:
        console.log("case 4");
    default:
        console.log("default");
}//case 1
 //case 2


// 利用switch的穿透性:求某月某日是一年中的第几天?
var year = 2018,
    month = 3,
    date = 16,
    sum = 0;
switch(month-1){
    case 11:
        sum += 30;
    case 10:
        sum += 31;
    case 9:
        sum += 30;
    case 8:
        sum += 31;
    case 7:
        sum += 31;
    case 6:
        sum += 30;
    case 5:
        sum += 31;
    case 4:
        sum += 30;
    case 3:
        sum += 31;
    case 2:
        sum += year%4==0&&year%100!=0||year%400==0?29:28;
    case 1:
        sum += 31;
    default:
        sum += date;
}
console.log(sum);//75


//for ... in 遍历数组
var arr = [2,,"33"];
for(var i in arr){
    console.log(i,arr[i]); 
}//0 2
 //2 33

//for ... in 遍历对象
var obj = {x:10,y:20,z:"30"};
for(var k in obj){
    console.log(k,obj[k],typeof obj[k]);
}//x 12 number
 //y 20 number
 //z "30" string
var obj1 = {x:1};
var obj2 = Object.create(obj1);
obj2.y = 2;
obj2.z = 3;
for(var k in obj2){
    console.log(k,obj2[k]);
}//y 2
 //z 3
 //x 1
