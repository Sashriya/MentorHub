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