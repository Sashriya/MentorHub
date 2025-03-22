document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let role = document.getElementById("role").value;

    if (name === "" || email === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Invalid email format!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    alert(`Registration Successful! Welcome, ${name} (${role})`);
    
    // Here you can send the data to the backend using fetch API or AJAX
});

function validateEmail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function registerUser(role) {
    if (role === "tutor") {
        window.location.href = "tutor_registration.html"; // Redirect to tutor registration page
    } else {
        window.location.href = "student_registration.html"; // Redirect to student registration page
    }
}

function toggleDropdown() {
    var dropdown = document.getElementById("dropdown");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block"; // Show dropdown
    } else {
        dropdown.style.display = "none"; // Hide dropdown
    }
}


document.addEventListener("DOMContentLoaded", function() {
    loadImages();
});

// Default images
const defaultImages = [
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/201",
    "https://via.placeholder.com/202",
    "https://via.placeholder.com/203",
    "https://via.placeholder.com/204"
];

// Load images from local storage or default
function loadImages() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear gallery

    let images = JSON.parse(localStorage.getItem("images")) || defaultImages;
    
    images.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        gallery.appendChild(img);
    });

    // Save default images in localStorage if empty
    if (!localStorage.getItem("images")) {
        localStorage.setItem("images", JSON.stringify(defaultImages));
    }
}

// Upload new image
function uploadImage() {
    const fileInput = document.getElementById("imageUpload");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            let images = JSON.parse(localStorage.getItem("images")) || defaultImages;
            images.push(event.target.result); // Store base64 image
            localStorage.setItem("images", JSON.stringify(images));
            loadImages();
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image to upload.");
    }
}

function navigateToPage() {
    var dropdown = document.getElementById("dropdown");
    var selectedValue = dropdown.value;
    if (selectedValue) {
        window.location.href = selectedValue;
    }
}

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        date: document.getElementById("date").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        address: document.getElementById("address").value,
        qualification: document.getElementById("qualification").value,
        role: document.getElementById("role").value,
        willing: document.querySelector('input[name="willing"]:checked')?.value || "",
        teaching: document.querySelector('input[name="teaching"]:checked')?.value || ""
    };

    localStorage.setItem("profileData", JSON.stringify(formData));

    alert("Registration Successful!");
    window.location.href = "profile.html";
});


document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Collect form data
    const studentData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("date").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        address: document.getElementById("address").value,
        pursuing: document.getElementById("pursuing").value,
        subjects: Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(sub => sub.value),
        sports: document.querySelector('input[name="sports"]:checked').value
    };

    // Store data in localStorage
    localStorage.setItem("studentProfile", JSON.stringify(studentData));

    // Redirect to profile page
    window.location.href = "profile.html";
});

document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("date").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        address: document.getElementById("address").value,
        pursuing: document.getElementById("pursuing").value,
        subjects: Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(sub => sub.value).join(", "),
        sports: document.querySelector('input[name="willing"]:checked')?.value || "",
        teaching: document.querySelector('input[name= "teaching"]: checked')?.value || "",
        annual: document.querySelector('input[name="annual"]: checked')?.value || ""
    };

    localStorage.setItem("studentProfile", JSON.stringify(userData)); // Save data to localStorage

    alert("Registration Successful! Redirecting to Profile Page.");
    window.location.href = "student_profile.html"; // Redirect to profile page
});

document.getElementById("registerBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    // Check if terms are accepted
    if (!document.getElementById("terms").checked) {
        alert("Please agree to the Terms and Conditions.");
        return;
    }

    // Get form data
    let studentData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("dob").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        address: document.getElementById("address").value,
        pursuing: document.getElementById("pursuing").value,
        subjects: Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(sub => sub.value).join(", "),
        sports: document.querySelector('input[name="sports"]:checked')?.value || "",
        income: document.querySelector('input[name="income"]:checked')?.value || ""
    };

    // Store in localStorage
    localStorage.setItem("studentProfile", JSON.stringify(studentData));

    // Redirect to Profile Page
    window.location.href = "stuprofile.html";
});

// Authentication System
// User storage and authentication functions

