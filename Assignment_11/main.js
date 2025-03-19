function convertToLowerCase() {
    let text = document.getElementById("textInput").value;
    document.getElementById("outputText").innerText = text.toLowerCase();
}

function convertToUpperCase() {
    let text = document.getElementById("textInput").value;
    document.getElementById("outputText").innerText = text.toUpperCase();
}

function convertToCapitalCase() {
    let text = document.getElementById("textInput").value;
    let words = text.split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    document.getElementById("outputText").innerText = words.join(" ");
}