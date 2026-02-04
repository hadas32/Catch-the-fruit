if (!JSON.parse(localStorage.getItem("currentUser"))) {
    alert("עליך להתחבר כדי לשחק.");
    window.location.href = "login.html"
}
let divArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
let easy = ["פצצה.png", "בננה.png", "תפוז.png", "תפוח.png", "בננה 2.png", "תפוז 2.png", "תפוח 2.png", "בננה.png", "תפוז.png", "תפוח.png"]
let normal = ["פצצה.png", "בננה 2.png", "תפוז 2.png", "תפוח 2.png", "בננה 2.png", "תפוז 2.png", "תפוח 2.png", "בננה.png", "תפוז.png", "תפוח.png"]
let hard = ["פצצה.png", "פצצה.png", "בננה 2.png", "תפוז 2.png", "תפוח 2.png", "בננה 2.png", "תפוז 2.png", "תפוח 2.png", "בננה.png", "תפוז.png", "תפוח.png"]

let interval, timer;
let outerDiv = document.querySelector('.game')
let points = 0;
let currentLevel = "קל"; 

let timeLeft = 180;
let timerDisplay = document.getElementById('timer');
let sumPoints = document.querySelector('.sumPoints');
let timerInterval
//יצירת לוח המשחק
for (let i = 0; i < divArr.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = divArr[i]
    newDiv.classList.add('coulmn')
    outerDiv.append(newDiv)
}
//תחילת משחק לפי הרמה שנבחרה
function startGame(event) {
    clearInterval(interval);
    clearInterval(timer);
    let speed = 0
    let fruits = []
    points = 0;
    timeLeft = 180;
    sumPoints.style.height = points + 'px';
    updatePoints();
    if (typeof event === 'string') {
        currentLevel = event;
    } else {
        currentLevel = event.target.innerText;
    }

    if (currentLevel === "קל") {
        fruits = [...easy];
        speed = 2000;
        sumPoints.style.backgroundColor = "#FFED26";
    } else if (currentLevel === "בינוני") {
        fruits = [...normal];
        speed = 1500;
        sumPoints.style.backgroundColor = "#00ACC9";
    } else if (currentLevel === "קשה") {
        fruits = [...hard];
        speed = 1000;
        sumPoints.style.backgroundColor = "#FE8917";
    }
    Timer();
    interval = setInterval(() => {
        let location = getRandomInt(divArr.length);
        let fru = getRandomInt(fruits.length);
        let img = document.createElement('img')
        img.src = `../pictures/${fruits[fru]}`;
        img.setAttribute('data-name', fruits[fru]);
        let selectDiv = document.getElementById(divArr[location]);
        selectDiv.append(img);
        //זמן ירידת הפירות ובדיקה אם תפס
        setTimeout(() => {
            checkCatch(img);
            img.remove();
            if (points < 0) {
                clearInterval(interval);
                clearInterval(timer);
                showModal('lose')
            }
        }, 3500);
        //העלמת הפרי בזמן שהשחקן תפס
        let fallCheck = setInterval(() => {
            if (checkCatch(img)) {
                clearInterval(fallCheck);
                img.remove();
            }
        }, 100);

    }, speed)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//שימוש בחיצי המשחק
document.addEventListener('keydown', (event) => {
    let player = document.querySelector('.player');
    let step = 15;
    let currentLeft = parseInt(getComputedStyle(player).left, 10);
    let gameWidth = document.querySelector('.game').offsetWidth;
    let playerWidth = 90
    if (event.key === 'ArrowRight' && (currentLeft + step <= gameWidth - playerWidth)) {
        player.style.backgroundImage = 'url(../pictures/right.png)';
        player.style.left = (currentLeft + step) + 'px';
    }
    if (event.key === 'ArrowLeft' && (currentLeft - step > 110)) {
        player.style.backgroundImage = 'url(../pictures/left.png)';
        player.style.left = (currentLeft - step) + 'px';
    }
});
//בדיקה איזה פרי השחקן תפס
function checkCatch(fruit) {
    let player = document.querySelector('.player');
    let playerPlace = player.getBoundingClientRect();
    let fruitPlace = fruit.getBoundingClientRect();

    let touchingFromLeft = fruitPlace.right >= playerPlace.left;
    let touchingFromRight = fruitPlace.left <= playerPlace.right;
    let touchingFromTop = fruitPlace.bottom >= playerPlace.top;

    if (touchingFromLeft && touchingFromRight && touchingFromTop) {
        let fruitName = fruit.getAttribute('data-name');
        if (fruitName.includes("פצצה")) {
            if (timeLeft > 60)
                timeLeft -= 60;
            else
                timeLeft = 0;
        } else if (fruitName.includes("2")) {
            points -= 10;
        } else {
            points += 15;
        }
        updatePoints();
        return true;
    }
    return false;
}
//עדכון נקודות
function updatePoints() {
    let maxHeight = document.querySelector('.points').offsetHeight;
    let newHeight = points * 2;
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        endGame();
    }
    sumPoints.style.height = newHeight + 'px';
}
//זמן משחק
function Timer() {
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 60 && timeLeft > 10) {
            timerDisplay.style.color = "orange";
        } else if (timeLeft <= 10) {
            if (timeLeft % 2 === 0) {
                timerDisplay.style.color = "red";
            } else {
                timerDisplay.style.color = "";
            }
        } else {
            timerDisplay.style.color = "";
        }

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            clearInterval(interval);
            showModal('nowin', "!זמנך תם")
        }
    }, 1000);
}
//סוף שלב
function endGame() {
    if (currentLevel === "קל") {
        showModal('win', "כל הכבוד! עברת לבינוני", 'בינוני');
    } else if (currentLevel === "בינוני") {
        showModal('win', "תותח! עברת לקשה", 'קשה');
    } else {
        showModal('win', "סיימת את כל השלבים! המשך לצבור נקודות", 'קשה');
    }
}
//הודעות ניצחון והפסד
function showModal(type, txt) {
    clearInterval(timerInterval);
    clearInterval(interval);
    const cUser = JSON.parse(localStorage.getItem("currentUser"));
    const playerName = cUser.name;
    if (type === 'win') {
        document.getElementById('playerNameWin').innerText = playerName;
        document.getElementById('scoreWin').innerText = points;
        document.getElementById('winModal').style.display = 'block';
        document.getElementById('txt').innerHTML = txt;
    } else {
        document.getElementById('playerNameLose').innerText = playerName;
        document.getElementById('scoreLose').innerText = points;
        document.getElementById('loseModal').style.display = 'block';
        document.getElementById('txt').innerHTML = txt;
    }
}
//סגירת הודעה
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
//מעבר לשלה בהא
function closeWin(winModal) {
    closeModal(winModal);
    if (currentLevel === "קל") {
        startGame("בינוני");
    } else {
        startGame("קשה");
    }

}
