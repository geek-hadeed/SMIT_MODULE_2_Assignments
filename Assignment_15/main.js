function checkLeapYear() {
    let startYear = document.getElementById('startYear').value;
    let endYear = document.getElementById('endYear').value;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let result = []
    for (let i = startYear; i <= endYear; i++) {
        let date = new Date(i, 1, 29)
        if (date.getMonth() === 1 && date.getDate() === 29) {
            result.push(date.getFullYear() + ' Was A Leap Year. ');
        }
    }
    document.getElementById('result').innerHTML = `<p>${result.join('<br>')}</p>`;
}


