const firstModal = document.getElementById('First-Modal');
const middleModal = document.getElementById('Middle-Modal');
const lastModal = document.getElementById('Last-Modal');
const difficulty = document.querySelector('.difficulty-modal');
const modal = document.querySelector('#choiceModal');
const cells = document.querySelectorAll('.cell');
const choiceButtons = document.querySelectorAll('.choice-btn');
const board = document.querySelector('#board');
const startButton = document.getElementById('startBtn');
const header = document.querySelector('.header');
const difficultySelect = document.querySelectorAll('.difficulty-btn');
const resultModal = document.getElementById('Result-Modal');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById("playAgainBtn");
const closeBtn = document.getElementById("closeBtn");
const blurOverlay = document.getElementById("blurOverlay");
let playerChoice='';
let computerChoice='';
let currentDifficulty = '';
let currentTurn = "Player";
let startingTurn = "";
let winner = "";
let gameActive = true;
console.log(getComputedStyle(firstModal).display);

document.addEventListener('DOMContentLoaded', function() {
    firstModal.style.display = '';
    header.style.display = 'block';
    middleModal.style.display = 'none'
    modal.style.display = 'none';
    difficulty.style.display = 'none';
    lastModal.style.display = 'none';
    resultModal.style.display ="none"
    board.style.display = 'none';
    console.log('Page is ready!');
    playAgainBtn.addEventListener('click', function (event) {
        gameActive = true; 
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove('x-cell');
            cell.classList.remove('o-cell');
        });
        board.style.display = 'grid';
        resultModal.style.display = "none"
        winner = "";

        if (startingTurn === "" || startingTurn === "Player") {
            startingTurn = "Computer";
        } else if (startingTurn === "Computer") {
            startingTurn = "Player";
        }

        if (startingTurn === "Computer") {
            setTimeout(() => {
                computerMove();
            }, 250);
        }

        console.log(startingTurn);
        console.log(`Difficulty level set to: ${selectedDifficulty}`);
    });
    closeBtn.addEventListener('click', function (event) {
        resetGame();
        resultModal.style.display = "none"
    })     
});
 
startButton.addEventListener('click', function() {
    firstModal.style.display = 'none';
    middleModal.style.display = '';
    modal.style.display = 'flex';
    difficulty.style.display = 'none';
    lastModal.style.display = 'none';
    console.log('Game started, please choose X or O');
});

choiceButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        modal.style.display = 'none';
        difficulty.style.display = 'flex';
        playerChoice = event.target.dataset.symbol;
        computerChoice = playerChoice === 'X' ? 'O' : 'X';
        console.log(`Player chose: ${playerChoice}`);
        console.log('Computer chose: ' + computerChoice);
    });
});

difficultySelect.forEach(button => {
    button.addEventListener('click', function () {
        lastModal.style.display = 'flex';
        board.style.display = 'grid';
        middleModal.style.display = 'none'
        const selectedDifficulty = button.dataset.difficulty;
        if (selectedDifficulty === 'easy') {
            currentDifficulty = 'easy';
        } else if (selectedDifficulty === 'medium') {
            currentDifficulty = 'medium';
        } else if (selectedDifficulty === 'hard') {
            currentDifficulty = 'hard';
        } else if (selectedDifficulty === 'impossible') {
            currentDifficulty = 'impossible';
        }
        lastModal.classList.remove(
            'easy-theme',
            'medium-theme',
            'hard-theme',
            'impossible-theme'
        );
        lastModal.classList.add(`${currentDifficulty}-theme`);
        console.log(lastModal.className);
        console.log(currentDifficulty, board.style.display);


    });
});

    
function loadPage(){
    gameActive = true;
    console.log("loadPage is Running");
    firstModal.style.display = ''
    header.style.display = 'block';
    middleModal.style.display = 'none';
    lastModal.style.display = 'none';
    console.log('Page is ready!');
};

