import { User } from './user.js';
import { UserManager } from './storage.js';
import DomService from './domService.js';

const userManager = new UserManager();
let nextUserId = 1; // Initialize user ID counter

// Render users on page load
DomService.renderUsers(userManager.getUsers(), userManager);

// Handle registration form submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check for duplicate email
    if (userManager.getUsers().some((user) => user.email === email)) {
        alert('משתמש עם האימייל הזה כבר קיים במערכת!');
        return;
    }

    // Create and add a new user
    const newUser = new User(nextUserId++, firstName, lastName, email, password);
    userManager.addUser(newUser);

    // Render updated user list
    DomService.renderUsers(userManager.getUsers(), userManager);

    // Clear form fields
    e.target.reset();
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Attempt login
    const user = userManager.getUsers().find((u) => u.email === email && u.password === password);
    if (user) {
        userManager.loginUser(user.id);
        DomService.renderUsers(userManager.getUsers(), userManager);
        alert(`שלום, ${user.firstName}! התחברת בהצלחה.`);
    } else {
        alert('האימייל או הסיסמה אינם נכונים.');
    }

    // Clear form fields
    e.target.reset();
});
