//JS对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        console.log(this.str);
    }
};
console.log(obj.num);//10
console.log(obj.str);//Hi
obj.show();			 //Hi
/**
 * Created by qile on 2017/8/14.
 */
//Part 1
var i = new String("str");          // String Object
var h = new Number(1);              // Number Object
var g = new Boolean(true);          // Boolean Object
var j = new Object({name : "Tom"}); // Object Object
var k = new Array([1, 2, 3, 4]);    // Array Object
var l = new Date();                 // Date Object
var m = new Error();
var n = new Function();
var o = new RegExp("\\d");

// typeof
console.log(typeof Array);//function
console.log(typeof Function);//function
console.log(typeof Date);//function
console.log(typeof Number);//function
console.log(typeof String);//function
console.log(typeof Boolean);//function
console.log(typeof Math);//object
console.log(typeof JSON);//object

// Part 2
// instanceof
console.log(Object instanceof Function);//true
console.log(Object instanceof Object);//true
console.log(Boolean instanceof Function);//true
console.log(Boolean instanceof Object);//true
console.log(String instanceof Function);//true
console.log(String instanceof Object);//true
console.log(Number instanceof Function);//true
console.log(Number instanceof Object);//true
console.log(Function instanceof Function);//true
console.log(Function instanceof Object);//true
console.log(Array instanceof Function);//true
console.log(Array instanceof Object);//true
console.log(Date instanceof Function);//true
console.log(Date instanceof Object);//true
console.log(Math instanceof Function);//false
console.log(Math instanceof Object);//true
console.log(JSON instanceof Function);//false
console.log(JSON instanceof Object);//true

// 访问器属性 实例一
var o = {
    _x:1.0,//如果都写成x会怎样
    get x(){
        return this._x;//如果都写成x会怎样
    },
    set x(val){
        this._x = val;//如果都写成x会怎样
    }
};
console.log(o.x);//1
o.x = 2;
console.log(o.x,o._x);//2 2
//o.hasOwnProperty("x");//访问器属性
//o.hasOwnProperty("_x");//数据属性

//访问器属性 实例二 只读
var o = {
    _x:1.0,
    get x(){
        return this._x;
    }
};
console.log(o.x);//1
o.x = 2;
console.log(o.x,o._x);//1 1

// 访问器属性 实例三
var p1 = {
    _name:"Jack",
    _age:23,
    set age(val){
        if(val>0&&val<150){
            this._age = val;
        }else{
            console.log("请设置正常年龄");//请设置正常年龄
        }
    },
    get age(){
        return this._age;
    }
};
p1.age = 178;
console.log(p1.age);//23


//访问器属性 综合实例
var p ={
    x:1,
    y:1,
    get r(){return Math.sqrt(this.x*this.x+this.y*this.y);},
    set r(newValue){
        var oldValue = Math.sqrt(this.x*this.x+this.y*this.y);
        var ratio = newValue/oldValue;
        this.x*=ratio;
        this.y*=ratio;
    },
    get theta(){return Math.atan2(this.y,this.x);}
};
var q = Object.create(p);
q.x = 2;
q.y = 2;
console.log(q.r);//2.8284271247461903
console.log(q.theta);//0.7853981633974483

//创建对象 三种方法
//通过字面量的方式创建 JS对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.num);//10
console.log(obj.str);//Hi
console.log(obj.show());//Hi
console.log(obj.__proto__);//object
console.log(obj.__proto__ === Object.prototype);//true

//通过Object工场方法创建JS对象,注：JS对象是通过原型链的方式实现的对象继承
var newObj = Object.create(obj);//newObj的原型是obj
newObj.age = 23;
console.log(newObj.num);//10
console.log(newObj.str);//Hi
console.log(newObj.show());//Hi
console.log(newObj.age);//自有属性  23
console.log(newObj.__proto__);//object
console.log(newObj.__proto__ === obj);//true

//Object.create的第二个参数，参见属性特性章节
/*
o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
o = Object.create(Object.prototype, {
    // foo会成为所创建对象的数据属性
    foo: {
        writable:true,
        configurable:true,
        value: "hello"
    },
    // bar会成为所创建对象的访问器属性
    bar: {
        configurable: false,
        get: function() { return 10 },
        set: function(value) {
            console.log("Setting `o.bar` to", value);
        }
    }
});
*/

//构造函数的方式创建JS对象  此处略讲，详情参照后续面向对象编程 注：JS对象是通过原型链的方式实现的对象继承
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function(){
    console.log("hello,i'm",this.name,this.age,"years old");
};
var person1 = new Person("Mike",21);
person1.sayName();

//注意：
var objStr = new Object("xxx");
console.log(typeof objStr);//object
console.log(objStr instanceof String);//true

var objNum = new Object(23);
console.log(typeof objNum);//object
console.log(objNum instanceof Number);//true

var objBoolean = new Object(true);
console.log(typeof objBoolean);//object
console.log(objBoolean instanceof Boolean);//true


var obj = {};
obj.x = 2;//直接添加属性
console.log(obj.x);//通过.访问属性 2
obj.x = 5;//设置属性
console.log(obj["x"]);//通过[]访问属性 5
delete obj.x;//删除属性
console.log(obj.x);//undefined

//访问属性的for循环练习
var obj2 = {
    id_1:2,
    id_2:4,
    id_3:6,
    id_4:8,
    id_5:10
};

//思考obj3 和 obj4 内容是什么？为什么？
var obj3 = {};
for(var i=0;i<10;i++){
    obj3.i = i;
}// obj3 = {0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9}

var obj4 = {};
for(var i=0;i<10;i++){
    obj4[i] = i;
}//obj4 = {0,1,2,3,4,5,6,7,8,9}
