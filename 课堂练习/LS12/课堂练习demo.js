var objProto = {
    z:3
};

var obj = Object.create(objProto);
obj.x = 1;
obj.y = 2;

console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3

console.log(obj.toString);//原型链上有toString属性

for(var k in obj){//通过for...in遍历所有原型链上的属性
    console.log(k,obj[k]);//遍历到toString
    //x 1
    //y 2
    //z 3
}

//修改obj属性的特性
var obj = {
    x:1,
    y:2
};
//Object.defineProperty(obj,"x",{writable:false,value:11,enumerable:false,configurable:true});
Object.defineProperty(obj,"x",{enumerable:false});
for(var k in obj){
    console.log(k,obj[k]);// y 2
}

var person = {name:"Jack"};
Object.defineProperty(person,"name",{
    writable:false,//改成true会如何
    configurable:false,//改成true会如何
    enumerable:true,
    value:"Mike"
});
console.log(person.name);//Mike;Mike
person.name = "Lucy";
console.log(person.name);//Mike;Lucy
delete person.name;
console.log(person.name);//Mike;undefined

//Part 1
var obj = {
    x:1,
    y:2
};
//直接添加的属性，其所有特性默认都是true
obj.z = 3;
for(var k in obj){
    console.log(k,obj[k]);//x 1;y 2;z 3
}

//Part 2

var obj = {
    x:1,
    y:2
};
//直接添加的属性，其所有特性默认都是true
obj.z = 3;

//通过Object.defineProperty方法添加的属性，除了手动修改，其所有特性默认都是false
Object.defineProperty(obj,"w",{value:456,configurable:true});//writable,enumerable没有指定，所以默认为false
for(var k in obj){
    console.log(k,obj[k]);//x 1;y 2;z 3
}
//console.log(obj.w);//有w，但上边for...in遍历不到

var obj1={
    _name:"Lucy"
};
Object.defineProperty(obj1,"name",{
    get:function (){//只定义了get 特性，因此只能读不能写
        return this._name;
    }
});
console.log(obj1.name);//"Lucy"
obj1.name="jack";//只定义了getter访问器，因此写入失效
console.log(obj1.name);//"Lucy"

//改变访问器属性特性 注意添加访问器和修改访问器特性的写法的区别
var obj2={
    _name:"Lucy",
    set name(val){this._name = val;},
    get name(){return this._name;}
};
Object.defineProperty(obj2,"name",{
    get:function (){
        return this._name+"_hihi";
    },
    set:function (val) {
        this._name = val+"_haha";
    }
});
console.log(obj2.name);//Lucy_hihi
obj2.name="jack";
console.log(obj2.name);//jack_haha_hihi


var person = {_name:"Jack"};
Object.defineProperty(person,"name",{
    configurable:false,//若为true会如何
    enumerable:true,
    set:function(val){this._name = val},
    get:function(){return this._name}
});
console.log(person.name);//Jack
person.name = "Lucy";
console.log(person.name);//Lucy
delete person.name;//delete person.name;
console.log(person.name);//Lucy


var obj = {x:5};
Object.defineProperty(obj,"y",{
    configurable:false,
    writable:false,
    enumerable:true,
    value:6
});
Object.defineProperty(obj,"z",{
    configurable:false,
    value:7
});
Object.getOwnPropertyDescriptor(obj,"x");
//Object.getOwnPropertyDescriptor(obj,"y");
//Object.getOwnPropertyDescriptor(obj,"z");

var obj = {_x:1};
// Object.defineProperty(obj,"y",{
//     configurable:false,
//     writable:false,
//     enumerable:true,
//     value:6
// });
Object.defineProperties(obj,{
    y:{value:2,writable:true,configurable:true,enumerable:true},
    z:{value:2,writable:true,configurable:true,enumerable:true},
    x:{
        get:function(){return this._x;},
        set:function (val) {
            this._x = val;
        }
    }
});


//批量添加属性并设置属性特性 book实例
var book={};
//调用Object.defineProperties(对象名，要添加的属性)方法，为对象一次定义多个属性(1.数据属性)(2.访问器属性)
Object.defineProperties(book,{
//添加的两个数据属性(_year,edition)
    _year:{//(_year)前面的下划线表示只能通过对象方法访问的属性
        value:2004,
        writable:true //如果没写这一行会怎样？
    },
    edition:{
        value:1,
        writable:true
    },
//添加了访问器属性(year)
    year:{
//调用get方法读取属性
        get:function(){
            return this._year;
        },
//调用set方法写入属性
        set:function(newValue){
            if (newValue>2004) {
                this._year=newValue;
                this.edition+=newValue-2004;
            }
        }
    }
});
//测试
book.year=2006;


