var user = {
  fname: "ahmed",
  age: 15,
  wife: {
    fname: "ahmed",
    age: 15,
  },
};
console.log(usre.wife.age);

// ------------------js Assignment 1-------------------
// P1:
//Write a program that allow to user enter number then print it
/* 
var strNum = window.prompt("Please Enter a Number");
console.log(strNum);

*/

/* ====================================================================================================================================================================================================================== */

// P2:
//Write a program that take number from user then print yes if that number can divide by 3
// and 4 otherwise print no
/* 
var num = +window.prompt("Please Enter a Number");

if(num%3==0 && num%4==0)
    console.log("Yes");
else
    console.log("No");

 */
/* ====================================================================================================================================================================================================================== */

// P3:
//Write a program that allows the user to insert 2 integers then print the max
/* 
var num1 = +window.prompt("Please Enter The First Number");
var num2 = +window.prompt("Please Enter The Second Number");

if(num1>= num2)
    console.log(num1);
else
    console.log(num2);
 */

/* ====================================================================================================================================================================================================================== */

// P4:
//Write a program that allows the user to insert an integer then print negative if it is
// negative number otherwise print positive.
/* 
var num = window.prompt("Please Enter a Number");


if(num<0)
    console.log("negative");
else if(num>0)
    console.log("positive");
else
    console.log("Zero is not negative or positive");
 */

/* ====================================================================================================================================================================================================================== */

// P5:
//Write a program that take 3 integers from user then print the max element
// and the min element.
/* 
var num1 = +window.prompt("Please Enter The First Number");
var num2 = +window.prompt("Please Enter The Second Number");
var num3 = +window.prompt("Please Enter The Third Number");

if(num1>= num2 &&num1>= num3)
    console.log(num1);
else if(num2>= num1 &&num2>= num3)
    console.log(num2);
else
    console.log(num3);
 */

/* ====================================================================================================================================================================================================================== */

// P6-7:
//Write a program that allows the user to insert integer number then
// check If a number is oven or odd
/* var num = window.prompt("Please Enter a Number");

if (num % 2 == 0)
     console.log("even");
else 
    console.log("odd");
 */

/* ====================================================================================================================================================================================================================== */

// P8:
// Write a program that take character from user then if it is vowel chars (a,e,I,o,u)
// then print vowel otherwise print consonant
/* 
var char = window.prompt("Please Enter a Character");

switch(char){
    case 'a':
    case 'A':
    case 'e':
    case 'E':
    case 'l':
    case 'L':
    case 'o':
    case 'O':
    case 'u':
    case 'U':
        console.log("vowel");
        break;

    default:
        console.log("Consonant");

}
 */

/* ====================================================================================================================================================================================================================== */

// P9:
//Write a program that allows user to insert integer then print all numbers between 1 to that’s number
/*
var num = window.prompt("Please Enter a Number");

for (var i = 1; i <= num; i++) {
    console.log(i); 
} 
*/

/* ====================================================================================================================================================================================================================== */

// P10:
//Write a program that allows userto insert integer then print a multiplication table up to 12.
/* 
var num = window.prompt("Please Enter a Number");

for (var i = 1; i <= 12; i++) {
    console.log(i*num); 
} 
 */

/* ====================================================================================================================================================================================================================== */

// P11:
//Write a program that allows to user to insert number then print all even numbers
// between 1 to this number

/* var num = window.prompt("Please Enter a Number");

for (var i = 1; i <= num; i++) {

    if (i%2==0)
        console.log(i); 
} 
 */
// ------------ another  sol. -----------
/*
 for (var i = 2; i <= num; i+=2) {

        console.log(i); 
} 
 */

/* ====================================================================================================================================================================================================================== */

// P12
//Writeaprogramthattaketwointegersthenprintthepower
/* 
var num = window.prompt("Please Enter a Number");
var power = window.prompt("Please Enter a Power");
var total=num;
for (var i = 0; i <power-1 ; i++) {
    total*=num
} 
console.log(total) 
*/

/* ====================================================================================================================================================================================================================== */

// P12
// Write a program to enter marks of five subjects and calculate total, average and
// percentage.
/* 
var maxGradeForSub =+window.prompt("Please Enter The Max Grade for All Subjects  for ex: 100");
var sub1 = +window.prompt("Please Enter a subject1");
var sub2 = +window.prompt("Please Enter a subject2");
var sub3 = +window.prompt("Please Enter a subject3");
var sub4 = +window.prompt("Please Enter a subject4");
var sub5 = +window.prompt("Please Enter a subject5");


var total =sub1+sub2+sub3+sub4+sub5;
var avarage= total/5;

console.log("Total marks =",total) 
console.log("Average Marks =",avarage) 
console.log("Percentage =",(avarage*100)/maxGradeForSub,"%") 

 */

