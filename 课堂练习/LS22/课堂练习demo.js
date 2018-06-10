var f = function (v) {
    return v + 1;
};
f(2);//返回3

//使用箭头函数，上述代码等效如下,只有一个参数和一条语句
var f = v => v + 1; //单参数可以不用（），单语句可以不用return关键字
//var f = (v) => {return v + 1;};
f(2);//返回3


///////////////////////////////
//没有参数和有多个参数的情况下，需要使用小括号来表示参数，如果有多条语句则需要有大括号表示函数体
var f = () => 5;
// 等同于
var f = function () {
    return 5
};

var foo = (num1, num2) => {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
//foo(2,3);
//foo(3,2);
// 等同于 ES5的写法
var foo = function (num1, num2) {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
//foo(2,3);
//foo(3,2);

///////////////////////////////////
var max = function (a, b) {
    return a > b ? a : b;
};

//箭头函数可以与变量解构结合使用
const full = ({ first, last }) => last + ' ' + first;
full({first:"Ming",last:"Li"});

// 等同于
function full({ first, last }) {
  return last + ' ' + first;
}
full({first:"Ming",last:"Li"});

// Part1 方法中的函数嵌套 this缺陷
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        //内部嵌套函数
        function moveToX() {
            this.x = x;//this绑定到了哪里？
        }
        //内部嵌套函数
        function moveToY() {
            this.y = y;//this绑定到了哪里？
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);
//console.log(window.x,window.y);


// Part2 方法中的函数嵌套 this缺陷 ES5中通过软绑定解决办法
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        var that = this;//关键的一行，软绑定
        //内部嵌套函数
        function moveToX() {
            that.x = x;//this改为that
        }
        //内部嵌套函数
        function moveToY() {
            that.y = y;//this绑定到了哪里？
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);
//console.log(window.x,window.y);

//思考并回顾：如何用call或apply间接调用的方法解决this指向问题？？？

//ES6中 箭头函数中this是与函数定义时所在的对象绑定，而不是使用时所在的对象（避免this缺陷）
//箭头函数导致this总是指向函数定义生效时所在的对象
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        //内部嵌套函数
        var moveToX = ()=>this.x=x;
        //内部嵌套函数
        var moveToY = ()=>this.y=y;
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);
//console.log(window.x,window.y);

//思考：如何通过bind方法解决this指向问题

//通过箭头函数可以有效避免this指向问题

//
// 箭头函数有几个使用注意点。
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作Generator函数

//思考函数中的this ES5中如何解决
function foo() {
    setTimeout(function(){
        console.log('id:', this.id);
    }, 100);
}
var id = 21;
foo.call({ id: 42 });// id: 21

//查看下例中箭头函数的写法和结果
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}
var id = 21;
foo.call({ id: 42 });// id: 42
//箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42
//其实箭头函数里面没有自己的this，而是引用外层的this

//其实箭头函数里面没有自己的this，而是引用外层的this
//由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}
var f = foo.call({id: 1});
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

//////////////////////////////////////////////////////////////////
//需要特别注意：
//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上小括号
var getTempItem = itemId => ({ id: itemId, name: "Temp" });
//getTempItem(23);

//等效于
var getTempItem = function (itemId) {
    return { id: itemId, name: "Temp" }
};
//getTempItem(23);

// ES5 中实现函数参数默认值的方法
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));//1+2+3
console.log(sum(1,2));//1+2+5
console.log(sum(1));//1+4+5
console.log(sum(1,0,0));//本应为1+0+0，但此处为1+4+5，代码有问题需优化，优化如下

//优化改造版本
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));//1+2+3
console.log(sum(1,2));//1+2+5
console.log(sum(1));//1+4+5
console.log(sum(1,0,0));//1+0+0


// ES6 中实现函数参数默认值的方法 ,使用babble查看ES5的写法
var sum = function(a,b=4,c=5){
    return a+b+c;
};
console.log(sum(1,2,3));//1+2+3
console.log(sum(1,2));//1+2+5
console.log(sum(1));//1+4+5
console.log(sum(1,0,0));//1+0+0

//默认值案例
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(url);
    console.log(body);
    console.log(method);
    console.log(headers);
}

fetch('http://example.com')
// Part 11111
function foo(x=5){
    let x = 1;//报错
    const x = 2;//报错
    var x = 3;//正常
}
foo();


// Part 222222
//默认值顺序，参数一般有顺序，有默认值的参数应该是尾参数
//否则无法使有默认值的用默认值，没有默认值的用传递的参数
function f(x = 1,y) {
    return [x,y];
}
f();//[1,undefined]
f(2);//[2,undefined]
//f(,3);//报错，无法使x用1，y用3


