const Place = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", " Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",];
const Names = ["Arham", "Anas", "Ayaan", "Aarav", "Aariz", "Aarnav", "Aayan", "Aadit", "Aarush", "Aamir", "Aashif", "Aban", "Abhay", "Abhinav", "Abir", "Abishek", "Adarsh", "Aditya", "Aditi", "Adnan", "Aditi", "Aishwarya", "Akash", "Akshay", "Alok", "Aman", "Amaya", "Amira", "Anaya", "Anika", "Anjali", "Ankit", "Anmol", "Ansh", "Anushka", "Arjun", "Arnav", "Aryan", "Ashish", "Ashwin", "Ayaan", "Ayush", "Bhuvan", "Bhumi", "Chaitanya", "Charvi", "Chirag", "Deepak", "Dev", "Dhruv", "Diya", "Ekta", "Esha", "Farhan", "Gaurav", "Gauri", "Gitanjali", "Harsh", "Harshita", "Himanshu", "Isha", "Ishaan", "Jaya", "Jayesh", "Jhanvi", "Kabir", "Karan", "Karishma", "Kavya", "Kiran", "Kriti", "Krish", "Lakshmi", "Lavanya", "Madhav", "Madhuri", "Mahesh", "Manan", "Meera", "Mihir", "Mohit", "Mukesh", "Naina", "Nakul", "Nandini", "Neha", "Neeraj", "Nikhil", "Nisha", "Nitin", "Pallavi", "Parth", "Pooja", "Pranav", "Pratik", "Praveen", "Priya", "Rahul", "Raj", "Rajat", "Rajesh", "Rakesh", "Ravi", "Reema", "Rhea", "Rishi", "Riya", "Rohit", "Saanvi", "Sagar", "Sakshi", "Samir", "Sandeep", "Sanjay", "Sanjana", "Sanket", "Sanjay", "Saurabh", "Shalini", "Shivam", "Shreya", "Shruti", "Siddharth", "Simran", "Sonal", "Sourabh", "Srinivas", "Suman", "Sunil", "Suraj", "Swati", "Tanvi", "Tarun", "Tejas", "Tina", "Tushar", "Uday", "Usha", "Vaibhav", "Vani", "Varun", "Vasudha", "Vikram", "Vinay", "Vishal", "Yash", "Yogesh", "Zara", "Zeenat", "Zoya"];
const Animals = ["Aardvark", "Abyssinian", "African Grey", "Albatross", "Alligator", "Alpaca", "Ant", "Antelope", "Armadillo", "Aye-aye", "Baboon", "Bactrian Camel", "Badger", "Bald Eagle", "Banded Palm Civet", "Basset Hound", "Bengal Tiger", "Bison", "Black Bear", "Blue Jay", "Bobcat", "Bongo", "Bongo Cat", "Bottlenose Dolphin", "Boxer", "Brown Bear", "Buffalo", "Bullfrog", "Burmese", "Cheetah", "Chinchilla", "Chipmunk", "Clownfish", "Coyote", "Crab", "Crocodile", "Dachshund", "Dingo", "Dolphin", "Donkey", "Dove", "Dragonfly", "Dromedary Camel", "Ducks", "Eagle", "Echidna", "Elephant", "Elk", "Emu", "Ferret", "Finch", "Flamingo", "Fox", "Frog", "Gazelle", "Giraffe", "Goat", "Goldfish", "Goose", "Gorilla", "Guinea Pig", "Hedgehog", "Hippopotamus", "Horse", "Humming bird", "Iguana", "Impala", "Jackal", "Jaguar", "Kangaroo", "Koala", "Kookaburra", "Lemur", "Leopard", "Lion", "Llama", "Lynx", "Macaw", "Manatee", "Marmoset", "Meerkat", "Mink", "Moose", "Narwhal", "Newt", "Ocelot", "Octopus", "Okapi", "Opossum", "Orangutan", "Otter", "Ostrich", "Panda", "Parrot", "Peacock", "Penguin", "Pheasant", "Platypus", "Porcupine", "Puma", "Quail", "Rabbit", "Raccoon", "Rat", "Reindeer", "Rhino", "Salamander", "Seal", "Shark", "Sheep", "Skunk", "Sloth", "Snail", "Snake", "Sparrow", "Spider", "Squirrel", "Starfish", "Stingray", "Tiger", "Toad", "Tortoise", "Toucan", "Turtle", "Walrus", "Warthog", "Weasel", "Whale", "Wolf", "Wombat", "Zebra", "Zebu", "Zorse", "Zorilla"];
const Things = ["Airplane", "Alarm Clock", "Almond", "Anchor", "Apple", "Apron", "Backpack", "Balloon", "Banana", "Bicycle", "Binder", "Book", "Bottle", "Box", "Bracelet", "Broom", "Candle", "Camera", "Carpet", "Chair", "Chalk", "Clock", "Clothes", "Computer", "Cup", "Curtain", "Desk", "Diary", "Door", "Drum", "Earphones", "Eraser", "Fan", "Fork", "Fridge", "Glasses", "Globe", "Guitar", "Hammer", "Hat", "Headphones", "Ice Cream", "Iron", "Jar", "Jacket", "Keyboard", "Kettle", "Knife", "Lamp", "Laptop", "Lemon", "Lightbulb", "Map", "Mirror", "Mug", "Notebook", "Oven", "Paintbrush", "Paper", "Pen", "Pencil", "Phone", "Picture", "Plate", "Pillow", "Plant", "Printer", "Radio", "Refrigerator", "Ruler", "Scissors", "Screwdriver", "Shampoo", "Shovel", "Soap", "Spoon", "Stapler", "Table", "Teddy Bear", "Television", "Toaster", "Toothbrush", "Towel", "Umbrella", "Vase", "Wallet", "Watch", "Wrench", "Yarn", "Zipper", "Zucchini", "Zebra Toy", "Zipper Bag", "Zodiac Sign", "Zucchini Noodles", "Zumba Mat", "Zipper Pull", "Zodiac Calendar", "Zebra Print", "Zesty Lemon"];
let names = []
let places = []
let animals = []
let things = []
let named = document.getElementById("name")
let place = document.getElementById("place")
let animal = document.getElementById("animal")
let thing = document.getElementById("thing")
let inputField = document.getElementById("inputField");