/**
 * Registers a new user and stores their credentials in localStorage
 * @param {string} username - The username
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @param {string} role - The user's role (student/tutor)
 * @returns {boolean} - Whether registration was successful
 */
function registerNewUser(username, email, password, role) {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username or email already exists
    const existingUser = users.find(user => 
        user.username === username || user.email === email
    );
    
    if (existingUser) {
        return false; // Username or email already taken
    }
    
    // Create a new user object with hashed password
    // In a real app, you'd use a proper hashing function, but we'll use a simple one here
    const hashedPassword = simpleHash(password);
    const newUser = {
        username,
        email,
        password: hashedPassword,
        role,
        createdAt: new Date().toISOString()
    };
    
    // Add user to array and save back to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return true;
}

/**
 * Authenticates a user based on username and password
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {object|null} - User object if authenticated, null otherwise
 */
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const hashedPassword = simpleHash(password);
    
    // Find user with matching credentials
    const user = users.find(user => 
        user.username === username && user.password === hashedPassword
    );
    
    if (user) {
        // Create session
        const session = {
            userId: user.username,
            role: user.role,
            loggedInAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hour expiry
        };
        
        localStorage.setItem('currentSession', JSON.stringify(session));
        return user;
    }
    
    return null;
}

/**
 * Checks if a user is currently logged in
 * @returns {boolean} - Whether a user is logged in
 */
function isLoggedIn() {
    const session = JSON.parse(localStorage.getItem('currentSession'));
    
    if (!session) {
        return false;
    }
    
    // Check if session has expired
    const now = new Date();
    const expiry = new Date(session.expiresAt);
    
    if (now > expiry) {
        // Session expired, clear it
        localStorage.removeItem('currentSession');
        return false;
    }
    
    return true;
}

/**
 * Gets the current logged in user info
 * @returns {object|null} - User object if logged in, null otherwise
 */
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    
    const session = JSON.parse(localStorage.getItem('currentSession'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    return users.find(user => user.username === session.userId) || null;
}

/**
 * Logs out the current user
 */
function logoutUser() {
    localStorage.removeItem('currentSession');
    window.location.href = 'index.html';
}

/**
 * Simple hash function for passwords
 * Note: This is NOT secure for production. Use a proper hashing library in real apps.
 * @param {string} str - String to hash
 * @returns {string} - Hashed string
 */
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16); // Convert to hex string
}

// Protect routes that require authentication
function checkAuth() {
    // List of pages that require authentication
    const protectedPages = [
        'main.html',
        'profile.html',
        'stuprofile.html'
    ];
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if current page is protected
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        // Not logged in, redirect to login page
        window.location.href = 'register.html';
        return false;
    }
    
    return true;
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

/**
 * Checks if the current user is an admin
 * @returns {boolean} - Whether the user is an admin
 */
function isAdmin() {
    const currentUser = getCurrentUser();
    return currentUser && currentUser.role === 'admin';
}

/**
 * Gets all registered users (admin only function)
 * @returns {Array} - Array of users or empty array if not admin
 */
function getAllUsers() {
    if (!isAdmin()) {
        return [];
    }
    return JSON.parse(localStorage.getItem('users')) || [];
}

/**
 * Deletes a user (admin only function)
 * @param {string} username - Username of user to delete
 * @returns {boolean} - Success status
 */
function deleteUser(username) {
    if (!isAdmin()) {
        return false;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user => user.username !== username);
    
    if (users.length === filteredUsers.length) {
        // No user was removed
        return false;
    }
    
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    return true;
}

/**
 * Creates or updates admin user
 * This should be called only once to create the first admin
 */
function createAdminUser() {
    // Check if admin already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(user => user.role === 'admin');
    
    if (!adminExists) {
        // Create admin user with default credentials (change in production!)
        const hashedPassword = simpleHash('admin123');
        const adminUser = {
            username: 'admin',
            email: 'admin@mentorhub.com',
            password: hashedPassword,
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Admin user created successfully');
    }
}

// Create admin user when the script loads
// This ensures there's always an admin account available
createAdminUser();