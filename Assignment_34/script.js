// List of Pakistani cities with population data
const cities = [
    { city: 'Karachi', province: 'Sindh', population: 16093786, region: 'South' },
    { city: 'Lahore', province: 'Punjab', population: 11126285, region: 'East' },
    { city: 'Faisalabad', province: 'Punjab', population: 3204726, region: 'East' },
    { city: 'Rawalpindi', province: 'Punjab', population: 2098231, region: 'North' },
    { city: 'Gujranwala', province: 'Punjab', population: 2027001, region: 'East' },
    { city: 'Peshawar', province: 'Khyber Pakhtunkhwa', population: 1970042, region: 'Northwest' },
    { city: 'Multan', province: 'Punjab', population: 1871843, region: 'South Punjab' },
    { city: 'Hyderabad', province: 'Sindh', population: 1732693, region: 'South' },
    { city: 'Islamabad', province: 'Federal Capital', population: 1009832, region: 'North' },
    { city: 'Quetta', province: 'Balochistan', population: 1001205, region: 'West' },
    { city: 'Bahawalpur', province: 'Punjab', population: 762111, region: 'South Punjab' },
    { city: 'Sargodha', province: 'Punjab', population: 659862, region: 'East' },
    { city: 'Sialkot', province: 'Punjab', population: 655852, region: 'East' },
    { city: 'Sukkur', province: 'Sindh', population: 499900, region: 'South' },
    { city: 'Larkana', province: 'Sindh', population: 490508, region: 'South' },
    { city: 'Sheikhupura', province: 'Punjab', population: 473129, region: 'East' },
    { city: 'Rahim Yar Khan', province: 'Punjab', population: 420419, region: 'South Punjab' },
    { city: 'Jhang', province: 'Punjab', population: 414131, region: 'East' },
    { city: 'Dera Ghazi Khan', province: 'Punjab', population: 399064, region: 'South Punjab' },
    { city: 'Gujrat', province: 'Punjab', population: 390533, region: 'East' },
    { city: 'Sahiwal', province: 'Punjab', population: 389603, region: 'East' },
    { city: 'Mardan', province: 'Khyber Pakhtunkhwa', population: 358604, region: 'Northwest' },
    { city: 'Kasur', province: 'Punjab', population: 358409, region: 'East' },
    { city: 'Mingora', province: 'Khyber Pakhtunkhwa', population: 331091, region: 'Northwest' },
    { city: 'Nawabshah', province: 'Sindh', population: 229504, region: 'South' }
  ];
  
  // DOM elements
  const searchInput = document.querySelector('.search');
  const suggestionsContainer = document.querySelector('.suggestions');
  const noResultsElement = document.querySelector('.no-results');
  const clearButton = document.querySelector('.search-clear');
  
  // Function to format population with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  // Function to find matching cities
  function findMatches(wordToMatch, cities) {
    if (!wordToMatch) return [];
    
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.province.match(regex) || place.region.match(regex);
    });
  }
  
  // Function to highlight matching text
  function highlightMatch(text, wordToMatch) {
    if (!wordToMatch) return text;
    
    const regex = new RegExp(`(${wordToMatch})`, 'gi');
    return text.replace(regex, '<span class="hl">$1</span>');
  }
  
  // Function to display the matched cities
  function displayMatches() {
    const searchTerm = this.value.trim();
    
    // Show/hide clear button based on input
    clearButton.style.display = searchTerm ? 'block' : 'none';
    
    // If search is empty, clear results
    if (!searchTerm) {
      suggestionsContainer.innerHTML = '';
      noResultsElement.style.display = 'none';
      return;
    }
    
    const matchArray = findMatches(searchTerm, cities);
    
    // Show no results message if needed
    if (matchArray.length === 0) {
      suggestionsContainer.innerHTML = '';
      noResultsElement.style.display = 'block';
      return;
    }
    
    noResultsElement.style.display = 'none';
    
    const html = matchArray
      .map(place => {
        const cityName = highlightMatch(place.city, searchTerm);
        const provinceName = highlightMatch(place.province, searchTerm);
        const regionName = highlightMatch(place.region, searchTerm);
        
        return `
          <div class="city-card">
            <div class="city-region">${regionName}</div>
            <div class="city-name">${cityName}</div>
            <div class="city-province">${provinceName}</div>
            <div class="population-label">Population</div>
            <div class="population">${numberWithCommas(place.population)}</div>
          </div>
        `;
      })
      .join('');
    
    suggestionsContainer.innerHTML = html;
  }
  
  // Function to clear the search
  function clearSearch() {
    searchInput.value = '';
    suggestionsContainer.innerHTML = '';
    noResultsElement.style.display = 'none';
    clearButton.style.display = 'none';
    searchInput.focus();
  }
  
  // Event listeners
  searchInput.addEventListener('input', displayMatches);
  clearButton.addEventListener('click', clearSearch);
  
  // Initial focus on the search input for better UX
  window.addEventListener('load', () => {
    searchInput.focus();
  });