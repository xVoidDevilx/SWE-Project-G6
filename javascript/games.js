const gameData = [
    {
        game: 'Powerball', price:"$15", jackpot:"$374,000,000", drawDate:"12/1/2023", imageSRC:"https://i.imgur.com/xEpAlA5.png"
    },
    {
        game: 'Mega Millions', price:"$13", jackpot:"$355,000,000", drawDate:"12/1/2023", imageSRC:"https://i.imgur.com/BTrhEMe.jpg"

    },
    {
        game: 'Lotto Texas', price:"$8", jackpot:"$25,750,000", drawDate:"12/1/2023", imageSRC:"https://i.imgur.com/UZrBt1v.png"
    },
    {
        game: 'Texas Two Step', price:"$5", jackpot:"$200,000", drawDate:"12/1/2023", imageSRC:"https://i.imgur.com/O1KF6TG.png"
    }
]
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

// Function to create a table row for each game
function createTableRows() {
    const table = document.querySelector('.gameTable'); // Select the table

    gameData.forEach(game => {
        // Create a table row
        const row = document.createElement('tr');
        row.id = game.game.replace(/\s+/g, '-'); // Replace spaces with hyphens for the id

        // Add the columns (td) to the row
        row.innerHTML = `
            <td class="content"><img src="${game.imageSRC}" class="cardImage" style="width: 100%; height: auto;"></td>
            <td class="content">${game.game}</td>
            <td class="content">${game.jackpot}</td>
            <td class="content">${game.price}</td>
            <td class="content">${game.drawDate}</td>
            <td><button class="cardButton" onclick="buyNowClicked('${game.game}')">Buy Now</button></td>
        `;

        // Append the row to the table
        table.appendChild(row);
    });
}

// Function to handle the button click event
function buyNowClicked(gameName) {
    console.log(gameName + ' Buy Now clicked');
    // Handle the click event (e.g., navigate to a purchase page)
}

// Call the function to create the rows when the page loads
document.addEventListener('DOMContentLoaded', createTableRows);
