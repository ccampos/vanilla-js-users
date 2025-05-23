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
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    const card = document.createElement('div');
    const cardHeader = document.createElement('p');
    card.className = 'card';
    card.classList.add('mb-2', 'h-100');
    cardHeader.className = 'card-text';
    cardHeader.textContent = user.name;
    cardHeader.classList.add('p-2');
    card.appendChild(cardHeader);
    col.appendChild(card);
    cardList.appendChild(col);
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

// Testing Definition
function assertEquals(actual, expected, description) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  if (passed) {
    console.log(`Passed! ${description}`);
  } else {
    console.error(`Failed ${description}`);
    console.error(`Expected: ${JSON.stringify(expected)}`);
    console.error(`Got: ${JSON.stringify(actual)}`);
  }
}

// Run Tests
const sampleUsers = [
  { name: "Alice" },
  { name: "Holly" },
  { name: "Zendaya" }
];

assertEquals(
  filterUsers(sampleUsers, "ho"),
  [{ name: "Holly" }],
  'filters users by partial match'
)

assertEquals(
  filterUsers(sampleUsers, "bo"),
  [],
  'filters for non existant user'
)
