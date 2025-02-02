let para = prompt("Enter a paragraph").trim();

        function convertToLowerCase(text) {
            console.log(text.toLowerCase());
        }

        function convertToUpperCase(text) {
            console.log(text.toUpperCase());
        }

        function convertToCapitalCase(text) {

            let words = text.split(/\s+/);
            let newWords = [];
            for (let i = 0; i < words.length; i++) {
                let word = words[i];
                newWords.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
            }
            console.log(newWords.join(" "));
        }