// ------------------------------ another  sol. ----------------------------
/*
 var numOfSub=5;
var total =0;

var maxGradeForSub =+window.prompt("Please Enter Max The Grade for All Subjects for ex: 100");
for (var i = 1; i <=numOfSub ; i++) {
    total+= +window.prompt("Please Enter a subject"+i);
}
var avarage= total/numOfSub; 

console.log("Total marks =",total) 
console.log("Average Marks =",avarage) 
console.log("Percentage =",(avarage*100)/maxGradeForSub,"%") 

 */

/* ====================================================================================================================================================================================================================== */

// P13
// Write a program to input month number and print number of days in that month.

/* 
var monthNum = +window.prompt("Please Enter Month Number , it's between 1 and 12  ");
switch (monthNum ) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    console.log("31");
    break;
  case 2:
    console.log("28 or 29");
    break;

  default:
	console.log("30")
} 
*/

/* ====================================================================================================================================================================================================================== */

// P14

/* Write a program to input marks of five subjects
Physics, Chemistry, Biology, Mathematics and Computer
, Find percentage and grade */

/* 
var maxGradeForSub = +window.prompt(
  "Please Enter The Max Grade for All Subjects  for ex: 100"
);
var sub1 = +window.prompt("Please Enter a Physics Grade");
var sub2 = +window.prompt("Please Enter a Chemistry Grade");
var sub3 = +window.prompt("Please Enter a Biology Grade");
var sub4 = +window.prompt("Please Enter a Mathematics Grade");
var sub5 = +window.prompt("Please Enter a Computer Grade");

var total = sub1 + sub2 + sub3 + sub4 + sub5;
var avarage = total / 5;
var percentage = (avarage * 100) / maxGradeForSub;

console.log("Total marks =", total);
console.log("Average Marks =", avarage);
console.log("Percentage =", percentage, "%");

if(percentage >= 90)
    console.log("Percentage >= 90%: Grad A");
else if (percentage >= 80) 
    console.log("Percentage >= 80%: Grad B");
else if (percentage >= 70) 
    console.log("Percentage >= 70%: Grad C");
else if (percentage >= 60) 
    console.log("Percentage >= 60%: Grad D");
else if (percentage >= 40) 
    console.log("Percentage >= 40%: Grad E");
else
    console.log("Percentage < 40%: Grad F");

 */

/* ======================================================================================================Using switch case================================================================================================================ */

/* ====================================================================================================================================================================================================================== */

// P15
//Write a program to print total number of days in month
/* 
var monthNum = +window.prompt("Please Enter Month Number , it's between 1 and 12  ");
switch (monthNum ) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    console.log("31");
    break;
  case 2:
    console.log("28 or 29");
    break;

  default:
	console.log("30")
}  */

/* ====================================================================================================================================================================================================================== */

//P16
//Write a program to check whether an alphabet is vowel or consonant
/* 
var char = window.prompt("Please Enter a Character");

switch(char){
    case 'a':
    case 'A':
    case 'e':
    case 'E':
    case 'l':
    case 'L':
    case 'o':
    case 'O':
    case 'u':
    case 'U':
        console.log("vowel");
        break;

    default:
        console.log("Consonant");

}
 */

/* ====================================================================================================================================================================================================================== */

//P17
//Write a program to find maximum between two numbers

/* 
var num1 = +window.prompt("Please Enter The First Number");
var num2 = +window.prompt("Please Enter The Second Number");

switch(true){
    
    case num1 >= num2:
        console.log(num1);
        break;
    case num2 >= num1:
        console.log(num2);
        break;

}
*/

/* ====================================================================================================================================================================================================================== */

//P18
//Write a program to check whether a number is even or odd
/* 
var num = +window.prompt("Please Enter A Number");

switch(true){
    
    case num % 2 == 0:
        console.log("even");
        break;
    case num % 2 != 0:
        console.log("odd");
        break;

}

 */

/* ====================================================================================================================================================================================================================== */

//P19
//Write a program to check whether a number is positive or negative or zero
/* 
var num = +window.prompt("Please Enter A Number");

switch(true){
    
    case num > 0:
        console.log("positive");
        break;
    case num < 0:
        console.log("negative");
        break;
    default:
        console.log("Zero");

}
 */

/* ====================================================================================================================================================================================================================== */

//P20
//Write a program to create Simple Calculator
/* 
var opr = window.prompt("Please Enter Choose one Operator From [ * , / ,+ ,- ]");
var operand1 = +window.prompt("Please Enter First Operand ");
var operand2 = +window.prompt("Please Enter Second Operand ");


switch(opr){
    
    case "+":
        console.log(operand1+operand2);
        break;
    case "-":
        console.log(operand1-operand2);
        break;
    case "/":
        console.log(operand1/operand2);
        break;
    case "*":
        console.log(operand1*operand2);
        break;
    default:
        console.log("Error! operator is not correc");

} 
*/
