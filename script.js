const categories = {
    fruits: ["orange", "custardapple", "gooseberry"],
    vegetables: ["brinjal", "tomato", "ladysfinger"],
    animals: ["giraffe", "iguana", "alligator"],
    places: ["italy", "turkey", "australia"],
    technology: ["javascript", "python", "database"]
};

let selectedCategory, word, maskedWord;
let chances, guessedLetters, currentCategoryIndex = 0;
const categoriesList = Object.keys(categories);

function initializeGame() {
    guessedLetters = [];
    chances = 10; // Updated chances
    selectedCategory = categoriesList[currentCategoryIndex];
    word = getRandomWord(selectedCategory);
    maskedWord = "_".repeat(word.length);
    updateDisplay();
    generateLetterButtons();
    resetCanvas();
}

function getRandomWord(category) {
    const words = categories[category];
    return words[Math.floor(Math.random() * words.length)];
}

function updateDisplay() {
    document.getElementById("category").innerText = selectedCategory;
    document.getElementById("wordDisplay").innerText = maskedWord.split("").join(" ");
    document.getElementById("chancesLeft").innerText = chances;
    document.getElementById("message").innerText = "";
    document.getElementById("nextWordBtn").style.display = "none";
}

function generateLetterButtons() {
    const lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.innerText = letter;
        button.onclick = () => handleGuess(letter.toLowerCase());
        lettersDiv.appendChild(button);
    }
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || maskedWord === word) return;

    guessedLetters.push(letter);
    const buttons = document.getElementById("letters").children;
    [...buttons].forEach(btn => {
        if (btn.innerText.toLowerCase() === letter) btn.disabled = true;
    });

    if (word.includes(letter)) {
        revealLetter(letter);
    } else {
        chances--;
        drawHangmanPart();
    }

    document.getElementById("chancesLeft").innerText = chances;
    checkGameStatus();
}

function revealLetter(letter) {
    let newMaskedWord = "";
    for (let i = 0; i < word.length; i++) {
        newMaskedWord += word[i] === letter ? letter : maskedWord[i];
    }
    maskedWord = newMaskedWord;
    document.getElementById("wordDisplay").innerText = maskedWord.split("").join(" ");
}

function checkGameStatus() {
    if (maskedWord === word) {
        document.getElementById("message").innerText = "You guessed it! Moving to next word...";
        document.getElementById("nextWordBtn").style.display = "inline";
    } else if (chances <= 0) {
        document.getElementById("message").innerText = `Game over! The word was "${word}".`;
        alert("Game Over!");
    }
}

function nextWord() {
    currentCategoryIndex = (currentCategoryIndex + 1) % categoriesList.length;
    initializeGame();
}

// Hangman Drawing Functions
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawHangmanPart() {
    switch (chances) {
        case 9: drawBase(); break;
        case 8: drawPole(); break;
        case 7: drawBeam(); break;
        case 6: drawRope(); break;
        case 5: drawHead(); break;
        case 4: drawBody(); break;
        case 3: drawLeftArm(); break;
        case 2: drawRightArm(); break;
        case 1: drawLeftLeg(); break;
        case 0: drawRightLeg(); break; // Game Over after this
    }
}

function drawBase() {
    ctx.lineWidth = 4; // Increase line width
    ctx.strokeStyle = "#333"; // Darker color
    ctx.beginPath();
    ctx.moveTo(10, 240);
    ctx.lineTo(190, 240);
    ctx.stroke();
}

function drawPole() {
    ctx.beginPath();
    ctx.moveTo(40, 240);
    ctx.lineTo(40, 20);
    ctx.stroke();
}

function drawBeam() {
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(120, 20);
    ctx.stroke();
}

function drawRope() {
    ctx.beginPath();
    ctx.moveTo(120, 20);
    ctx.lineTo(120, 50);
    ctx.stroke();
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(120, 70, 20, 0, Math.PI * 2);
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(120, 90);
    ctx.lineTo(120, 150);
    ctx.stroke();
}

function drawLeftArm() {
    ctx.beginPath();
    ctx.moveTo(120, 110);
    ctx.lineTo(100, 130);
    ctx.stroke();
}

function drawRightArm() {
    ctx.beginPath();
    ctx.moveTo(120, 110);
    ctx.lineTo(140, 130);
    ctx.stroke();
}

function drawLeftLeg() {
    ctx.beginPath();
    ctx.moveTo(120, 150);
    ctx.lineTo(100, 180);
    ctx.stroke();
}

function drawRightLeg() {
    ctx.beginPath();
    ctx.moveTo(120, 150);
    ctx.lineTo(140, 180);
    ctx.stroke();
}

initializeGame();
// te reset
function resetGame() {
    initializeGame(); // Calls the initialize function to reset the game
}
