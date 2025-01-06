// Tab Switching
document
  .getElementById("login-tab")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("login").classList.add("active");
    document.getElementById("register").classList.remove("active");
    document.getElementById("login-tab").classList.add("active");
    document.getElementById("register-tab").classList.remove("active");
  });

document
  .getElementById("register-tab")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("login").classList.remove("active");
    document.getElementById("register").classList.add("active");
    document.getElementById("login-tab").classList.remove("active");
    document.getElementById("register-tab").classList.add("active");
  });

document
  .getElementById("go-to-register")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("login").classList.remove("active");
    document.getElementById("register").classList.add("active");
    document.getElementById("login-tab").classList.remove("active");
    document.getElementById("register-tab").classList.add("active");
  });

document
  .getElementById("go-to-login")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("register").classList.remove("active");
    document.getElementById("login").classList.add("active");
    document.getElementById("register-tab").classList.remove("active");
    document.getElementById("login-tab").classList.add("active");
  });

// Validate Email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Password Strength
document
  .getElementById("inputPasswordRegister")
  .addEventListener("input", function () {
    calculatePasswordStrength(this.value);
  });
function calculatePasswordStrength(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errorElement = document.getElementById("passwordError");
  const strengthElement = document.getElementById("passwordStrength");

  if (password.length < 8) {
    errorElement.innerText = "Password must be at least 8 characters long.";
    errorElement.style.color = "red";
    strengthElement.innerText = "";
    return;
  } else {
    errorElement.innerText = "";
  }

  let strength = 0;
  if (password.length >= 8) strength++;
  if (hasUpperCase) strength++;
  if (hasLowerCase) strength++;
  if (hasNumbers) strength++;
  if (hasSpecialChars) strength++;

  strengthElement.innerText = "";

  if (strength <= 2) {
    strengthElement.innerText = "Weak Password";
    strengthElement.style.color = "red";
  } else if (strength <= 4) {
    strengthElement.innerText = "Good Password";
    strengthElement.style.color = "orange";
  } else {
    strengthElement.innerText = "Strong Password";
    strengthElement.style.color = "green";
  }
}

//Password matching
document
  .getElementById("inputPasswordRepeat")
  .addEventListener("input", function () {
    const password = document.getElementById("inputPasswordRegister").value;
    const repeatPassword = this.value;

    if (password !== repeatPassword) {
      document.getElementById("repeatPasswordError").innerText =
        "Passwords do not match.";
      document.getElementById("repeatPasswordError").style.color = "red";
    } else {
      document.getElementById("repeatPasswordError").innerText = "";
    }
  });

  let generatedOtp = null;
// Registration Form Submission
document
  .getElementById("register-button")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const email = document.getElementById("inputEmailRegister").value;
    const password = document.getElementById("inputPasswordRegister").value;
    const repeatPassword = document.getElementById("inputPasswordRepeat").value;
    const bcrypt = dcodeIO.bcrypt;
    const salt = bcrypt.genSaltSync(10);

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      event.preventDefault();
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      event.preventDefault();
      return;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      event.preventDefault();
      return;
    }

    const usersData = JSON.parse(localStorage.getItem("usersData"));
    if (usersData && usersData.length > 1) {
      usersData?.map((user) => {
        if (user.email === email || user.username === email.split("@")[0]) {
          alert("Email or username already exists.");
          event.preventDefault();
          return;
        }
      });
    }

    generatedOtp = Math.floor(Math.random() * 9999).toString();
    console.log(generatedOtp);
    // try {
    //   const templateParams = {
    //   email: email,
    //   message: `Your OTP is ${generatedOtp}`,
    //   name: email.split("@")[0],
    //   }
    //   const response = await emailjs.send('service_nv0azng', 'template_68ny5to', templateParams)
    //   console.log('Email sent successfully:', response);
    // } catch (error) {
    //   alert('Error sending email:', error);
    //   return;
    // }
    document.getElementById("otp-container").style.display = "block";
    document.getElementById("inputEmailRegister").disabled = true;
    document.getElementById("inputPasswordRegister").disabled = true;
    document.getElementById("inputPasswordRepeat").disabled = true;
    document.getElementById("register-button").disabled = true;
  });

document
  .getElementById("sendOtp")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById("inputEmailRegister").value;
    const password = document.getElementById("inputPasswordRegister").value;
    const bcrypt = dcodeIO.bcrypt;
    const salt = bcrypt.genSaltSync(10);
    const otp = document.getElementById("inputOtp").value;
    if (generatedOtp !== otp) {
      alert("Invalid OTP");
      event.preventDefault();
      return;
    }
    
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Store user data in local storage
    const userData = {
      username: email.split("@")[0],
      email: email,
      password: hashedPassword,
    };

    const usersData = localStorage.getItem("usersData");
    if (usersData && usersData) {
      const users = JSON.parse(usersData);
      users.push(userData);
      localStorage.setItem("usersData", JSON.stringify(users));
    } else {
      localStorage.setItem("usersData", JSON.stringify([userData]));
    }

    alert("Registration successful!");
    event.preventDefault();

    window.location.reload(true);
  });

// Login Form Submission
document
  .getElementById("login-button")
  .addEventListener("click", function (event) {
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const bcrypt = dcodeIO.bcrypt;

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      event.preventDefault();
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      event.preventDefault();
      return;
    }
    
    const rememberMe = document.getElementById("rememberMe");

    // Retrieve user data from local storage
    const usersData = JSON.parse(localStorage.getItem("usersData"));
    usersData.map((user) => {
      if (user.email === email) {
        if (bcrypt.compareSync(password, user.password)) {
          if(rememberMe.checked) {
            localStorage.setItem("currentUser", JSON.stringify(user.username));
          }else {
            sessionStorage.setItem("currentUser", JSON.stringify(user.username));
          }
          alert("Login successful!");
        } else {
          alert("Invalid email or password.");
          event.preventDefault();
          return;
        }
        window.location.href = "../index.html";
      }
    });
  });