//关于Object.create的第二个属性，思考x是empty自身属性还是obj2的自身属性？
var empty = {};
var obj2 = Object.create(empty,{
   x:{value:1}, y:{value:2,enumerable:true}
});
console.log(obj2);
console.log(obj2.hasOwnProperty("x"));



//属性特性的继承特点
var o1 = {};
Object.defineProperty(o1,"x",{
    value:12,
    //writable:true
});//思考configurable和writable是true还是false
o1.x = 34;
console.log(o1.x);//12

var o2 = Object.create(o1);
o2.x = 56;//是在o2上添加了新属性x，还是修改了o1的x属性，还是前两者都不是？
console.log(o2.x);//12 若o1的x的writable特性为true又会如何？//o1 34//o2  56

//访问器属性特性的继承特点
var o3 = {_x:21};
Object.defineProperty(o3,"x",{
    get:function(){return this._x}
});
o3.x = 34;
console.log(o3.x);//21

var o4 = Object.create(o3);
Object.defineProperty(o4,"x",{
    set:function (val) {
        this._x = val;
    },
    get:function () {
        return ++this._x;
    }
});
o4.x = 56;
console.log(o4.x);//57


//全局变量的属性特性是如何的呢？
//{value: 23, writable: true, enumerable: true, configurable: false}
var a = 23;
console.log(Object.getOwnPropertyDescriptor(window,"a"));
delete a;//等效delete window.a;



// 要求掌握下述方法的使用
// Object.keys() 返回所有自有（非继承）可枚举属性的键
// Object.getOwnPropertyNames()返回所有自有（非继承）键，包括不可枚举
// Object.prototype.hasOwnProperty() 判断自身是否有该属性，不包括可枚举的属性
// Object.prototype.propertyIsEnumerable() 判断自身是否有该属性并检测该属性是否可枚举
// in  检测一个对象是否有某个属性，包括继承的属性，包括不可枚举的属性
// for...in 遍历一个对象的属性，包括继承的属性，但不包括不可枚举的属性
// 思考Object静态方法和Object.prototype原型方法的区别（都共享了方法，使用上有什么区别）
var o3 = {};
o3.y = "yyy";
Object.defineProperty(o3,"x",
    {configurable:true,enumerable:false,writable:true,value:"xxx"}
);
console.log(Object.keys(o3));//是否包含可枚举属性的键？
console.log(Object.getOwnPropertyNames(o3));//是否包含可枚举属性的键？

console.log(o3.hasOwnProperty("x"));
console.log(o3.propertyIsEnumerable("x"));

for(var k in o3){ //遍历不到x属性
    console.log(k,o3[k]);
}
console.log("x" in o3,"y" in o3);// in 和 for...in 的区别 关于可枚举属性特性
console.log(o3.hasOwnProperty("x"),o3.hasOwnProperty("y"));//是否关心可枚举


//遍历属性的综合实例
var o4 = {};
o4.a = "aaa";
Object.defineProperty(o4,"b",
    {configurable:true,enumerable:false,writable:true,value:"bbb"}
);
var o5 = Object.create(o4);
o5.c = 234;
Object.defineProperty(o5,"d",{enumerable:false,value:567});
for(var k in o5){
    if(o5.hasOwnProperty(k)){
        console.log("o5 自有可遍历属性：",k,o5[k]);
    }else {
        console.log("o5 非自有可遍历属性：",k,o5[k]);
    }
}
console.log(o5.propertyIsEnumerable("a"),
    o5.propertyIsEnumerable("b"),
    o5.propertyIsEnumerable("c"),
    o5.propertyIsEnumerable("d")
);//多少个true 多少个false
console.log("a" in o5,"b" in o5,"c" in o5,"d" in o5);//多少个true 多少个false
console.log(Object.keys(o5));//只显示自身可枚举的属性
console.log(Object.getOwnPropertyNames(o5));//返回一个数组，包含自身所有属性，包括不可枚举的属性