//所以有默认值的参数在最后
function f(x,y = 1) {
    return [x,y];
}
f();//[undefined, 1]
f(2);//[2, 1] 这样就可以x为传递的参数，y为默认的值

// ES5中 实参数大于形参数量时，可以通过arguments来获得所有参数
function test() {
    console.log(arguments);//console.log(test.arguments);
}
test("a","b","c");//

//...Rest 相当于合并若干参数为一个数组，主要用于函数定义时，代替 arguments，组解决arguments的弊端
function f(...y){
    console.log(y);
}
f("a","b","c");//输出 ["a","b","c"]

function add(...values) {
    let sum = 0;
    for (var val of values) {
      sum += val;
    }
    return sum;
  }
  add(2, 5, 3) // 10

//比arguments使用更加灵活,比如只想看从第二个开始之后的参数
function f(x,...y){
    console.log(x,y);
}
f("a","b","c","d");//输出 "a",["b","c","d"]
//思考：f("a",["b","c","d"]);//输出 "a",[["b","c","d"]]
f("a");//输出 "a",[]
f();//输出 undefined,[]
//思考function f(x,...y，z){console.log(y);}//此时y输出是什么


// Part2222222222222
//...Spread 扩展操作符 相当于解数组为分散的参数，主要用于函数调用时，...Rest的逆运算
function f(x,...y){
    console.log(x,y);
}
f("a",...["b","c"]);//等价于f("a","b","c");
f("a");//输出 "a",[]
f();//输出 undefined,[]


//Part333333333333 扩展知识 call与apply的转换 两者之间的区别 课通过...Rest和...Spread转换
function abc(...v){
    console.log(v)
}
o1 = {};
abc.call(o1,...[1,2,3]);//等效于 abc.apply(o1,[1,2,3]);

//函数定义和调用时的 合并元素为数组（...Rest） 与 拆分数组为各个元素(...Spread)

//Part1111111111111111
//为什么要使用Symbol
// ES5里面对象的属性名都是字符串，
// 如果你需要使用一个别人提供的对象，你对这个对象有哪些属性也不是很清楚，
// 但又想为这个对象新增一些属性，那么你新增的属性名就很可能和原来的属性名发送冲突
// 例如：
var obj = {
    x:1,
    y:2,
    moveTo:function(x,y){
        this.x = x;
        this.y = y;
    }
}
obj.moveTo = function(x,y){
    console.log("方法被覆盖了");
};
obj.moveTo(0,0);
// 显然我们是不希望这种情况发生的。所以，我们需要确保每个属性名都是独一无二
// 因此，ES6里就引入了Symbol，用它来产生一个独一无二的值。

//定义Symbol变量，注意Symbol是基本数据类型的一种，不能用new
//回顾下基本数据类型的特点，区分基本类型和引用类型
let s = Symbol();//不能用new
typeof s;// "symbol"

//Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
var s1 = Symbol('foo');
var s2 = Symbol('bar');
console.log(s1); // Symbol(foo)
console.log(s2); // Symbol(bar)
console.log(s1.toString()); // "Symbol(foo)"
console.log(s2.toString()); // "Symbol(bar)"


//Part2222222222222222222
//注意，Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false

//如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
sym // Symbol(abc)

//Symbol值不能与其他类型的值进行运算，会报错。
var sym = Symbol('My symbol');
//"your symbol is " + sym;//报错
//但是，Symbol值可以显式转为字符串。
var sym = Symbol('My symbol');
String(sym); // 'Symbol(My symbol)'
sym.toString(); // 'Symbol(My symbol)'

