function findDay() {
    const dayOfWeek = +document.getElementById('day').value;
    const date = +document.getElementById('date').value
    let month = +document.getElementById('month').value;
    let startYear = +document.getElementById('startYear').value;
    let endYear = +document.getElementById('endYear').value;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let results = [];
    for (let year = startYear; year <= endYear; year++) {
        let testDate = new Date(year, month, date); // Using the selected month and date
        if (testDate.getDay() === dayOfWeek && testDate.getMonth() === month && testDate.getDate() === date) {
            results.push(`<div class="result-item"><b>${year}</b>: ${testDate.getDate()} ${days[dayOfWeek]}</div>`);
        }
    }

    document.getElementById('result').innerHTML = results.join('<br>');
    // document.getElementById('result').innerHTML = "hello";
}