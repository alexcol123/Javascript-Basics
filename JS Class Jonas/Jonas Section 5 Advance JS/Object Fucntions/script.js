// Function constructor 

// var john = {
//   name: "John",
//   yearOfBirth: 1990,
//   job: 'Teacher'
// };

var Person  = function (name, yearOfBirth, job){
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;

}


Person.prototype.calculateAge = function(){
  console.log(2016 - this.yearOfBirth);
}


var john = new Person ( 'John', 1990, 'teacher');

var jane = new Person ( 'jane', 1969, 'stripper');

var mark = new Person ( 'Mark', 1949, 'Retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();