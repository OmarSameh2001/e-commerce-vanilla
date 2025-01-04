// Tab Switching
document.getElementById('login-tab').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('login').classList.add('active');
    document.getElementById('register').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
});

document.getElementById('register-tab').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('login').classList.remove('active');
    document.getElementById('register').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('register-tab').classList.add('active');
});

document.getElementById('go-to-register').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('login').classList.remove('active');
    document.getElementById('register').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('register-tab').classList.add('active');
});

document.getElementById('go-to-login').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('register').classList.remove('active');
    document.getElementById('login').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');
});

// Validate Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password Strength
function calculatePasswordStrength(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (password.length >= 8) strength++;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;

    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
}

// Registration Form Submission
document.querySelector('#register form').addEventListener('submit', function (event) {
    const email = document.getElementById('inputEmailRegister').value;
    const password = document.getElementById('inputPasswordRegister').value;
    const repeatPassword = document.getElementById('inputPasswordRepeat').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        event.preventDefault();
        return;
    }

    if (password !== repeatPassword) {
        alert('Passwords do not match.');
        event.preventDefault();
        return;
    }

    // Store user data in local storage
    const userData = { email: email, password: password };
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Registration successful!');
    event.preventDefault();  // Prevent the default form submission

    // Reset the form fields after successful registration
    this.reset();
});

// Login Form Submission
document.querySelector('#login form').addEventListener('submit', function (event) {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
        return;
    }

    if (password.length === 0) {
        alert('Please enter your password.');
        event.preventDefault();
        return;
    }

    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        if (email === userData.email && password === userData.password) {
            alert('Login successful!');
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('No user data found.');
    }

    event.preventDefault();
    this.reset();
});
