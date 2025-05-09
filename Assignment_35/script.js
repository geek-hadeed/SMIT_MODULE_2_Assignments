// Sample data
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1974 },
    { name: 'Lux', year: 2015 }
  ];
  
  const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good idea!', id: 823423 },
    { text: 'You are the best!', id: 2039842 },
    { text: 'Reminds me of new food even!', id: 123523 },
    { text: 'Nice Nice Nice.', id: 543223 }
  ];
  
  // DOM elements
  const peopleCode = document.getElementById('people-code');
  const commentsCode = document.getElementById('comments-code');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const dataDisplays = document.querySelectorAll('.data-display');
  const runButtons = document.querySelectorAll('.run-btn');
  const codeInput = document.getElementById('code-input');
  const runCustomBtn = document.getElementById('run-custom');
  const clearCustomBtn = document.getElementById('clear-custom');
  const customResult = document.getElementById('custom-result');
  
  // Display sample data
  peopleCode.textContent = JSON.stringify(people, null, 2);
  commentsCode.textContent = JSON.stringify(comments, null, 2);
  
  // Tab functionality
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and displays
      tabButtons.forEach(btn => btn.classList.remove('active'));
      dataDisplays.forEach(display => display.classList.remove('active'));
      
      // Add active class to clicked button and corresponding display
      button.classList.add('active');
      const tabId = button.dataset.tab;
      document.getElementById(`${tabId}-data`).classList.add('active');
    });
  });
  
  // Helper function to display results
  function displayResult(resultId, data) {
    const resultElement = document.getElementById(resultId);
    resultElement.textContent = JSON.stringify(data, null, 2);
    resultElement.classList.add('active');
    
    // Highlight the result
    resultElement.style.backgroundColor = 'var(--highlight-color)';
    setTimeout(() => {
      resultElement.style.backgroundColor = 'var(--code-bg)';
    }, 300);
  }
  
  // Run example buttons
  runButtons.forEach(button => {
    button.addEventListener('click', () => {
      const method = button.dataset.method;
      const currentYear = new Date().getFullYear();
      
      switch(method) {
        case 'some':
          const isAdult = people.some(person => currentYear - person.year >= 18);
          displayResult('some-result', isAdult);
          break;
          
        case 'filter-adults':
          const allAdults = people.filter(person => currentYear - person.year >= 18);
          displayResult('filter-adults-result', allAdults);
          break;
          
        case 'filter-comment':
          const specificComment = comments.filter(comment => comment.id === 523423);
          displayResult('filter-comment-result', specificComment);
          break;
          
        case 'find':
          const wes = people.find(person => person.name === 'Wes');
          displayResult('find-result', wes);
          break;
          
        case 'map':
          const names = people.map(person => person.name);
          displayResult('map-result', names);
          break;
          
        case 'sort':
          const sortedByAge = [...people].sort((a, b) => a.year - b.year);
          displayResult('sort-result', sortedByAge);
          break;
          
        case 'reduce':
          const yearSum = people.reduce((total, person) => total + person.year, 0);
          displayResult('reduce-result', yearSum);
          break;
      }
    });
  });
  
  // Custom code execution
  runCustomBtn.addEventListener('click', () => {
    const code = codeInput.value.trim();
    
    if (!code) {
      customResult.textContent = 'Please enter some code to run';
      return;
    }
    
    try {
      // Create a safe evaluation context with access to our arrays
      const result = new Function('people', 'comments', `
        try {
          return ${code};
        } catch (error) {
          return { error: error.message };
        }
      `)(people, comments);
      
      customResult.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
      customResult.textContent = `Error: ${error.message}`;
    }
  });
  
  // Clear custom code
  clearCustomBtn.addEventListener('click', () => {
    codeInput.value = '';
    customResult.textContent = '';
  });
  
  // Add animation to method cards
  const methodCards = document.querySelectorAll('.method-card');
  methodCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeIn 0.5s ease forwards';
  });
  
  // Initialize with some example code in the playground
  codeInput.value = 'people.filter(person => person.name.includes("e"))';