function updateResults(key) {
    names = []
    places = []
    animals = []
    things = []
    for (let i = 0; i < Place.length; i++) {
        if (Place[i].charAt(0).toUpperCase() === key) {
            places.push(Place[i])
        }
    }
    for (let i = 0; i < Names.length; i++) {
        if (Names[i].charAt(0).toUpperCase() === key) {
            names.push(Names[i])
        }
    }
    for (let i = 0; i < Animals.length; i++) {
        if (Animals[i].charAt(0).toUpperCase() === key) {
            animals.push(Animals[i])
        }
    }
    for (let i = 0; i < Things.length; i++) {
        if (Things[i].charAt(0).toUpperCase() === key) {
            things.push(Things[i])
        }
    }
    let randomName = names[Math.floor(Math.random() * names.length)]
    let randomPlace = places[Math.floor(Math.random() * places.length)]
    let randomAnimal = animals[Math.floor(Math.random() * animals.length)]
    let randomThing = things[Math.floor(Math.random() * things.length)]

    named.innerHTML = randomName
    place.innerHTML = randomPlace
    animal.innerHTML = randomAnimal
    thing.innerHTML = randomThing
}



addEventListener('keydown', (event) => {
    let key = event.key.toUpperCase();
    updateResults(key);
});

inputField.addEventListener('input', (event) => {
    let key = event.target.value.charAt(0).toUpperCase();
    if (key) {
        updateResults(key);
    }
});