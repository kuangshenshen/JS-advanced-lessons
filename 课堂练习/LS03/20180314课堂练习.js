//Number类型的值
var a1 = 20;
var a2 = 23.4;
console.log(parseInt(a2));//23
console.log(parseFloat("23.456xy"));//23.456
console.log(parseInt === window.parseInt);//true
console.log(parseFloat === window.parseFloat);//true
console.log(Math.ceil(a2));//24
console.log(Math.floor(a2));//23
console.log(Math.round(a2));//23
a3 = 5e2;
console.log(a3);//500
console.log(typeof Math);//object

//NaN
var x = Number("xis021");
console.log(x);//NaN
isNaN(x);
typeof NaN;
console.log(Math.log(-1));//NaN
console.log(Math.acos(2));//NaN
console.log(NaN === NaN);//false

//Infinity与-Infinity
var y1 = 2/0;
console.log(y1);//Infinity
var y2 = -2/0;
console.log(y2);//-Infinity
isFinite(y2);//false，非有限数
isFinite(23);//true，有限数

//0与-0
var z1 = 1/Infinity;
console.log(z1);//0
var z2 = -1/Infinity;
console.log(z2);//-0


//String类型的值
//字面量
var str = "abc_def_ghi_jkl_mn";
//转义字符 \n \" \' \\
console.log("abc\ndefghi\\\n\'mn\'");
//输出结果：
//abc
//defghi\
//'mn'

//字符串常用操作
var str = "abc_def_ghi_jkl_mn";
console.log(str.split("_"));// (5)["abc", "def", "ghi", "jkl", "mn"]
console.log(str.split("_",2));//(2)["abc", "def"]
console.log(str.concat("_opq"));//abc_def_ghi_jkl_mn_opq
console.log(str.substr(4,7));//def_ghi
console.log(str.substring(4,7));//def
console.log(str.slice(2));//c_def_ghi_jkl_mn
console.log(str.slice(2,5));//c_d
console.log(str.slice(-2));//mn
console.log(str.slice(2,-2));//c_def_ghi_jkl_
console.log(str.bold());//<b>abc_def_ghi_jkl_mn</b>
console.log(str.link());//<a href="undefined">abc_def_ghi_jkl_mn</a>
console.log(str.fontcolor("red"));//<font color="red">abc_def_ghi_jkl_mn</font>
console.log(str.fontsize(50));//<font size="50">abc_def_ghi_jkl_mn</font>
 


//Boolean类型的值
//Bool类型的值只有两个 true、false


//Null与Undefined
//Undefined 的几种情况
var a;
console.log(a);//undefined
function foo(x,y) {
    console.log(x,y);//1 undefined
}
foo(1);
function fee() {
    //没有返回值;
}
var feeReturnValue = fee();
console.log(feeReturnValue);//undefined

function fee() {
    console.log(a=1);//1
}
var feeReturnValue = fee();
console.log(feeReturnValue);//undefined

//null 
console.log(typeof null);//object



//对象类型

//简单对象
var obj = {x:1,y:2};
console.log(obj.__proto__ === Object.prototype);//true
console.log(Object.prototype);//{constructor: ƒ, __defineGetter__: ƒ,
                           // __defineSetter__: ƒ, hasOwnProperty: ƒ,
                           // __lookupGetter__: ƒ, …}

//数组
var arr = [1,2,3,4,5];
console.log(arr.__proto__ === Array.prototype);//true
console.log(Array.prototype);//[constructor: ƒ, concat: ƒ, find: ƒ, 
                             //findIndex: ƒ, pop: ƒ, …]
console.log(arr.__proto__.__proto__ === Object.prototype);//true

//函数对象
function foo() { 
    console.log("foo function!");
};
console.log(foo.__proto__ === Function.prototype);//true
console.log(foo.__proto__.__proto__ === Object.prototype);//true

console.log(obj instanceof Object);//true
console.log(arr instanceof Object);//true
console.log(foo instanceof Object);//true
console.log(foo === window.foo);//true


for(var k in obj){
    console.log(k,obj[k]);//x 1 
                          //y 2
}
console.log(Object.keys(obj));//返回一个数组，包含自身所有可枚举的属性
console.log("x" in obj);//能够检查整个原型连上的属性，包括不可遍历的属性
for(var k in foo){
    console.log(k,foo[k]);//没有自身属性，所以没有输出
}
console.log("call" in foo);//true
console.log("apply" in foo);//true
console.log("arguments" in foo);//true



//包装对象
var a = 123;
var b = new Number(a);
console.log(a == b);//true
console.log(a === b);//false

//临时包装对象
var str = "abcde";
console.log(str.length);//5 
str.length = 1;
console.log(str.length,str);//5 "abcde"
var arr = [1,2,3,4];
console.log(arr.length);//4
arr.length = 1;
console.log(arr.length,arr);//1 [1]




//JavaScript数据类型转换
//Part 1 其他类型转换为Boolean类型
console.log(Boolean(undefined));//false
console.log(Boolean(null));//false
console.log(Boolean(0));//false
console.log(Boolean(NaN));//false
console.log(Boolean(1));//true
console.log(Boolean(""));//false
console.log(Boolean("abc"));//true
console.log(Boolean({}));//true
if(new Boolean(false)){
    console.log("执行");//执行--当对象转换成Boolean类型时，
                        //转换成的布尔值均为true。
}

