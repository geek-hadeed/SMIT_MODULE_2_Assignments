const inventors = [
    { first: 'Abdul', last: 'Salam', year: 1879, passed: 1955 },
    { first: 'Abdus', last: 'Sattar', year: 1643, passed: 1727 },
    { first: 'Salimuzzaman', last: 'Siddiqui', year: 1564, passed: 1642 },
    { first: 'Pervez', last: 'Bhutto', year: 1867, passed: 1934 },
    { first: 'Atta-ur', last: 'Rahman', year: 1571, passed: 1630 },
    { first: 'Naweed', last: 'Syed', year: 1473, passed: 1543 },
    { first: 'Nergis', last: 'Mavalvala', year: 1858, passed: 1947 }
  ];
  
  const people = [
    'Khan, Imran', 'Bhutto, Benazir', 'Malik, Shoaib', 'Afridi, Shahid', 'Mirza, Sania',
    'Zardari, Bilawal', 'Sharif, Nawaz', 'Hasan, Mehwish', 'Butt, Yasir', 'Rehman, Atif'
  ];
  
  // Filter 1500s
  const bornIn1500s = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
  console.log('Inventors born in the 1500s:');
  console.table(bornIn1500s);
  
  // Full names
  const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
  console.log('Full names of inventors:');
  console.log(fullNames);
  
  // Sort birth
  const sortedByBirth = inventors.sort((a, b) => a.year - b.year);
  console.log('Inventors sorted by birth year:');
  console.table(sortedByBirth);
  
  // Total years
  const totalYears = inventors.reduce((total, inventor) => total + (inventor.passed - inventor.year), 0);
  console.log('Total years lived by all inventors:', totalYears);
  
  // Sort lived
  const sortedByLifespan = inventors.sort((a, b) => {
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;
    return nextGuy - lastGuy;
  });
  console.log('Inventors sorted by lifespan (longest first):');
  console.table(sortedByLifespan);
  
  // Sort names
  const sortedPeople = people.sort((a, b) => {
    const [aLast] = a.split(', ');
    const [bLast] = b.split(', ');
    return aLast.localeCompare(bLast);
  });
  console.log('People sorted alphabetically by last name:');
  console.log(sortedPeople);
  
  // Count items
  const data = ['rickshaw', 'rickshaw', 'truck', 'motorbike', 'walk', 'rickshaw', 'van', 'motorbike', 'walk', 'rickshaw', 'van'];
  const transportCount = data.reduce((obj, item) => {
    obj[item] = obj[item] ? obj[item] + 1 : 1;
    return obj;
  }, {});
  console.log('Transportation count:');
  console.table(transportCount);