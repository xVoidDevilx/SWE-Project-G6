import {users} from "../resources/users.js";

//function to search user -----------------------------------------------------
function findUserByUsername(username) {
    const user = users.find(user => user.username === username);
    console.log(user);
    if (!user) {
        console.log('User not found'); 
    }
    return user;
}
//function to search user -----------------------------------------------------

//eventlisteners --------------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('signupbtn').addEventListener('click', SignupHere);
    document.getElementById('loginbtn').addEventListener('click', LoginHere);
    document.getElementById('login-submit-btn').addEventListener('click', Login);
    document.getElementById('signup-submit-btn').addEventListener('click', signup);
    const passwordIcon = document.querySelector('.password-icon');
    if (passwordIcon) {
        passwordIcon.addEventListener('click', togglePasswordVisibility);
    }
    const signupBtn = document.getElementById('signup-submit-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', signup);
    }
});
//eventlisteners --------------------------------------------------------------


//functions to toggle between signup and login -------------------------------
function SignupHere() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'flex';
}

function LoginHere() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
}
//functions to toggle between signup and login -------------------------------

//function to login ----------------------------------------------------------
function Login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error-msg');

    try {
        const user = findUserByUsername(username);
        if (user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../index.html';
        } else {
            // Incorrect password
            errorMsg.textContent = 'Username or password is incorrect';
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        // User not found
        errorMsg.textContent = 'Username or password is incorrect';
        errorMsg.style.display = 'block';
    }
}
//function to login ----------------------------------------------------------

//function to signup ---------------------------------------------------------
function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const reenterPassword = document.getElementById('reenter-password').value;
    const errorMsg = document.getElementById('signup-error-msg'); 
    const username = document.getElementById('signup-username').value;

    // Clear previous error message
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';

    // Validate email format
    if (!validateEmail(email)) {
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.style.display = 'block';
        return;
    }

    // Check if passwords match
    if (password !== reenterPassword) {
        errorMsg.textContent = 'Passwords do not match.';
        errorMsg.style.display = 'block';
        return;
    }

    // If validation passes
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', username);

}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
}

//function to signup ---------------------------------------------------------





//function to toggle password visibility ------------------------------------
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('login-password');
    const toggleIcon = document.querySelector('.password-icon');
    
    
    const isPasswordVisible = passwordInput.type === 'text';

    passwordInput.type = isPasswordVisible ? 'password' : 'text';

    
    if (isPasswordVisible) {
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
}

document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = '../index.html';
});