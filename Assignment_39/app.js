document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchBtn = document.getElementById('search-btn');
    const usernameInput = document.getElementById('username');
    const errorMessage = document.getElementById('error-message');
    const profileContainer = document.getElementById('profile-container');
    const profileContent = document.getElementById('profile-content');
    const loader = document.getElementById('loader');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Theme toggle functionality
    themeIcon.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', searchUser);
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchUser();
        }
    });

    // Initial focus on input
    usernameInput.focus();

    // Search function
    function searchUser() {
        const username = usernameInput.value.trim();
        
        // Validate input
        if (!username) {
            showError('Please enter a GitHub username');
            return;
        }
        
        // Clear previous error
        clearError();
        
        // Show loader
        showLoader();
        
        // Fetch user data
        fetchUserData(username);
    }

    // Fetch user data from GitHub API
    async function fetchUserData(username) {
        try {
            // Fetch user profile
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            
            if (!userResponse.ok) {
                if (userResponse.status === 404) {
                    throw new Error('User not found');
                } else {
                    throw new Error(`GitHub API Error: ${userResponse.status}`);
                }
            }
            
            const userData = await userResponse.json();
            
            // Fetch user repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            const reposData = await reposResponse.json();
            
            // Display user profile
            displayUserProfile(userData, reposData);
            
        } catch (error) {
            hideLoader();
            showError(error.message);
            profileContent.classList.add('hidden');
        }
    }

    // Display user profile
    function displayUserProfile(user, repos) {
        // Format date
        const joinedDate = new Date(user.created_at);
        const formattedDate = joinedDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        // Create profile HTML
        profileContent.innerHTML = `
            <div class="profile-header">
                <img src="${user.avatar_url}" alt="${user.login}'s avatar" class="avatar">
                <div class="profile-info">
                    <div class="profile-name">
                        <h2>${user.name || user.login}</h2>
                        ${user.name ? `<span class="username">@${user.login}</span>` : ''}
                    </div>
                    <div class="joined-date">Joined ${formattedDate}</div>
                    <p class="bio">${user.bio || 'This profile has no bio'}</p>
                </div>
            </div>
            
            <div class="stats-container">
                <div class="stat-item">
                    <div class="stat-label">Repos</div>
                    <div class="stat-value">${user.public_repos}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Followers</div>
                    <div class="stat-value">${user.followers}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Following</div>
                    <div class="stat-value">${user.following}</div>
                </div>
            </div>
            
            <div class="details-container">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="detail-text">${user.location || '<span class="not-available">Not available</span>'}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-link"></i>
                    <span class="detail-text">
                        ${user.blog 
                            ? `<a href="${user.blog.startsWith('http') ? user.blog : 'https://' + user.blog}" target="_blank">${user.blog}</a>` 
                            : '<span class="not-available">Not available</span>'}
                    </span>
                </div>
                <div class="detail-item">
                    <i class="fab fa-twitter"></i>
                    <span class="detail-text">
                        ${user.twitter_username 
                            ? `<a href="https://twitter.com/${user.twitter_username}" target="_blank">@${user.twitter_username}</a>` 
                            : '<span class="not-available">Not available</span>'}
                    </span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-building"></i>
                    <span class="detail-text">${user.company || '<span class="not-available">Not available</span>'}</span>
                </div>
            </div>
            
            <div class="repos-container">
                <h3 class="repos-header">Latest Repositories</h3>
                <div class="repos-grid">
                    ${repos.length > 0 
                        ? repos.map(repo => createRepoCard(repo)).join('') 
                        : '<p class="not-available">No repositories available</p>'}
                </div>
            </div>
        `;
        
        // Hide loader and show profile
        hideLoader();
        profileContent.classList.remove('hidden');
    }

    // Create repository card
    function createRepoCard(repo) {
        return `
            <div class="repo-card">
                <a href="${repo.html_url}" target="_blank" style="text-decoration: none;">
                    <h4 class="repo-name">${repo.name}</h4>
                </a>
                <p class="repo-description">${repo.description || 'No description available'}</p>
                <div class="repo-stats">
                    <div class="repo-stat">
                        <i class="fas fa-star"></i>
                        <span>${repo.stargazers_count}</span>
                    </div>
                    <div class="repo-stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks_count}</span>
                    </div>
                    ${repo.language ? `
                        <div class="repo-stat">
                            <i class="fas fa-circle" style="color: ${getLanguageColor(repo.language)}"></i>
                            <span>${repo.language}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Get color for programming language
    function getLanguageColor(language) {
        const colors = {
            JavaScript: '#f1e05a',
            TypeScript: '#2b7489',
            HTML: '#e34c26',
            CSS: '#563d7c',
            Python: '#3572A5',
            Java: '#b07219',
            Ruby: '#701516',
            PHP: '#4F5D95',
            Go: '#00ADD8',
            Swift: '#ffac45',
            Kotlin: '#F18E33',
            Rust: '#dea584',
            C: '#555555',
            'C++': '#f34b7d',
            'C#': '#178600'
        };
        
        return colors[language] || '#8257e5';
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = '1';
    }

    // Clear error message
    function clearError() {
        errorMessage.textContent = '';
        errorMessage.style.opacity = '0';
    }

    // Show loader
    function showLoader() {
        loader.classList.remove('hidden');
        profileContent.classList.add('hidden');
    }

    // Hide loader
    function hideLoader() {
        loader.classList.add('hidden');
    }
});