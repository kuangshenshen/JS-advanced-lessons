//不用解构赋值方式定义变量
var a = 1;var b = 2;var c = 3;
console.log(a,b,c);

//用解构赋值方式定义变量
//Part 1111111111111111 数组的解构赋值
var [a, b, c] = [1, 2, 3];
console.log(a,b,c);

//let 也支持解构赋值
let [foo,[[bar],baz]] = [1,[[2],3]];
console.log(foo,bar,baz);

//
let [ , , xx] = ["foo", "bar", "baz"];
console.log(xx);// "baz"

let [x, , y] = [1, 2, 3];
console.log(x,y);//1 3

let [head, ...tail] = [1, 2, 3, 4];
console.log(head,tail);//1 [2, 3, 4]

let [d, e, ...f] = ['a'];
console.log(d,e,f);//"a" undefined []

//注意：如果解构不成功，变量的值就等于undefined
var [foo2] = [];
var [bar2, fee2] = [1];
console.log(foo2,fee2);

//不完全解构的情况
let [x2, y2] = [1, 2, 3];
console.log(x2, y2);

let [a2, [b2], d2] = [1, [2, 3], 4];
console.log(a2, b2, d2);

//如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

//解构赋值中的默认值
var [foo3 = true] = [];//foo3 为 true
[x3, y3 = 'b'] = ['a']; // x3='a', y3='b'
[x4, y4 = 'b'] = ['a',undefined]; // x4='a'y4='b'

// ES6内部使用严格相等运算符（===），判断一个位置是否有值。
// 所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
var [x5 = 1] = [undefined];//x5 为 1
var [x6 = 1] = [null];//x6 为 null

//
function f2() {
    return 2;
}
let [x7 = f2()] = [1];
console.log(x7);

//默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [m1 = 1, n1 = m1] = []; // m1=1; n1=1
let [m2 = 1, n2 = m2] = [2]; // m2=2; n2=2
let [m3 = 1, n3 = m3] = [1, 2]; // m3=1; n3=2
//let [m4 = n4, n4 = 1] = []; // ReferenceError
console.log(m1,n1,m2,n2,m3,n3);

//
let a = [];
let b=[2,3,4];
[a[0],a[1],a[2]] = b;
console.log(a == b);//false or true

let a = [];
let b=[2,3,4];
a = b;
console.log(a == b);//false or true

//以下内容先只做了解，详细内容参见Set Map和Generator章节
//对于Set结构，也可以使用数组的解构赋值
let [x8, y8, z8] = new Set(["a", "b", "c"]);

//Generator案例
function* fibs() {
    var a8 = 0;
    var b8 = 1;
    while (true) {
        yield a8;
        [a8, b8] = [b8, a8 + b8];
    }
}
var [first, second, third, fourth, fifth, sixth,xxx,yyy,zzz,mm,nn,pp] = fibs();
console.log(first, second, third, fourth,fifth,sixth,xxx,yyy,zzz,mm,nn,pp);//
//对象的解构赋值
var { foo1, bar1 } = { foo1: "aaa", bar1: "bbb" };
console.log(foo1,bar1);

// 对象的解构与数组有一个重要的不同。\
// 数组的元素是按次序排列的，变量的取值由它的位置决定
// 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
var { bar2, foo2 } = { foo2: "ccc", bar2: "ddd" };//顺序不同，没关系
console.log(foo2,bar2);

var { baz3 } = { foo3: "ccc", bar3: "ddd" };
console.log(baz3);

////////////////////////////////////////////////////
//左侧为键值对时,注意键值对赋值时的对应关系
var { foo4: baz4 } = { foo4: 'aaa', bar4: 'bbb' };
console.log(baz4);// "aaa"

////////////////////////////////////////////////////
let obj1 = { first: 'hello', last: 'world' };

let { first: f, last: l } = obj1;
console.log(f,l);//注意和下边写法的区别

let { first, last } = obj1;
console.log(first,last);

////////////////////////////////////////
//这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。
var { foo5: foo5, bar5: bar5 } = { foo5: "aaa", bar5: "bbb" };