//console.log(o4.isPrototypeOf(o5));



//新对象默认是可扩展的无论何种方式创建的对象，这里使用的是字面量方式
var empty1 = {a:1};
console.log(Object.isExtensible(empty1));//true

//对象是否可以扩展与对象的属性是否可以配置无关
empty2 = Object.create({},{
    "a":{
        value : 1,
        configurable : false,//不可配置
        enumerable : true,//可枚举
        writable : true//可写
    }
});
console.log(Object.isExtensible(empty2));


//////////Object.isExtensible和Object.preventExtensions实例////////
(function () {
    //Object.preventExtensions 将原对象变得不可扩展,并且返回原对象.
    var obj = {};
    var obj2 = Object.preventExtensions(obj);
    console.log(obj === obj2);//true

    //新创建的对象默认是可扩展的
    var empty = {};
    console.log(Object.isExtensible(empty));//true
    empty.a = 1;//添加成功

    //将其变为不可扩展对象
    Object.preventExtensions(empty);
    console.log(Object.isExtensible(empty));//false

    //使用传统方式为不可扩展对象添加属性
    empty.b = 2;//静默失败,不抛出错误
    empty["c"] = 3;//静默失败,不抛出错误

    //在严格模式中,为不可扩展对象添加属性将抛出错误
    (function fail(){
        "use strict";
        empty.d = "4";//throws a TypeError
    })();

    //使用 Object.defineProperty方法为不可扩展对象添加新属性会抛出异常
    Object.defineProperty(empty,"e",{value : 5});//抛出 TypeError 异常
    Object.defineProperty(empty,"a",{value : 2});
    console.log(empty.a);//输出2
})();


//Part 2 JS对象是否密封 isSealed
//如果对象不可扩展，且所有属性的可配置特性为false，则该对象为密封的对象
(function () {
    //新建的对象默认不是密封的
    var empty = {};
    console.log(Object.isSealed(empty));//false

    //如果把一个空对象变得不可扩展,则它同时也会变成个密封对象.
    Object.preventExtensions(empty);
    console.log(Object.isSealed(empty));//true

    //但如果这个对象不是空对象,则它不会变成密封对象,因为密封对象的所有自身属性必须是不可配置的.
    var hasProp = {fee : "fie foe fum"};
    Object.preventExtensions(hasProp);
    console.log(Object.isSealed(hasProp));//false

    //如果把这个属性变得不可配置,则这个对象也就成了密封对象.
    Object.defineProperty(hasProp,"fee",{configurable : false});
    console.log(Object.isSealed(hasProp));//true
})();

//////////Object.isSealed和Object.seal实例////////
(function () {
    var obj = {             //声明一个对象
        prop:function(){},
        foo:"bar"
    };
    //可以添加新的属性,已有属性的值可以修改,可以删除
    obj.foo = "baz";
    obj.lumpy = "woof";
    delete obj.prop;

    var o = Object.seal(obj);//将 obj 密封,且返回原对象
    console.log(o === obj);//true
    console.log(Object.isSealed(obj));//true

    //仍然可以修改密封对象上的属性的值
    obj.foo = "quux";//修改成功

    //但不能把密封对象的属性进行重新配置,譬如讲数据属性重定义成访问器属性.
    //Object.defineProperty(obj,"foo",{get : function(){return "g";}});//抛出 TypeError

    //任何除修改属性值以外的操作都会失败
    obj.quaxxor = "the friendly duck";//失败,属性没有成功添加，因为seal包括了不可扩展
    delete obj.foo;//静默失败,属性没有删除成功

    //在严格模式中,会抛出 TypeError 异常
    (function fail(){
        "use strict";
        //delete obj.foo;//抛出 TypeError 异常
        //obj.sparky = "arf";//抛出 TYpeError 异常
    })();

    //Object.defineProperty(obj,"ohai",{value :17});//添加属性失败
    Object.defineProperty(obj,"foo",{value : "eit"});//修改成功
    console.log(obj.foo);//“eit”
})();

