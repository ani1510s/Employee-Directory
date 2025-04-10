let employees = [];
let isAdmin = false;
 
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const addEmployeeLink = document.getElementById('addEmployeeLink');
const employeeList = document.getElementById('employeeList');
const searchInput = document.getElementById('searchInput');
 
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
 
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('employeeForm');
 
const adminCredentials = {
  username: 'adminuser',
  password: 'secure123'
};
 
// Login Button
loginBtn.onclick = () => {
  loginModal.classList.remove('hidden');
};
 
// Close Login Modal
closeLoginModal.onclick = () => {
  loginModal.classList.add('hidden');
};
 
// Login Submit
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;
 
  if (username === adminCredentials.username && password === adminCredentials.password) {
    isAdmin = true;
    loginModal.classList.add('hidden');
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    addEmployeeLink.classList.remove('hidden');
    renderEmployees();
  } else {
    alert('Invalid credentials!');
  }
};
 
// Logout
logoutBtn.onclick = () => {
  isAdmin = false;
  loginBtn.classList.remove('hidden');
  logoutBtn.classList.add('hidden');
  addEmployeeLink.classList.add('hidden');
  renderEmployees();
};
 
// Search
searchInput.oninput = () => {
  renderEmployees(searchInput.value);
};
 
// Open Add Modal
addEmployeeLink.onclick = () => {
  if (!isAdmin) return alert('Only admin can perform this action.');
  form.reset();
  document.getElementById('employeeId').value = '';
  document.getElementById('modalTitle').textContent = 'Add Employee';
  modal.classList.remove('hidden');
};
// Theme Toggle Logic
const themeSwitch = document.getElementById('themeSwitch');
 
// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeSwitch.checked = true;
}
 
// Toggle theme
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});
 
 
// Close Add/Edit Modal
closeModal.onclick = () => modal.classList.add('hidden');
 
// Add/Edit Form Submission
form.onsubmit = (e) => {
  e.preventDefault();
  if (!isAdmin) return alert('Only admin can perform this action.');
 
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
 
// Render Employees
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
        ${isAdmin ? `emp.id}')">🗑️</button>` : ''}

      </div>
      
${emp.name}</h3>
      <small>${emp.position} | ${emp.department}</small>
      <p>Joined: ${emp.joiningDate}</p>
    `;
    employeeList.appendChild(card);
  });
}
 
function editEmployee(id) {
  if (!isAdmin) return;
  const emp = employees.find(e => e.id === id);
  document.getElementById('modalTitle').textContent = 'Edit Employee';
  document.getElementById('employeeId').value = emp.id;
  document.getElementById('name').value = emp.name;
  document.getElementById('department').value = emp.department;
  document.getElementById('position').value = emp.position;
  document.getElementById('joiningDate').value = emp.joiningDate;
  modal.classList.remove('hidden');
}
 
function deleteEmployee(id) {
  if (!isAdmin) return;
  employees = employees.filter(e => e.id !== id);
  renderEmployees();
}
 
// Initial render
renderEmployees();
 