function getEmptyCells() {
    console.log("getEmptyCells running")
    return Array.from(cells).filter(cell => cell.textContent === '');
}

function resetGame() {
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove('x-cell');
        cell.classList.remove('o-cell');
    });

    playerChoice = '';
    computerChoice = '';
    currentDifficulty = '';
    chosenCorner = null;
    winner = "";
    blurOverlay.style.display = "none";

    loadPage();
};

function Results(){
    blurOverlay.style.display = "block"
    resultModal.style.display = "flex";
}

let chosenCorner = null;
function forkAttack(){
    console.log("forkAttack is running");
    let corners = [0,2,6,8];
    corners.sort(() => Math.random() - 0.5);
    if (chosenCorner === null){
        chosenCorner = corners[0];
    };
    let oppositeCorner = 8 - chosenCorner;
    if (cells[chosenCorner].textContent === ""){
        return cells[chosenCorner].textContent = computerChoice;
    };
    if(cells[oppositeCorner].textContent === playerChoice){
        return false;
    }
    if(cells[chosenCorner].textContent === computerChoice && cells[oppositeCorner].textContent === ""){
       return cells[oppositeCorner].textContent = computerChoice;
    };
    for (let i = 0; i < corners.length; i++){
        if(cells[chosenCorner].textContent === computerChoice && cells[oppositeCorner].textContent === computerChoice && cells[corners[i]].textContent === ""){
            return cells[corners[i]].textContent = computerChoice;
        };
    };
}

function computerMove1() {
    console.log("computerMove1 runnning");
    const emptyCells = getEmptyCells();
    console.log("empty Cells:", emptyCells.length);
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = computerChoice;
    }
}

function checkWinner() {
     winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    console.log("checkWinner is running","winConditions length:",winConditions.length);
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && 
            cells[a].textContent === cells[b].textContent && 
            cells[a].textContent === cells[c].textContent) {
            
            console.log(`We have a winner! Player ${cells[a].textContent} wins!`);
            winner = cells[a].textContent;
            return winner;
        }
    }
    
    return null;
}

function isTie() {
    console.log("isTie is running");
    return Array.from(cells).every(cell => cell.textContent !== '') && !checkWinner();
}

function delayedResult(){
    setTimeout(() => {
        result();
    }, 250);
};

function winLoss() {
    winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    console.log("winLoss is running","winConditions:", winConditions.length);
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent === computerChoice
            && cells[a].textContent === cells[b].textContent
            && cells[c].textContent === '') {
            cells[c].textContent = computerChoice;
            return true;
        }
        else if (cells[a].textContent === computerChoice
            && cells[a].textContent === cells[c].textContent
            && cells[b].textContent === '') {
            cells[b].textContent = computerChoice;
            return true;
        }
        else if (cells[b].textContent === computerChoice
            && cells[b].textContent === cells[c].textContent
            && cells[a].textContent === '') {
            cells[a].textContent = computerChoice;
            return true;
        }};
    for (let condition of winConditions){
            const [a,b,c] = condition;
        if (cells[a].textContent === playerChoice
            && cells[a].textContent === cells[b].textContent
            && cells[c].textContent === '') {
            cells[c].textContent = computerChoice;
            return true;
            }
        else if (cells[a].textContent === playerChoice
            && cells[a].textContent === cells[c].textContent
            && cells[b].textContent === '') {
            cells[b].textContent = computerChoice;
            return true;
            }
        else if (cells[b].textContent === playerChoice
            && cells[b].textContent === cells[c].textContent
            && cells[a].textContent === '') {
            cells[a].textContent = computerChoice;
            return true;
            }
        }; return false;
}