////Part 3 JS对象是否冻结 isFrozen
//如果对象不可扩展，所有属性的可配置特性为false，
//且所有属性的可写特性为false则该对象为密封的对象
(function () {
    //一个对象默认是可扩展的,所以他也是非冻结的.
    console.log(Object.isFrozen({}));//false

    //一个不可扩展的空对象同时也是一个冻结对象.一个不可扩展的空对象也是密封对象
    var vacuouslyFrozen = Object.preventExtensions({});
    console.log(Object.isFrozen(vacuouslyFrozen) === true);//true
    console.log(Object.isSealed(vacuouslyFrozen) === true);//true

    //一个非空对象默认也是非冻结的.
    var oneProp = { p:42 };
    console.log(Object.isFrozen(oneProp));//false

    //让这个对象变的不可扩展,并不意味着这个对象变成了冻结对象,因为 p 属性仍然是可以配置的(而且可写的).
    Object.preventExtensions( oneProp );
    console.log(Object.isFrozen(oneProp));//false

    //如果删除了这个属性,则它成为空对象,会成为一个冻结对象.
    delete oneProp.p;
    console.log(Object.isFrozen(oneProp));//true

    //一个不可扩展的对象,拥有一个不可写但可配置的属性,则它仍然是非冻结的.
    var nonWritable = { e : "plep" };
    Object.preventExtensions(nonWritable);
    Object.defineProperty(nonWritable,"e",{writable : false});//不可写
    console.log(Object.isFrozen(nonWritable));//false

    //把这个属性改为不可配置,会让这个对象成为冻结对象
    Object.defineProperty(nonWritable,"e",{configurable : false});//不可配置
    console.log(Object.isFrozen(nonWritable));//true

    //一个不可扩展的对象,值拥有一个访问器,则它仍然是非冻结的.
    var accessor = {get food(){return "yum";}};//这里使用的是字面值法创建对象,默认可配置
    Object.preventExtensions(accessor);
    console.log(Object.isFrozen(accessor));//false

    //把这个属性改为不可配置,会让这个对象成为冻结对象.
    Object.defineProperty(accessor,"food",{configurable:false});
    console.log(Object.isFrozen(accessor));//true


    //使用 Object.freeze 是冻结一个对象的最方便的方法.
    var frozen = {1:81};
    console.log(Object.isFrozen(frozen));//false
    Object.freeze(frozen);
    console.log(Object.isFrozen(frozen));//true

    //一个冻结对象也是一个密封对象
    console.log(Object.isSealed(frozen));//true

    //一个冻结对象也是一个不可扩展对象
    console.log(Object.isExtensible(frozen));//false
})();

//////////Object.isFrozen和Object.freeze实例////////
(function () {
    var obj = {
        prop:function(){},
        foo:"bar"
    };
    //可以添加新的属性,已有的属性可以被修改或删除
    obj.foo = "baz";
    obj.lumpy = "woof";
    delete obj.prop;

    Object.freeze(obj);//冻结

    console.log(Object.isFrozen(obj));//true

    //对冻结对象的任何操作都会失败
    obj.foo = "quux";//静默失败;
    obj.quaxxor = "the friendly duck";//静默失败

    //在严格模式中会抛出 TypeError 异常
    (function () {
        "use strict";
        //obj.foo = "sparky";//抛出 TypeError 异常
        //delete obj.quaxxor;//抛出 TypeError 异常
        //obj.sparky = "arf";//抛出 TypeError 异常
    })();

    //使用 Object.defineProperty方法同样会抛出 TypeError 异常
    //Object.defineProperty(obj,"ohai",{value:17});//抛出 TypeError 异常
    //Object.defineProperty(obj,"foo",{value:"eit"});//抛出 TypeError 异常
})();


//思考基本数据类型 是冻结的么？如何理解基本数据类型的不可变性
var str = "xxx";
console.log(Object.isFrozen(str));

//以下内容仅做了解 浅冻结与深冻结 类比 浅拷贝与深拷贝
(function () {
    obj = {
        internal :{}
    };
    Object.freeze(obj);//浅冻结
    obj.internal.a = "aValue";
    console.log(obj.internal.a);//"aValue"

    //想让一个对象变得完全冻结,冻结所有对象中的对象,可以使用下面的函数.
    function deepFreeze(o){
        var prop,propKey;
        Object.freeze(o);//首先冻结第一层对象
        for(propKey in o){
            prop = o[propKey];
            if(!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)){
                continue;
            }
            deepFreeze(prop);//递归
        }
    }

    deepFreeze(obj);
    obj.internal.b = "bValue";//静默失败
    console.log(obj.internal.b);//undefined
})();

