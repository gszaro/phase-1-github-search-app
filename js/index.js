document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const searchButton = document.querySelector('input[type="submit"]');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    let searchType = 'user'; // Default search type
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const searchTerm = searchInput.value;
  
      if (searchType === 'user') {
        searchUsers(searchTerm);
      } else if (searchType === 'repo') {
        searchRepos(searchTerm);
      }
    });
  
    searchButton.addEventListener('click', () => {
      searchType = searchType === 'user' ? 'repo' : 'user';
      searchInput.placeholder = `Search ${searchType}s`;
      searchInput.value = '';
    });
  
    function searchUsers(searchTerm) {
      const url = `https://api.github.com/search/users?q=${searchTerm}`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          userList.innerHTML = ''; // Clear previous search results
  
          data.items.forEach((user) => {
            const listItem = document.createElement('li');
            const username = document.createElement('p');
            const avatar = document.createElement('img');
            const profileLink = document.createElement('a');
  
            username.textContent = user.login;
            avatar.src = user.avatar_url;
            profileLink.href = user.html_url;
            profileLink.textContent = 'Profile';
  
            listItem.appendChild(username);
            listItem.appendChild(avatar);
            listItem.appendChild(profileLink);
  
            userList.appendChild(listItem);
          });
        })
        .catch((error) => {
          console.log('An error occurred:', error);
        });
    }
  
    function searchRepos(searchTerm) {
      const url = `https://api.github.com/search/repositories?q=${searchTerm}`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          reposList.innerHTML = ''; // Clear previous search results
  
          data.items.forEach((repo) => {
            const listItem = document.createElement('li');
            const repoName = document.createElement('p');
            const repoLink = document.createElement('a');
  
            repoName.textContent = repo.name;
            repoLink.href = repo.html_url;
            repoLink.textContent = 'View Repository';
  
            listItem.appendChild(repoName);
            listItem.appendChild(repoLink);
  
            reposList.appendChild(listItem);
          });
        })
        .catch((error) => {
          console.log('An error occurred:', error);
        });
    }
  });