// Closures

function retirement(retirementAge){
  var a = " Years left untill retirement.";
  return function(yearOfBirth){
    var age = 2018 - yearOfBirth;
    console.log((retirementAge - age) + a);
  }
}

var retirementUS = retirement(66);
retirementUS(1982);

var retirementGermany = retirement(65);
retirementGermany(1982);

var retirementOaxaca = retirement(70);
retirementOaxaca(1982);