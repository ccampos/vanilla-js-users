/** @type {Array<{ name: string; email: string; address: { street: string; city: string } }>} */
let allUsers;

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json();
    })
    .then((users) => {
      allUsers = users;
      render(allUsers);
    })
}

function render(users) {
  const cardList = document.createElement('div');
  for (const user of users) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('p');
    card.className = 'card';
    card.classList.add('mb-2');
    cardHeader.className = 'card-text';
    cardHeader.textContent = user.name;
    cardHeader.classList.add('p-2');
    card.appendChild(cardHeader);
    cardList.appendChild(card);
  }
  const container = document.querySelector('#user-list');
  container.innerHTML = '';
  container.appendChild(cardList);
}

function filterUsers(users, query) {
  const lowerCaseQuery = query.toLowerCase();
  return users.filter(user => {
    return user.name.toLowerCase().includes(lowerCaseQuery);
  });
}

function setInputListener() {
  const input = document.querySelector('#searchInput');
  input.addEventListener('input', () => {
    const query = input.value;
    const filteredUsers = filterUsers(allUsers, query);
    render(filteredUsers);
  });
}

getUsers();
setInputListener();
