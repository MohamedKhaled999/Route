//
import {go} from './test-2.js'

let human = {
  isLive: true,
  eat: function () {
    console.log("Eat");
  },
};

let user = {
  fullName:'ahmed',
  salary:3000,
};


Object.setPrototypeOf(user,human)
console.log(user)

class Human {
  
  constructor(isLive, loc) {
    this.isLive = isLive;
    this.loc = loc;
    

  }
}

class User extends Human{
  
  constructor(fullName, age, salary, isLive,loc) {
    super(isLive,loc)
    this.fullName = fullName;
    this.age = age;
    this.salary = salary;
    this.x = 55;
    let hh=555;

  }
  
  welcome(x,y,z){
    console.log(x,y,z)

  }
  welcome(){
    console.log("kldnkl")

  }
}

let x= new User('mohamed khaled',24,25000,true,"Giza")
// let y=  User('mohamed khaled',24,25000)
console.log(x)
console.log(x.welcome(5,5,6))


document.addEventListener('keydown',()=>{
  console.log("jknk")
  go();
})
document.addEventListener('click',()=>{
  console.log("jknk")
  go("blue");
})


