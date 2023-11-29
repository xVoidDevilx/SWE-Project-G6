document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = '../index.html';
});

/*--------------------------------------carousel logic--------------------------------------*/
let currentIndex = 0;
const images = document.querySelectorAll('.mainImage');
const totalImages = images.length;
let autoScrollInterval;
const imageContainer = document.querySelector('.image-container');

function updateImageDisplay() {
    const offset = -currentIndex * 100; 
    imageContainer.style.transform = `translateX(${offset}vw)`; 
}

function moveToNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateImageDisplay();
}

function moveToPreviousImage() {
    currentIndex = currentIndex - 1 < 0 ? totalImages - 1 : currentIndex - 1;
    updateImageDisplay();
}

document.querySelector('.carousel-control.left').addEventListener('click', moveToPreviousImage);
document.querySelector('.carousel-control.right').addEventListener('click', moveToNextImage);

function startAutoScroll() {
    autoScrollInterval = setInterval(moveToNextImage, 5000); // Change image every 5 seconds
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Start the auto-scroll when the page loads
startAutoScroll();

document.querySelector('.container').addEventListener('mouseover', stopAutoScroll);
document.querySelector('.container').addEventListener('mouseout', startAutoScroll);

/*--------------------------------------carousel logic--------------------------------------*/

//temporary logic
function checkLoginStatus() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
    }
}
function login() {
    window.location.href = '../pages/login-signup.html';
}
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '../index.html';
}

window.onload = checkLoginStatus;

document.getElementById('login').addEventListener('click', function() {
    login();
});
document.getElementById('logout').addEventListener('click', function() {
    logout();
});

document.getElementById('games').addEventListener('click', function() {
    window.location.href = '../pages/games.html';
});

document.getElementById('tickets').addEventListener('click', function() {
    window.location.href = '../pages/tickets.html';
});

document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = '../index.html';
});