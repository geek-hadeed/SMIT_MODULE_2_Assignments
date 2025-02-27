let btn = document.getElementsByClassName('more');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function() {
        let parent = this.parentElement;
        let content = parent.getElementsByClassName('content')[0];

        // Toggle visibility
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
            this.innerText = "Read Less"; // Change button text
        } else {
            content.style.display = "none";
            this.innerText = "Read More"; // Change button text back
        }
    });
}