//Part111111111111111
//由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，
//就能保证不会出现同名的属性。
//这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
//使用Symbol是用[]，而不是用点操作符
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';//注意中括号内不要加引号，后面介绍加引号和不加引号的区别
// 第二种写法
var a = {
    [mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"



//思考下述代码，是添加了几个属性，obj对象有几个属性？
var aSymbol = Symbol("abc");
var obj = {
    [aSymbol]: 'Hello!'
};
Object.defineProperty(obj, Symbol("abc"), { value: 'World!' });
console.log(obj);//思考obj对象有几个属性？

//Part22222222222222222
//上面代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个Symbol值。
//注意，Symbol值作为对象属性名时，不能用点运算符，使用中括号是注意使用引号和不用引号的区别
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
//上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个
//Symbol值。

//思考：
var myS1 = Symbol("xx");
var myS2 = "xx";
var obj = {
    [myS1]:123,
    [myS2]:456
};
console.log(obj[myS1],obj[Symbol("xx")]);//输出什么？如何解释Symbol
console.log(obj[myS2],obj["xx"]);
// console.log(obj["myS1"]);
// console.log(obj["myS2"]);

//同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中
// 如果不用[]的话相当于使用s对应的字符串定义属性
let s = Symbol();
let obj = {
    [s]: function (arg) {console.log("xx");}
};
obj[s](123);
// 上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个Symbol值。

// 采用增强的对象写法，上面代码的obj对象可以写得更简洁一些
let obj = {
    [s](arg) {console.log("xx");}
};


//遍历实例一
var obj = {};
var a = Symbol('a');
var b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols);// [Symbol(a), Symbol(b)]

//遍历实例二
var obj = {};
var foo = Symbol("foo");
Object.defineProperty(obj, foo, {
    value: "foo bar",
});
for (var i in obj) {
    console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj);// []
Object.getOwnPropertySymbols(obj);// [Symbol(foo)]


//Part2222222222222222222222
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
console.log(s1 === s2); // true

//Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。
// 它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
// Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，
// 如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30次，每次都会返回同一个Symbol值，
// 但是调用Symbol("cat")30次，会返回30个不同的Symbol值。

console.log(Symbol.for("bar") === Symbol.for("bar"));// true
console.log(Symbol("bar") === Symbol("bar"));// false
console.log(Symbol.for("bar") === Symbol("bar"));// false

//Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"
var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2)); // undefined

//思考：
var s3 = Symbol(Symbol.keyFor(s1));
console.log(s1 === s3);
console.log(s2 === s3);
var s4 = Symbol.for(Symbol.keyFor(s1));
console.log(s1 === s4);
console.log(s2 === s4);
//Part 111111111111111111111111111111111111111
var s1 = new Set([1,2,3,4,5,5,6,2,2]);
console.log(s1);

var s2 = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s2.add(x));
for (var i of s2) {
    console.log(i);
}// 2 3 5 4

//
// 例一
var set = new Set([1, 2, 3, 4, 4]);
console.log([...set]);
// [1, 2, 3, 4]
// 例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size); // 5

// 去除数组的重复成员
[...new Set([1,2,3,3])];

//
//区分基本类型和引用（对象）类型，两个对象总是不相等的，思考下述代码
var set = new Set();
set.add({});
console.log(set.size); // 1
set.add({});
console.log(set.size); // 2


//Part 22222222222222222222222222222222222222222222222
s.add(1).add(2).add(2);
// 注意2被加入了两次
s.size // 2
s.has(1); // true
s.has(2); // true
s.has(3); // false
s.delete(2);
s.has(2); // false

//
var properties = new Set();
properties.add('width');
properties.add('height');
console.log(properties.size);
if (properties.has('width')&&properties.has('height')) {
    console.log("do something!");
}

//Array.from方法可以将Set结构转为数组。
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);

//...也可以将set转换成数组
console.log([...(new Set([1, 2, 3, 4, 5]))]);//[1, 2, 3, 4, 5]
//如果不加[]就是散列的元素
console.log(...(new Set([1, 2, 3, 4, 5])));//1, 2, 3, 4, 5


//关于Set的遍历方法
var set = new Set(['red', 'green', 'blue']);
console.log(typeof set.keys());//注意是什么类型，是否可迭代，是否可用for...of遍历
console.log(typeof set.values());
console.log(typeof set.entries());

//keys方法、values方法、entries方法返回的都是遍历器对象
for (var item of set.keys()) {
    console.log(item);
}
// red
// green
// blue
for (var item of set.values()) {
    console.log(item);
}
// red
// green
// blue
for (var item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

//练习：使用解构赋值，将数据提取
for (var [key,value] of set.entries()) {
    console.log(key,value);
}

//Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。
var set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2) );
// 2
// 4
// 6

//而且，数组的map和filter方法也可以间接用于Set了，通过...转成数组后调用后再生成set
var set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}
var set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}


// set应用案例 并集、交集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

//Part 111111111111111111111111
var m = new Map();
var o = {p: 'Hello World'};
m.set(o, 'content');
m.get(o); // "content"
m.has(o); // true
m.delete(o); // true
m.has(o); // false

//
//作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
var o = {};
var map = new Map([
    ['name', '张三'],
    [o, 'Author']
]);
map.size; // 2
map.has('name'); // true
map.get('name'); // "张三"
map.has(o); // true
map.get(o); // "Author"

//Map构造函数接受数组作为参数，实际上执行的是下面的算法。
var items = [
    ['name', '张三'],
    ['title', 'Author']
];
var map = new Map();
items.forEach(([key, value]) => map.set(key, value));
//等效于
// items.forEach(function(v){
// 	map.set(v[0],v[1]);
// });

