/* 1.  last name using prompt and merge them in a new variable
titled fullName. Greet the user using his full name.*/

// let firstName = prompt("Enter your first name");
// let lastName = prompt("Enter your last name");

// let fullName = firstName + " " + lastName;

// alert("Hello, " + fullName);


/* 2. Write a program to take a user input about his favorite
mobile phone model. Find and display the length of user
input in your browser */

// let mobileModel = prompt("Enter your favorite mobile phone model");

// alert("My favorite phone is: " + mobileModel + "\nLength of string: " + mobileModel.length);


/* 3. Write a program to find the index of letter “n” in the word
“Pakistani” and display the result in your browser . */

// let word1 = "Pakistani";
// let index = word.indexOf("n");

// alert("The index of 'n' in the word 'Pakistani' is: " + index);


/* 4. Write a program to find the last index of letter “l” in the
word “Hello World” and display the result in your browser.*/

// let word2 = "Hello World";

// let lastIndex = word.lastIndexOf("l");

// alert("The last index of 'l' in the word 'Hello World' is: " + lastIndex);


/* 5. Write a program to find the character at 3rd index in the
word “Pakistani” and display the result in your browser.*/

// let word3 = "Pakistani";

// let thirdChar = word3[2];

// alert("The character at 3rd index in the word 'Pakistani' is: " + thirdChar);


/* 6. Repeat Q1 using string concat() method.*/

// let firstName = prompt("Enter your first name");
// let lastName = prompt("Enter your last name");

// let fullName = firstName.concat(" ", lastName);

// alert("Hello, " + fullName);


/* 7. Write a program to replace the “Hyder” to “Islam” in the
word “Hyderabad” and display the result in your browser.*/


// let city = "Hyderabad";
// let updatedCity = city.replace("Hyder", "Islam");
// alert("The updated city name is: " + updatedCity);


/* 8. Write a program to replace all occurrences of “and” in the
string with “&” and display the result in your browser.*/


// let message = "Ali and Sami are best friends. They play cricket and football together.";

// let updatedMessage = message.replace("and", "&");

// alert("The updated message is: " + updatedMessage);


/* 9. Write a program that converts a string “472” to a number
472. Display the values & types in your browser. */

// let string = "472";
// let number = Number(string);
// // number = parseInt(string);

// alert("The value is: " + string + "\nType is: " + typeof string);
// alert("The value is: " + number + "\nType is: " + typeof number);

/* 10. Write a program that takes user input. Convert and
show the input in capital letters.*/

// let userInput1 = prompt("Enter any word");
// let upperCase = userInput.toUpperCase();

// alert("User input: " + userInput + "\nUpper case: " + upperCase);

/* 11. Write a program that takes user input. Convert and
show the input in title case.*/

// let userInput2 = prompt("Enter any word");
// let word = userInput2[0].toUpperCase();
// let titleCase = word + userInput2.slice(1).toLowerCase();
// alert("User input: " + userInput2 + "\nTitle case: " + titleCase);


/* 12. Write a program that converts the variable num to
string. */

// let num = 35.36;
// // Remove the dot to display “3536” display in your browser.
// let str = num.toString().replace(".", "");
// alert("The number as a string: " + str);


/* 13. Write a program to take user input and store username
in a variable. If the username contains any special symbol
among [@ . , !], prompt the user to enter a valid username.
For character codes of [@ . */

// let username = prompt("Enter your username");

// if(username.includes("@") || username.includes(".") || username.includes(",") || username.includes("!") || username.includes(" ") || username.includes("$") || username.includes("#") || username.includes("%") || username.includes("^") || username.includes("&") || username.includes("*") || username.includes("(") || username.includes(")") || username.includes("-") || username.includes("+") || username.includes("=") || username.includes("|") || username.includes("/") || username.includes("?") || username.includes("<") || username.includes(">") || username.includes(":") || username.includes(";") || username.includes("'") || username.includes('"') || username.includes("`") || username.includes("~") || username.includes("{") || username.includes("}") || username.includes("[") || username.includes("]") || username.includes("\\")) {
//     alert("Please enter a valid username");
//     username = prompt("Enter your username again");
// }

// alert("Username: " + username);


/* 14. Write a program to take user input and store username
in a variable. If the username contains any special symbol
among [@ . , !], prompt the user to enter a valid username.
For character codes of [@ . */

// let fruits = ["apple", "banana", "mango", "orange", "strawberry"];
// let availablity = [3, 5, 6, 7, 8];
// let userInput3 = prompt("Enter any fruit name").toLowerCase();

// for (let i = 0; i < fruits.length; i++) {
//     if (fruits[i] === userInput3) {
//         alert("Available quantity: " + availablity[i]);
//     }
// }



