
var fruits = ["Apple", "Orange", "Pear","Pineapple", "Lemon"];
/* ----------sort---------------*/
console.log("befor sort",fruits)
fruits.sort();

console.log("after sort",fruits)

/* -----------reverse------------*/
console.log("befor reverse",fruits)
fruits.reverse();

console.log("after reverse",fruits)





/* -----------push& unshift------------*/
//  push& unshift return the new length of arr

console.log("befor push& unshift",fruits)

fruits.push('mango','banana');//add to end of arr

fruits.unshift('greps','yousify');//add to start of arr
console.log("after  push& unshift",fruits)



/* -----------pop&shift------------*/
//  pop& shift return the romoved item of arr

console.log("befor pop& shift",fruits)

fruits.pop();//remove from end of arr

fruits.shift('greps','yousify');//remove from start of arr
console.log("after  pop& shift",fruits)


/* -----------include & join& & toString------------*/


console.log("befor include & join& & toString",fruits)


console.log( "fruits.includes('Pear')",fruits.includes('Pear'));
console.log("fruits.includes('Pear',3)",fruits.includes('Pear',3));

console.log("fruits.join('%%')",fruits.join('%%'))
console.log( "fruits.toString()",fruits.toString())



/* -----------at------------*/
// work neg index  from the end of arr 
console.log( "at[-1]", fruits.at(-1))



/* -----------splice------------*/

console.log("befor splice ",fruits)

console.log("adding or inserting ",fruits.splice(5,0, "green Lemon", "Kiwi" ))
console.log("after adding or inserting ",fruits)


console.log("updating ",fruits.splice(5,2, "new green Lemon", "new Kiwi" ))
console.log("after updating ",fruits)


console.log("removing ",fruits.splice(5,2 ))
console.log("after removing ",fruits)



console.log("removing from 5 ",fruits.splice(5 ))
console.log("after removing ",fruits)



/* -----------indexOF and lastIndexOf------------*/
// if not found will return -1

console.log("indexOf Pear",fruits.indexOf('Pear'))
console.log("indexOf Pear from 3",fruits.indexOf('Pear',3))

console.log("lastIndexOf Pear",fruits.lastIndexOf('Pear'))
console.log("lastIndexOf Pear from 3",fruits.lastIndexOf('Pear',3))


/* ----------- slices ------------*/
// The slice() method slices out a piece of an array into a new array:

console.log("fruits.slice(2,5)",fruits.slice(2,5))
console.log("fruits.slice(2)",fruits.slice(2))
console.log("fruits.slice()",fruits.slice())


/* -------------------concat--------------*/
//return arr

console.log('fruits.concat(fruits,["green Lemon", "Kiwi"]',fruits.concat(fruits,["green Lemon", "Kiwi"]))
console.log('fruits.concat(fruits,"green Lemon", "Kiwi"',fruits.concat(fruits,"green Lemon", "Kiwi"))

































var quotes = [
  {
    quote:
      "“It is better to be hated for what you are than to be loved for what you are not.”",
    author: "― Andre Gide",
  },
  {
    quote:
      "“You cannot control what happens to you in life, but you can always control what you will feel and do about what happens to you.”",
    author: "― Viktor E. Frankl",
  },
  {
    quote:
      "“To paraphrase several sages: Nobody can think and hit someone at the same time.”",
    author: "― Susan Sontag",
  },
  {
    quote:
      "“If someone puts their hands on you make sure they never put their hands on anybody else again.”",
    author: "― Malcom X,",
  },
  {
    quote: "“The most wasted of all days is one without laughter.”",
    author: "― Nicolas Chamfort",
  },
  {
    quote: "“A friend is someone who knows all about you and still loves you.”",
    author: "― Elbert Hubbard",
  },
  {
    quote:
      "“!الغرب ليسوا عباقرة ونحن لسنا أغبياء؛ هم فقط يدعمون الفاشل حتى ينجح، ونحن نحارب الناجح حتى يفشل”",
    author: "― Ahmed Zewail",
  },
  {
    quote: "“We accept the love we think we deserve.”",
    author: "― Stephen Chbosky,",
  },
];

var last = -1;

function getRandomQuote() {
  var rand = Math.floor(Math.random() * quotes.length);
  if (rand == last) {
    rand = (rand + 1) % quotes.length;
  }
  document.getElementById("quote").innerHTML = quotes[rand].quote;
  document.getElementById("quote-author").innerHTML = quotes[rand].author;
  document.getElementById("home").style.display = "block";

  last = rand;
  // console.log(rand)
}

// --------------------------------------------------------------


var count = 0;
var hamda= setInterval(function(){
  count++;
  document.body.innerHTML =count
  if(count ==100){
    clearInterval(hamda)
  }
},100)