//
// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
let map = new Map();
map.set(1, 'aaa').set(1, 'bbb');
map.get(1); // "bbb"
// 上面代码对键1连续赋值两次，后一次的值覆盖前一次的值。
// 如果读取一个未知的键，则返回undefined。
new Map().get('asfddfsasadf');
// undefined

//只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。
//思考对象会存在这个问题么，对象的键是什么类型，判等是依据什么？
//要特别注意
var map = new Map();
map.set(['a'], 555);
map.get(['a']); // undefined

//思考：
var map = new Map();
map.set('a', 555);
map.get('a'); // 输出什么？

//
var map = new Map();
var k1 = ['a'];
var k2 = ['a'];
map.set(k1, 111);
map.set(k2, 222);
map.get(k1); // 111
map.get(k2); // 222
//上面代码中，变量k1和k2的值是一样的，但是它们在Map结构中被视为两个键。
// 由上可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
// 这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，
// 就不用担心自己的属性与原作者的属性同名。

// 如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，
// 包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键（特例）。
let map = new Map();
map.set(NaN, 123);
map.get(NaN); // 123
map.set(-0, 123);
map.get(+0); // 123



//Part2222222222222222222222222222222222222222 Map相关方法
//Map原型属性和方法/////////////////////////////////////////
let map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2

var m = new Map();
m.set("edition", 6); // 键是字符串
m.set(262, "standard"); // 键是数值
m.set(undefined, "nah"); // 键是undefined

// set方法返回的是Map本身，因此可以采用链式写法
let map = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
// get方法读取key对应的键值，如果找不到key，返回undefined。
var m = new Map();
var hello = function() {console.log("hello");};
m.set(hello, "Hello ES6!"); // 键是函数
m.get(hello); // Hello ES6!

//has方法返回一个布尔值，表示某个键是否在Map数据结构中。
var m = new Map();
m.set("edition", 6);
m.set(262, "standard");
m.set(undefined, "nah");
m.has("edition"); // true
m.has("years"); // false
m.has(262); // true
m.has(undefined); // true

//delete方法删除某个键，返回true。如果删除失败，返回false。
var m = new Map();
m.set(undefined, "nah");
m.has(undefined); // true
m.delete(undefined);
m.has(undefined); // false

//clear方法清除所有成员，没有返回值。
let map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2
map.clear();
map.size // 0

//Map遍历相关的方法////////////////////////////////
let map = new Map([
    ['F', 'no'],
    ['T', 'yes'],
]);
console.log(typeof map.keys());//注意类型是对象，不是数组
for (let key of map.keys()) {
    console.log(key);
}
// "F"
// "T"
console.log(typeof map.values());//注意类型是对象，不是数组
for (let value of map.values()) {
    console.log(value);
}
// "no"
// "yes"
for (let item of map.entries()) {
    console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"
// 或者 回顾解构赋值
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// 等同于使用map.entries()
// for (let [key, value] of map) {
//     console.log(key, value);
// }

/////////////////////////////////////////////
//Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);
console.log([...map.keys()]);
// [1, 2, 3]
console.log([...map.values()]);
// ['one', 'two', 'three']
console.log([...map.entries()]);
// [[1,'one'], [2, 'two'], [3, 'three']]
console.log([...map]);
// [[1,'one'], [2, 'two'], [3, 'three']]

//结合数组的map方法、filter方法，可以实现Map的遍历和过滤（Map本身没有map和filter方法）。
let map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
let map1 = new Map(
    [...map0].filter(([k, v]) => k < 3)
);
// 产生Map结构 {1 => 'a', 2 => 'b'}
let map2 = new Map(
    [...map0].map(([k, v]) => [k * 2, '_' + v])
);
// 产生Map结构 {2 => '_a', 4 => '_b', 6 => '_c'}

//此外，Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
map.forEach(function(value, key, map) {
    console.log("Key: %s, Value: %s", key, value);
});



//扩展内容，补充思考：
//Map与其他数据结构对象的转换，参考电子书13.3.4章节
//Map转为数组
//前面已经提过，Map转为数组最方便的方法，就是使用扩展运算符（...）。
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

//数组转为Map
//将数组转入Map构造函数，就可以转为Map。
new Map([[true, 7], [{foo: 3}, ['abc']]]);
// Map {true => 7, Object {foo: 3} => ['abc']}

//Map转为对象
//如果所有Map的键都是字符串，它可以转为对象。
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

//对象转为Map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
objToStrMap({yes: true, no: false});
// [ [ 'yes', true ], [ 'no', false ] ]

