// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial welcome message in console
    console.log('%c Welcome to Chrome DevTools Console Methods Demo! ', 
                'background: #2c3e50; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('Click on the "Try It" buttons to see different console methods in action.');
    
    // Get all method cards
    const methodCards = document.querySelectorAll('.method-card');
    
    // Add click event listeners to all buttons
    methodCards.forEach(card => {
        const button = card.querySelector('button');
        const methodType = card.getAttribute('data-method');
        
        button.addEventListener('click', () => {
            // Clear console before each demo for clarity
            console.clear();
            console.log('%c Demonstrating: ' + card.querySelector('h2').textContent, 
                       'background: #3498db; color: white; padding: 5px; border-radius: 3px;');
            
            // Execute the appropriate console method based on the card type
            executeConsoleMethod(methodType);
        });
    });
});

// Function to execute different console methods
function executeConsoleMethod(methodType) {
    switch(methodType) {
        case 'styling':
            console.log('%c Hello World', 'color: blue; font-size: 20px; background: #f0f0f0; padding: 5px; border-radius: 5px;');
            console.log('%c Important Message', 'color: red; font-weight: bold; font-size: 18px;');
            console.log('%c Success!', 'color: green; font-size: 16px; font-style: italic;');
            break;
            
        case 'types':
            console.log('This is a standard log message');
            console.warn('This is a warning message');
            console.error('This is an error message');
            console.info('This is an info message');
            break;
            
        case 'assert':
            console.assert(1 === 1, 'This assertion passes, so you won\'t see this message');
            console.assert(1 === 2, 'Assertion failed: 1 is not equal to 2');
            console.assert([] === [], 'Assertion failed: Empty arrays are not strictly equal');
            break;
            
        case 'dir':
            const el = document.querySelector('h1');
            console.log('Regular console.log of an element:');
            console.log(el);
            console.log('console.dir of the same element:');
            console.dir(el);
            break;
            
        case 'group':
            console.group('User Information');
            console.log('Name: John Doe');
            console.log('Age: 30');
            console.log('Occupation: Web Developer');
                console.group('Contact Details');
                console.log('Email: john@example.com');
                console.log('Phone: (123) 456-7890');
                console.groupEnd();
            console.log('Location: New York');
            console.groupEnd();
            break;
            
        case 'time':
            console.time('Empty loop timing');
            for (let i = 0; i < 1000000; i++) {
                // Empty loop to measure performance
            }
            console.timeEnd('Empty loop timing');
            
            console.time('Array creation timing');
            const largeArray = Array(1000000).fill(0).map((_, i) => i);
            console.timeEnd('Array creation timing');
            break;
            
        case 'count':
            function greet() {
                console.count('Greet function called');
                return 'Hello!';
            }
            
            greet();
            greet();
            greet();
            console.log('Calling greet() 3 more times...');
            greet();
            greet();
            greet();
            console.countReset('Greet function called');
            console.log('Counter reset. Calling once more:');
            greet();
            break;
    }
}

// Add a special console message when the page is about to be closed
window.addEventListener('beforeunload', () => {
    console.log('%c Thanks for exploring Chrome DevTools Console Methods! ', 
               'background: #2c3e50; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
});