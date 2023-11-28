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
    autoScrollInterval = setInterval(moveToNextImage, 3000); // Change image every 3 seconds
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
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
}
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
}
// Call the function when the page loads
window.onload = checkLoginStatus;


document.getElementById('games').addEventListener('click', function() {
    window.location.href = 'pages/games.html';
});

document.getElementById('tickets').addEventListener('click', function() {
    window.location.href = 'pages/tickets.html';
});

document.getElementById('checkNumbers').addEventListener('click', function() {
    window.location.href = 'pages/checkNumbers.html';
});

document.getElementById('gamesBottom').addEventListener('click', function() {
    window.location.href = 'pages/games.html';
});

document.getElementById('ticketsBottom').addEventListener('click', function() {
    window.location.href = 'pages/tickets.html';
});