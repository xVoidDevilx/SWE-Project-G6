const gameData = [
    {
        game: 'Powerball', 
        price: "$15", 
        jackpot: "$374,000,000", 
        drawDate: "12/1/2023", 
        imageSRC: "https://i.imgur.com/xEpAlA5.png",
        numberOfBalls: 5
    },
    {
        game: 'Mega Millions', 
        price: "$13", 
        jackpot: "$355,000,000", 
        drawDate: "12/1/2023", 
        imageSRC: "https://i.imgur.com/BTrhEMe.jpg",
        numberOfBalls: 5
    },
    {
        game: 'Lotto Texas', 
        price: "$8", 
        jackpot: "$25,750,000", 
        drawDate: "12/1/2023", 
        imageSRC: "https://i.imgur.com/UZrBt1v.png",
        numberOfBalls: 6
    },
    {
        game: 'Texas Two Step', 
        price: "$5", 
        jackpot: "$200,000", 
        drawDate: "12/1/2023", 
        imageSRC: "https://i.imgur.com/O1KF6TG.png",
        numberOfBalls: 4
    }
];

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
    const selectedGame = gameData.find((game) => game.game === gameName);

    // Check if a game with the specified name was found
    if (selectedGame) {
        createModal(selectedGame);
    } else {
        console.error(`Game data not found for '${gameName}'`);
    }
}

// Call the function to create the rows when the page loads
document.addEventListener('DOMContentLoaded', createTableRows);


// Function to generate the input fields based on the number of balls
function generateInputFields(numBalls) {
    let inputFields = '';
    for (let i = 0; i < numBalls; i++) {
        inputFields += `<input class="ball" maxlength="2">`;
    }
    console.log(inputFields)
    return inputFields;
}
// Function to create and display the modal
function createModal(gameData) {
    // Create a modal element
    const modal = document.createElement('div');
    modal.id = 'modal';

    // Construct the modal content based on the game data
    modal.innerHTML = `
        <button id="exit">X</button>
        <h1 id="modalTitle">${gameData.game}</h1>
        <h2 id="modalJackpot">Jackpot: ${gameData.jackpot}</h2>
        <h2 id="modalPrice">Price: ${gameData.price}</h2>
        <form id="ballArea">
            ${generateInputFields(gameData.numberOfBalls)}
        </form>
        <form>
            <input type="checkbox" id="choose">Choose for me
        </form>
        <button id="modalButton">Buy</button>
    `;

    // Append the modal to the body
    document.body.appendChild(modal);


    // Event listener to close the modal when the "X" button is clicked
    const exitButton = document.getElementById('exit');
    exitButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Event listener to handle the "Choose for me" checkbox
    const chooseCheckbox = document.getElementById('choose');
    chooseCheckbox.addEventListener('change', () => {
        const inputFields = document.querySelectorAll('.ball');
        if (chooseCheckbox.checked) {
            inputFields.forEach((input) => {
                input.value = getRandomNumber(0, 99);
            });
        } else {
            inputFields.forEach((input) => {
                input.value = '';
            });
        }
    });

    // Event listener to handle the "Buy" button click
    const buyButton = document.getElementById('modalButton');
    buyButton.addEventListener('click', () => {
        const inputFields = document.querySelectorAll('.ball');
        const selectedNumbers = Array.from(inputFields).map((input) => input.value);
        console.log('Selected Numbers:', selectedNumbers);
        document.body.removeChild(modal);
    });
}


// Function to get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Call the function to create the table rows when the page loads
document.addEventListener('DOMContentLoaded', createTableRows);