function calculateAge(dobYear, dobMonth, dobDay) {
    let currentDate = new Date();
    let dob = new Date(dobYear, dobMonth - 1, dobDay);

    document.getElementById("dob").innerHTML = dob.toDateString();
    // complete age 
    let age = currentDate.getFullYear() - dob.getFullYear();
    let months = currentDate.getMonth() - dob.getMonth();
    let days = currentDate.getDate() - dob.getDate();

    if (months < 0 || (months === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
        months += 12;
    }
    if (days < 0) {
        let previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }
    // console.log(age + " years" + months + " months" + days + " days");

    document.getElementById("age").innerHTML = age + " years " + months + " months " + days + " days";


    // age in months

    let ageInMonths = age * 12;
    // console.log(ageInMonths);
    document.getElementById("months").innerHTML = ageInMonths;


    // age in days

    let ageInDays = ageInMonths * 30.44;
    // console.log(ageInDays);
    document.getElementById("days").innerHTML = ageInDays;

    // age in hours

    let ageInHours = age * 365 * 24;
    // console.log(ageInHours);
    document.getElementById("hours").innerHTML = ageInHours;


    // age in minutes
    let ageInMinutes = ageInHours * 60;
    // console.log(ageInMinutes);
    document.getElementById("minutes").innerHTML = ageInMinutes;

    // age in seconds

    let ageInSeconds = ageInMinutes * 60;
    console.log(ageInSeconds);
    document.getElementById("seconds").innerHTML = ageInSeconds;





}