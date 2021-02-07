let x = 10;

function aa(){
    let x = 100;

    console.log(this.x); //this 가리킬게 없으면 글로벌을 가르킴 -> 10 출력
}

//////////////

function aa(){
    let x = 100;
    // console.log(this.x); 
}
const a = new aa(); //100

///////////////////
function Person(a){
    this.a = a;
    console.log(this);
}
Person.prototype.add=function(){

}

const a = new aa(10);
a.add();

class Person{
    constructor(){

    }
    add(){
        
    }
}