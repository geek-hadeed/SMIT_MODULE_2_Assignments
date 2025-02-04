let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let num = "0123456789";
let mix = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:'<>?";;
let passLength = 0;

let password = "";

function generate() {
    password = "";
    document.getElementById("pass").innerHTML = "";
    passLength = +prompt("Enter the length of the password");
    for (let i = 0; i < passLength; i++) {
        password += char.charAt(Math.floor(Math.random() * char.length));
    }

    document.getElementById("length").innerHTML = passLength;
    document.getElementById("pass").innerHTML = password;
}

function generate1() {
    password = "";
    document.getElementById("pass1").innerHTML = "";

    passLength = +prompt("Enter the length of the password");
    for (let i = 0; i < passLength; i++) {
        password += num.charAt(Math.floor(Math.random() * num.length));
    }
    document.getElementById("length1").innerHTML = passLength;
    document.getElementById("pass1").innerHTML = password;
}

function generate2() {
    password = "";
    document.getElementById("pass2").innerHTML = "";
    passLength = +prompt("Enter the length of the password");
    for (let i = 0; i < passLength; i++) {

        password += mix.charAt(Math.floor(Math.random() * mix.length));
    }
    document.getElementById("length2").innerHTML = passLength;
    document.getElementById("pass2").innerHTML = password;
}

