let legal1 = "letters", legal2 = "numbers", legal3 = "$", legal4 = "_";
let legalEx1 = "$my_1stVariable", legalEx2 = "$name", legalEx3 = "_name", legalEx4 = "name";
let caseType = "sensitive", restricted = "JS keywords";

document.write(`Variables Can Only Contain ${legal1},${legal2},${legal3} and ${legal4}. For example ${legalEx1} <br>`)
document.write(`Variables must begin with a ${legal1}, ${legal3} or ${legal4}. For example ${legalEx2}, ${legalEx3} and ${legalEx4} <br>`)
document.write(`Variable names are case ${caseType}. <br>`)
document.write(`Variable names should not be ${restricted}.`)