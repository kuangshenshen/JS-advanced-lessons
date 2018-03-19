
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

 



