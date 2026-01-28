

const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];
let secretCode = [];
let currentGuess = [];
let attempts = 0;

function generateSecretCode() {
    secretCode = [];
    while (secretCode.length < 4) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        if (!secretCode.includes(color)) {
            secretCode.push(color);
        }
    }
    console.log("Secret Code:", secretCode);
}

function createColorOptions() {
    const colorOptions = document.getElementById("color-options");
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const div = document.createElement("div");
        div.classList.add("color");
        div.style.backgroundColor = color;
        div.onclick = () => selectColor(color);
        colorOptions.appendChild(div);
    }
}

function selectColor(color) {
    if (currentGuess.length < 4 && !currentGuess.includes(color)) {
        currentGuess.push(color);
        const guessContainer = document.getElementById("current-guess");
        guessContainer.innerHTML = '';
        currentGuess.forEach(color => {
            const div = document.createElement("div");
            div.classList.add("guess-slot");
            div.style.backgroundColor = color;
            guessContainer.appendChild(div);
        });
    }
}

function submitGuess() {
    if (currentGuess.length !== 4) {
        alert("בחר ארבע צבעים");
        return;
    }
    attempts++;
    const feedback = getFeedback(currentGuess);
    displayGuess(currentGuess, feedback);
    
    if (feedback.bulls === 4) {
        alert("ניחשת נכון");
        resetGame(); 
        return;
    }
    
    if (attempts >= 10) {
        alert("הגעת למספר הניסיונות המקסימלי, המשחק הסתיים.");
        resetGame();
        return;
    }
    
    currentGuess = [];
    const guessContainer = document.getElementById("current-guess");
    guessContainer.innerHTML = ''; 
}

function getFeedback(guess) {
    let bulls = 0, cows = 0;
    let secretCopy = [...secretCode];
    let guessCopy = [...guess];
    
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === secretCopy[i]) {
            bulls++;
            secretCopy[i] = guessCopy[i] = null;
        }
    }
    
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] && secretCopy.includes(guessCopy[i])) {
            cows++;
            secretCopy[secretCopy.indexOf(guessCopy[i])] = null;
        }
    }
    return { bulls, cows };
}

function displayGuess(guess, feedback) {
    const history = document.getElementById("guess-history");
    const guessDiv = document.createElement("div");
    guessDiv.classList.add("guess");
    
    guess.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.style.backgroundColor = color;
        guessDiv.appendChild(colorDiv);
    });
    
    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("feedback");



    for (let i = 0; i < 4; i++) {
        const feedbackCircle = document.createElement("span");
        feedbackCircle.style.backgroundColor = "grey"; 
        feedbackDiv.appendChild(feedbackCircle);
    }
    
   
    for (let i = 0; i < feedback.bulls; i++) {
        feedbackDiv.children[i].style.backgroundColor = "black"; 
    }
    for (let i = feedback.bulls; i < feedback.bulls + feedback.cows; i++) {
        feedbackDiv.children[i].style.backgroundColor = "white"; 
    }

    guessDiv.appendChild(feedbackDiv);
    history.appendChild(guessDiv);
}

function resetGame() {
    attempts = 0; 
    currentGuess = [];
    secretCode = [];
    document.getElementById("guess-history").innerHTML = '';
    document.getElementById("current-guess").innerHTML = '';
    generateSecretCode();
}

createColorOptions();
generateSecretCode();