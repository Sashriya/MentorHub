document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");

    function loadProfile() {
        const profileData = JSON.parse(localStorage.getItem("profileData"));
        if (profileData) {
            document.getElementById("name").value = profileData.name;
            document.getElementById("email").value = profileData.email;
            document.getElementById("date").value = profileData.date;
            document.getElementById("gender").value = profileData.gender;
            document.getElementById("address").value = profileData.address;
            document.getElementById("qualification").value = profileData.qualification;
            document.getElementById("role").value = profileData.role;
            document.getElementById("willing").value = profileData.willing;
            document.getElementById("teaching").value = profileData.teaching;
        }
    }

    loadProfile();

    editBtn.addEventListener("click", function () {
        profileForm.querySelectorAll("input, textarea").forEach(input => input.removeAttribute("readonly"));
        saveBtn.removeAttribute("disabled");
    });

    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!document.getElementById("terms").checked) {
            alert("Please agree to the Terms and Conditions.");
            return;
        }

        const updatedData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            gender: document.getElementById("gender").value,
            date: document.getElementById("date").value,
            qualification: document.getElementById("qualification").value,
            role: document.getElementById("role").value,
            willing: document.getElementById("willing").value,
            teaching: document.getElementById("teaching").value
        };

        localStorage.setItem("profileData", JSON.stringify(updatedData));
        alert("Profile updated successfully!");
        window.location.href = "tutor_registration.html";
        location.reload();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Load data from localStorage
    const studentData = JSON.parse(localStorage.getItem("studentProfile"));
    const profileForm = document.getElementById("profileForm");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");

    if (studentData) {
        document.getElementById("profileName").value = studentData.name;
        document.getElementById("profileEmail").value = studentData.email;
        document.getElementById("profileDOB").value = studentData.dob;
        document.getElementById("profileGender").value = studentData.gender;
        document.getElementById("profileAddress").value = studentData.address;
        document.getElementById("profilePursuing").value = studentData.pursuing;
        document.getElementById("profileSubjects").value = studentData.subjects.join(", ");
        document.getElementById("profileSports").value = studentData.sports;
    }

    // Save updates
    document.getElementById("profileForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedData = {
            ...studentData,
            name: document.getElementById("profileName").value,
            email: document.getElementById("profileEmail").value,
            dob: document.getElementById("profileDOB").value,
            address: document.getElementById("profileAddress").value,
            gender: document.getElementById("profileGender").value,
            pursuing: document.getElementById("profilePursuing").value,
            subjects: document.getElementById("profileSubjects").value,
            sports: document.getElementById("profileSports").value

        };

        localStorage.setItem("studentProfile", JSON.stringify(updatedData));
        alert("Profile updated successfully!");
        window.location.href = "student_registration.html";
        location.reload();
    });
});