//也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
var { foo6: baz6 } = { foo6: "aaa", bar6: "bbb" };
console.log(baz6);// "aaa"
//foo6 // error: foo is not defined
//上面代码中，真正被赋值的是变量baz6，而不是模式foo6

/////////////////
//和数组一样，解构也可以用于嵌套结构的对象,如果是键值对的情况，键只用于匹配，真正赋给的是对应的值
var obj2 = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};
var { p: [x, { y }] } = obj2;
console.log(x); // "Hello"
console.log(y); // "World //若上边改为var { p: [x, { y:z }] } = obj2;还能输出y么？
//思考console.log(p);是正常输出还是报错？

///
var node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};
var { loc: { start: { line }} } = node;
line // 1
//loc // error: loc is undefined
//start // error: start is undefined
//上面代码中，只有line是变量，loc和start都是模式，不会被赋值。

//嵌套赋值的例子，为什么加括号，如果不加括号解析器将解析为代码块，所以加括号
let obj3 = {};
let arr = [];
({ foo7: obj3.prop, bar7: arr[0] } = { foo7: 123, bar7: true });
console.log(obj3);// {prop:123}
console.log(arr);// [true]

//对象的解构也可以指定默认值。
var {x2 = 3} = {};
console.log(x2); // 3

var {x3, y3 = 5} = {x3: 1};
console.log(x3); // 1
console.log(y3); // 5

var {x4:y4 = 3} = {};
console.log(y4); // 3

var {x5:y5 = 3} = {x5: 5};
console.log(y5); // 5
var { message: msg = 'Something went wrong' } = {};
console.log(msg); // "Something went wrong"

//字符串也可以解构赋值
const [a, b, c, d, e] = 'hello';//相当于将'hello'转成了["h","e","l","l","o"]后解构
console.log(a); // "h"
console.log(b); // "e"
console.log(c); // "l"
console.log(d); // "l"
console.log(e); // "o"

//类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
console.log(len); // 5


//解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let {toString: s1} = 123;
console.log(s1); //
//s1 === Number.prototype.toString // true

let {toString: s2} = true;
console.log(s2); //
//s2 === Boolean.prototype.toString // true
function add([x, y]){
    return x + y;
}
add([1, 2]); // 3

/////
[[1, 2], [3, 4]].map(function([a, b]){return a + b;});
// [ 3, 7 ]
//箭头函数表示形式 [[1, 2], [3, 4]].map(([a, b]) => a + b);

/////
//函数参数的解构也可以使用默认值,下例中用了两次的解构赋值
function move1({x = 0, y = 0} = {}) {
    return [x, y];
}
console.log(move1({x: 3, y: 4})); // [3, 4]
console.log(move1({x: 3})); // [3, 0]
console.log(move1({})); // [0, 0]
console.log(move1()); // [0, 0]

///////
//注意，下面的写法会得到不一样的结果。
function move2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}
console.log(move2({x: 3, y: 8})); // [3, 8]
console.log(move2({x: 3})); // [3, undefined]
console.log(move2({})); // [undefined, undefined]
console.log(move2()); // [0, 0]
//上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。


//undefined就会触发函数参数的默认值
[1, undefined, 3].map(function(x = 'yes') {return x;});
// [ 1, 'yes', 3 ]
//箭头函数表示形式 [1, undefined, 3].map((x = 'yes') => x);
// 1 交换变量的值
var [x,y] = ["a","b"];
[x, y] = [y, x];
console.log(x,y);//b,a
//上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。

// 2 从函数返回多个值
// 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
// 有了解构赋值，取出这些值就非常方便

// 返回一个数组
function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象,解构所有属性
function example() {
    return {
        foo: 1,
        bar: 2
    };
}
var { foo, bar } = example();

// 3 函数参数的定义
//解构赋值可以方便地将一组参数与变量名对应起来。
// 参数是一组有次序的值
function f([x, y, z]) {
    console.log(x);
    console.log(y);
    console.log(z);
}
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) {
    console.log(x);
    console.log(y);
    console.log(z);
}
f({z: 3, y: 2, x: 1});
