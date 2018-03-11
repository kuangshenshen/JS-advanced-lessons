console.log(typeof 123);
console.log(typeof true);
console.log(typeof "abc");
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof {name:"Mike",age:20});

console.log(typeof function foo(){});
console.log(typeof Array);
console.log(typeof Function);
console.log(typeof Date);
console.log(typeof Number);

console.log(typeof Math);
console.log(typeof JSON);
var a = {name:"Mike",age:20};
console.log(a instanceof Object);

var b = [12,34,{},""];
console.log(b instanceof Array);

var Person = function(){
    
};
var p1 = new Person();
console.log(p1 instanceof Person);
function foo() {
var n = 10;
var m = true;
var str = "Hello World"; 


var obj = { value: "Hello World" };
};
foo();
var a = 23;
var b = 34;
(function () {
    
    var str_a = "a";
    var str_b = str_a;
    str_b = "b"; 
    console.log(str_a,str_b);

    var obj_a = {v:"a"}; 
    var obj_b = obj_a; 
    obj_b.v = "b"; 
    console.log(obj_a,obj_b);

    obj_b = {v:"c"}; 
    console.log(obj_a,obj_b);
}());


var obj_c = {x1:2,y1:3};
var obj_d = {x2:2,y2:3};

console.log(obj_c.x1 === obj_d.x2);
(function () { 
    var a1 = 100;
    var b1 = 100;
    console.log(a1 == b1);
    console.log(a1 === b1);
    

    var a2 = new Number(200);
    var b2 = new Number(200);
    console.log(a2 == b2);
    console.log(a2 === b2);
    

    var a3 = new Number(200);
    var b3 = a3;
    console.log(a3 == b3);
    console.log(a3 === b3);
    
    b3 = new Number(200);
    console.log(a3 === b3);


    var a4 = new Number(200);
    var b4 = 200;
    console.log(a4 == b4);
    console.log(a4 === b4);
    

    var a5 = {x:1,y:2};
    var b5 = {x:1,y:2};
    console.log(a5 === b5);
    console.log(a5.x === a5.x);

    }());