//Part 2 其他类型转换为Number类型
console.log(Number(undefined));//NaN
console.log(Number(null));//0
console.log(Number(true));//1
console.log(Number(false));//0
console.log(Number(""));//0
console.log(Number("abc"));//NaN
console.log(Number("123.345xx"));//NaN
console.log(Number("32343,345xx"));//NaN
console.log(Number({x:1,y:2}));//NaN
console.log(parseFloat("123.345xx"));//123.345
console.log(parseFloat("32343,345xx"));//32343
console.log(parseInt("123.345xx"));//123
console.log(parseInt("32343,345xx"));//32343

//Part 3 其他类型转换为String类型
console.log(String(undefined));//undefined
console.log(String(null));//null
console.log(String(true));//true
console.log(String(false));//false
console.log(String(0));//0
console.log(String(234));//234
console.log(String({x:1,y:2}));//[object Object]



// Part1 隐式类型转换
//比较运算符 与 隐式类型转换
var a = 3;
var b = 4;
console.log(typeof (a>b),a>b);//boolean false
console.log(typeof (a==b),a==b);//boolean false
console.log(typeof (a<b),a<b);//boolean true

//算数运算符 与 隐式类型转换 + -
var c = "img" + 3 +".jpg";
var d = "23" - 5;
console.log(c,d);//img3.jpg 18

//逻辑运算符 与 隐式类型转换 + -
var e = !23;
var f = !!34;//!!""   !!0   !!"abc"  !!undefined  !!null
var g = !!{};
console.log(e,f,g);//false true true

// 流程语句 与 隐式类型转换
var h = {x:1};
if(h){
    console.log("h:",h);//h: {x: 1}
}

var h = "";
if(h){
    console.log("h:",h);
}

// Part2 显式类型转换
Boolean();
Number();
String();
Object();
//数转为字符串
toString()
toFixed()
toPrecision()
toExponential()
//字符串转为数字
parseInt();
parseFloat();
//对象转换为原始值
toString();
valueOf();



//Number进阶
//Number构造器属性（静态属性）
Number.MAX_VALUE
Number.MIN_VALUE
Number.NaN
Number.NEGATIVE_INFINITY
Number.POSITIVE_INFINITY

//Number原型方法(Number对象继承的方法）
Number.prototype.toFixed();
Number.prototype.toPrecision();
Number.prototype.toString();
Number.prototype.toExponential();

var n1 = 12345.6789;
console.log(n1.toFixed(2));//12345.68
console.log(n1.toPrecision(2));//1.2e+4
console.log(n1.toString());//12345.6789
console.log(n1.toExponential(2));//1.23e+4

console.log(NaN === NaN);//false
console.log(isNaN("12,3"));//true
console.log(Math.floor(3.8));//3
console.log(Math.floor(-3.8));//-4
console.log(Math.ceil(3.2));//4
console.log(Math.ceil(-3.2));//-3
console.log(Math.round(-3.2));//-3
console.log(Math.round(-3.5));//-3
console.log(Math.round(-3.8));//-4



//String进阶
//Part 0
//字符串比较
console.log("A" > "a");
console.log("B".localeCompare("A")); //考虑本地化的字符排序，返回0或非0
console.log("A".localeCompare("A")); //考虑本地化的字符排序，返回0或非0
console.log("A".localeCompare("B"));

//字符串链接
var a = "abc";
var b = "def";
var c = a+b;

//Part 1 字符串提取
//String.prototype.charAt(pos);
//String.prototype.charCodeAt(pos);
//String.prototype.slice(start,end?);
//String.prototype.substr(start,length?)
//String.prototype.substring(start,end?);
//String.prototype.split(separator?,limit?);

//字符串常用方法，字符串的方法源于String.prototype

var str2 = "abcdef".slice(2);
var str3 = "abcdef".slice(2,5);
var str4 = "abcdef".slice(-2);
var str5 = "abcdef".slice(2,-2);

var arr6 = "abcdef".split("c");//返回数组
var arr7 = "abcdef".split("c",1);
var arr8 = "abcdef".split("c",2);

var str9 = "abcdef".charAt(2);
var str10 = "abcdef".charCodeAt(3);
var str11 = "abcdefabcdef".indexOf("d",1);
var str12 = "abcdefabcdef".indexOf("d",4);//从第4个开始找

//substr 与 substring的区别
var str13 = "abcdefghijklmn";
var str14 = str13.substr(2,5);//后一个参数代表长度
console.log(str13,str14);//str13 未受到破坏

var str15 = str13.substring(2,5);//后一个参数代表第几个end
console.log(str13,str15);//str13 未受到破坏

//Part 2 字符串变换
//String.prototype.trim( );
//String.prototype.concat(str1?,str2?);
//String.prototype.toLowerCase( );
//String.prototype.toLocaleLowerCase( );
//String.prototype.toUpperCase( );
//String.prototype.toLocaleUpperCase( );
var str16 = "aaa".concat("bbb");//返回字符串
var str17 = "    abc def     \r\n  ".trim();//返回已移除前导空格、
                                            //尾随空格和行终止符的
                                            //原始字符串
var str18 = "abcDEF".toLowerCase();
var str19 = "abcDEF".toUpperCase();

//Part 3 检索和比较
//String.prototype.indexOf(searchingString,position?);
//String.prototype.lastIndexOf(searchingString,position?);
//String.prototype.localeCompare(other);
var indexOf = "abcDEFabcDEFabcDEF".indexOf("D",6);
var lastIndexOf = "abcDEFabcDEFabcDEF".lastIndexOf("D");

//Part 4 与正则相关的方法 
//String.prototype.search(regexp);
//String.prototype.match(regexp);
//String.prototype.replace(regexp);


//B;;lean进阶
所有对象都是真值

 


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