function computerMove2() {
    console.log("computerMove2 is running");
    if (winLoss() === true){
        delayedResult();
        return;
    }
    computerMove1();
    delayedResult();
}
function computerMove3() {
    console.log("computerMove3 is running");
    let x = Array.from(cells).filter((cell, index) => {
        return [1, 3, 5, 7].includes(index);
    });
    let y = cells[4];
    console.log("x length:", x.length);
    x.sort(() => Math.random() - 0.5);
    if(winLoss() === true){
        return;
    }
    if (y.textContent === "") {
        return y.textContent = computerChoice;
    }
    for (let i = 0; i < x.length; i++ ) {
    if (x[i].textContent === ""){
        return x[i].textContent = computerChoice;
    }
    } computerMove1(); 
    
}

function computerMove4(){
    if (winLoss() === true){
        return;
    }
    if(startingTurn === "Computer" && forkAttack()){
        return;
    }

    let corners = Array.from(cells).filter((cell,index) => {
        return [0,2,6,8].includes(index);
    })
    let center = cells[4];
    let edges = Array.from(cells).filter((cell,index) => {
        return [1,3,5,7].includes(index);
    })
    corners.sort(() => Math.random() -0.5);
    if (center.textContent === "") {
        return center.textContent = computerChoice;
    }

    for(let i = 0; i < corners.length;i++){
        if(center.textContent === playerChoice && corners[i].textContent ===""){
        return corners[i].textContent = computerChoice;
        }
    }

    let forkConditionsCorners = [
        [0,4,1],
        [2,4,7],
        [6,4,1],
        [8,4,7],
    ];
    for (let forkc of forkConditionsCorners){
        const [a,b,c] = forkc;  
            if (cells[a].textContent === playerChoice && cells[b].textContent === computerChoice && cells[c].textContent === ""){
                return cells[c].textContent = computerChoice;  
            };
    };
    
    let forkConditionsEdges = [
        [1, 2],
        [3, 0],
        [5, 6],
        [7, 8],
    ];
    for (let forke of forkConditionsEdges){
        const [a,b] = forke;
            if (cells[a].textContent === playerChoice && cells[b].textContent === "" ){
                if (cells[b].textContent === ""){
               return cells[b].textContent = computerChoice;
                };
            };
    };

    for (let i = 0; i < corners.length; i++) {
        if (corners[i].textContent === "") {
            return corners[i].textContent = computerChoice;
        } else if(edges[i].textContent === ""){
            return edges[i].textContent = computerChoice;
        }
    }

}

function computerMove() {
    console.log("computerMove is running")
    if (currentDifficulty === 'easy') {
        computerMove1(); 
        delayedResult(); 
    } else if (currentDifficulty === 'medium') {
        computerMove2();
        delayedResult();
    } else if (currentDifficulty === 'hard'){
        computerMove3();
        delayedResult();
    } else if (currentDifficulty === 'impossible'){
        computerMove4();
        delayedResult();
    }   
     
}


function result() {
    console.log("result is running");
    console.log(winner);
    console.log("winner =", winner);
    console.log("playerChoice =", playerChoice);
    console.log("computerChoice =", computerChoice);
    console.log("Results type =", typeof Results);
    checkWinner();
    if (winner === playerChoice) {
        gameActive = false;
        resultText.textContent = "Player Wins!";
        Results();
        return;
    } else if (winner === computerChoice) {
        gameActive = false;
        resultText.textContent = "Computer Wins!";
        Results();
        return;
    }
    else if (isTie()) {
        gameActive = false;
        resultText.textContent = "Its A Draw!";
        Results();
        return;
    }
}


function turn() {
    console.log("turn is running");
    if (currentTurn === "Player") {
        currentTurn = "Computer"
        console.log(currentTurn);
        
        setTimeout(() => {
            result();
            turn();
        }, 250)

    } else if  (currentTurn === "Computer"){
        computerMove();
        currentTurn = "Player";
        console.log(currentTurn);


    } else {
        return;
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', function(){
        if (!gameActive) {
            return;
        }
        if (currentTurn === "Player" && cell.textContent === ""){
            cell.textContent = playerChoice;

            if(playerChoice === 'X') {
                cell.classList.add('x-cell');
            } else {
                cell.classList.add('o-cell');
            }
            turn();
        }
    })
})

