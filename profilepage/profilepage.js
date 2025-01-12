const navbarHtml = document.querySelector(".navbar");

// Handle profile picture upload and preview
document
  .getElementById("profile-upload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profile-picture").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// DOM Elements for profile and form inputs
const profilePicture = document.getElementById("profile-picture");
const profileUpload = document.getElementById("profile-upload");
const updateButton = document.querySelector(".update-button");
const formInputs = document.querySelectorAll(".form-input");

// Elements to display the user's profile info
const profileName = document.querySelector(".profile-name");
const profileEmail = document.querySelector(".profile-email");

// Load the user's profile data when the page loads
function loadProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const usersData = JSON.parse(localStorage.getItem("usersData"));

  // Redirect if the user isn't logged in
  if (!currentUser || !usersData) {
    alert("No user is logged in. Redirecting to login page...");
    window.location.href = "../login.html";
    return;
  }

  const userProfile = usersData.find((user) => user.username === currentUser);

  if (userProfile) {
    // Update the display with the user's profile data
    profileName.textContent = userProfile.firstName || userProfile.username;
    profileEmail.textContent = userProfile.email;

    // Fill the form with existing data
    formInputs[0].value = userProfile.firstName || "";
    formInputs[1].value = userProfile.lastName || "";
    formInputs[2].value = userProfile.age || "";
    formInputs[3].value = userProfile.phone || "";
    formInputs[4].value = userProfile.address || "";
    formInputs[5].value = userProfile.postalCode || "";

    // Load the profile picture if it's already saved
    if (userProfile.profilePicture) {
      profilePicture.src = userProfile.profilePicture;
    }
  } else {
    alert("User not found. Redirecting to login page...");
    window.location.href = "../login.html";
  }
}

// Save updated profile data
function saveProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const usersData = JSON.parse(localStorage.getItem("usersData"));

  const userProfile = usersData.find((user) => user.username === currentUser);

  if (userProfile) {
    // Grab all the inputs and validate them
    const countryCode = document.getElementById("country-code").value;
    const firstName = formInputs[0].value.trim();
    const lastName = formInputs[1].value.trim();
    const age = formInputs[2].value.trim();
    const phone = formInputs[3].value.trim();
    const address = formInputs[4].value.trim();
    const postalCode = formInputs[5].value.trim();

    // Make sure names don't have numbers or special characters
    const nameRegex = /^[a-zA-Z\s]+$/;

    // Let's run some checks before saving
    if (!firstName) {
      alert("First name cannot be empty.");
      return;
    }
    if (!nameRegex.test(firstName)) {
      alert("First name cannot contain numbers or special characters.");
      return;
    }
    if (!lastName) {
      alert("Last name cannot be empty.");
      return;
    }
    if (!nameRegex.test(lastName)) {
      alert("Last name cannot contain numbers or special characters.");
      return;
    }
    if (!age || isNaN(age) || age <= 0 || age > 120) {
      alert("Please enter a valid age.");
      return;
    }
    if (!phone || !/^\d{7,15}$/.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
    if (!address) {
      alert("Address cannot be empty.");
      return;
    }
    if (!postalCode || !/^\d{4,10}$/.test(postalCode)) {
      alert("Please enter a valid postal code.");
      return;
    }

    // Combine the country code with the phone number
    const fullPhone = `${countryCode}${phone}`;

    // Update the user's profile with the new data
    userProfile.firstName = firstName;
    userProfile.lastName = lastName;
    userProfile.age = age;
    userProfile.phone = fullPhone;
    userProfile.address = address;
    userProfile.postalCode = postalCode;

    // Update the profile picture if it's changed
    if (profilePicture.src !== userProfile.profilePicture) {
      userProfile.profilePicture = profilePicture.src;
    }

    // Save the changes back to local storage
    localStorage.setItem("usersData", JSON.stringify(usersData));

    alert("Profile updated successfully!");
  } else {
    alert("Error: Unable to update profile.");
  }
}

// Handle profile picture changes
profileUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicture.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Save profile when the update button is clicked
updateButton.addEventListener("click", function () {
  saveProfile();
});

// Load the profile data as soon as the page is ready
document.addEventListener("DOMContentLoaded", loadProfile);

// Handle the navigation bar and footer
fetch("../navbar/nav.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((html) => {
    navbarHtml.innerHTML = html;
  })
  .then(() => {
    const currentUser =
      localStorage.getItem("currentUser").slice(1, -1) ||
      sessionStorage.getItem("currentUser").slice(1, -1);
    document.getElementById("userName").innerHTML = currentUser;
    const logoutElement = document.getElementById("logout");
    logoutElement.style.cursor = "pointer";
    if (currentUser) {
      logoutElement.innerHTML = "Logout";
      logoutElement.onclick = () => {
        const confirmLogout = window.confirm(
          "Are you sure you want to logout?"
        );
        if (confirmLogout) {
          localStorage.removeItem("currentUser");
          sessionStorage.removeItem("currentUser");
          window.location.href = "../user/user.html";
        }
      };
    } else {
      document.getElementById("dropdown").display = "none";
    }

    const userName = document.getElementById("userName");
    userName.addEventListener("click", function () {
      window.location.href = "../profilepage/profilepage.html";
    });
    userName.style.cursor = "pointer";
    
    const logoutmini = document.getElementById("logout-mini");
    logoutmini.addEventListener("click", function () {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("currentUser");
        window.location.href = "../user/user.html";
      }
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

const footerHtml = document.querySelector(".footer");

// Fetch and load the footer content
fetch("../footer/footer.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((html) => {
    footerHtml.innerHTML = html;
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
