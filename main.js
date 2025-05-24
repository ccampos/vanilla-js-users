const searchInput = document.getElementById("searchInput");
let currentListener;

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json();
    })
    .then((users) => {
      render(users);
      setInputListener(users);
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


function setInputListener(users) {
  if (currentListener) {
    searchInput.removeEventListener('input', currentListener);
  }

  currentListener = function () {
    const query = searchInput.value;
    const filtered = filterUsers(users, query);
    render(filtered);
  };

  searchInput.addEventListener('input', currentListener);
}


getUsers();

// Unit Testing Definition
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

// Run Unit Tests
const sampleUsers = [
  { name: "Alice" },
  { name: "Holly" },
  { name: "Zendaya" }
];

if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  assertEquals(
    filterUsers(sampleUsers, "ho"),
    [{ name: "Holly" }],
    'filters users by partial match'
  );

  assertEquals(
    filterUsers(sampleUsers, "bo"),
    [],
    'filters for non existant user'
  );
}

// Integration Test Definition
function runIntegrationTest() {
  const testName = "Integration: filters visible user cards by name";

  const mockUsers = [
    { name: "Alice", email: "alice@mail.com", address: { city: "Springfield" } },
    { name: "Bob", email: "bob@mail.com", address: { city: "Metropolis" } },
    { name: "Charlie", email: "charlie@mail.com", address: { city: "Gotham" } },
  ];

  render(mockUsers); // injects mock data into DOM
  setInputListener(mockUsers);

  searchInput.value = "bob";
  searchInput.dispatchEvent(new Event("input"));

  const cards = document.querySelectorAll("#user-list .card");
  const names = Array.from(cards).map(c => c.textContent.trim().toLowerCase());

  if (cards.length === 1 && names[0].includes("bob")) {
    console.log(`✅ ${testName}`);
  } else {
    console.error(`❌ ${testName}`);
    console.error(`   Expected 1 result with 'Bob', got:`, names);
  }
  searchInput.value = "";
}

// Run Integration Tests
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  runIntegrationTest();
}
