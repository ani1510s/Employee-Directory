let employees = [];
let isAdmin = false;
const modal = document.getElementById('modal');
const loginModal = document.getElementById('loginModal');
const addBtn = document.getElementById('addBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeModal = document.getElementById('closeModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const form = document.getElementById('employeeForm');
const loginForm = document.getElementById('loginForm');
const employeeList = document.getElementById('employeeList');
const searchInput = document.getElementById('searchInput');
const addEmployeeLink = document.getElementById('addEmployeeLink');
const profileLink = document.getElementById('profileLink');
const settingsLink = document.getElementById('settingsLink');


const adminCredentials = {
  username: 'admin',
  password: 'password'
};


loginBtn.onclick = () => {
    // Simulate admin login
    isAdmin = true;
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    addEmployeeLink.classList.remove('hidden');
    profileLink.classList.remove('hidden');
    settingsLink.classList.remove('hidden');
    };
    

// Function to handle closing the login modal
closeLoginModal.onclick = () => {
  loginModal.classList.add('hidden');
};

// Function to handle admin login form submission
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    isAdmin = true;
    loginModal.classList.add('hidden');
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    addBtn.classList.remove('hidden');
    renderEmployees(); // Update employee list to show admin actions
  } else {
    alert('Invalid credentials');
  }
};

// Function to handle admin logout button click

logoutBtn.onclick = () => {
    // Simulate admin logout
    isAdmin = false;
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    addEmployeeLink.classList.add('hidden');
    profileLink.classList.add('hidden');
    settingsLink.classList.add('hidden');
    };
    
  renderEmployees(); // Update employee list to hide admin actions

// Function to handle add employee button click
addBtn.onclick = () => {
  if (!isAdmin) {
    alert('Only admin can perform this action');
    return;
  }
  document.getElementById('modalTitle').textContent = 'Add Employee';
  form.reset();
  document.getElementById('employeeId').value = '';
  modal.classList.remove('hidden');
};

// Function to handle closing the employee modal
closeModal.onclick = () => {
  modal.classList.add('hidden');
};

// Function to handle employee form submission
form.onsubmit = (e) => {
  e.preventDefault();
  if (!isAdmin) {
    alert('Only admin can perform this action');
    return;
  }

  const id = document.getElementById('employeeId').value;
  const employee = {
    id: id || Date.now().toString(),
    name: document.getElementById('name').value,
    department: document.getElementById('department').value,
    position: document.getElementById('position').value,
    joiningDate: document.getElementById('joiningDate').value,
  };

  if (id) {
    const index = employees.findIndex(emp => emp.id === id);
    employees[index] = employee;
  } else {
    employees.push(employee);
  }

  modal.classList.add('hidden');
  renderEmployees();
};

// Function to render employees list
function renderEmployees(filter = '') {
  employeeList.innerHTML = '';

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(filter.toLowerCase()) ||
    emp.department.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    employeeList.innerHTML = '<p>No employees found.</p>';
    return;
  }

  filtered.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="actions">
        ${isAdmin ? `<button onclick="editEmployee('${emp.id}')">✏️</button>
        <button onclick="deleteEmployee('${emp.id}')">🗑️</button>` : ''}
      </div>
      <h3>${emp.name}</h3>
      <small>${emp.position} | ${emp.department}</small>
      <p>Joined: ${emp.joiningDate}</p>
    `;
    employeeList.appendChild(card);
  });
}

// Function to handle editing an employee
function editEmployee(id) {
  if (!isAdmin) {
    alert('Only admin can perform this action');
    return;
  }
  const emp = employees.find(e => e.id === id);
  document.getElementById('modalTitle').textContent = 'Edit Employee';
  document.getElementById('employeeId').value = emp.id;
  document.getElementById('name').value = emp.name;
  document.getElementById('department').value = emp.department;
  document.getElementById('position').value = emp.position;
  document.getElementById('joiningDate').value = emp.joiningDate;
  modal.classList.remove('hidden');
}

// Function to handle deleting an employee
function deleteEmployee(id) {
  if (!isAdmin) {
    alert('Only admin can perform this action');
    return;
  }
  employees = employees.filter(e => e.id !== id);
  renderEmployees();
}

// Function to handle search input
searchInput.oninput = () => {
  renderEmployees(searchInput.value);
};

// Initial render of employees list
renderEmployees();
