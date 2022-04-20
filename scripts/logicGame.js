const user1 = localStorage.getItem('player1Mark');
let user2;

if(user1 === 'x') {
    user2 = 'o';    
} else if(user1 === 'o') {
    user2 = 'x';
}

const player2Type = localStorage.getItem('pickeRivalType');

const gameBoxs = document.querySelectorAll('.game-box-item');
const activeUserBtn = document.querySelector('.active-user');
let activeUser = true; // if activeUser variable is true x user is active.


// replay from first that user's pick X or O mark so that two user soccer is zero.
const replayGameBtn = document.querySelector('.replay-game');

const replayeBtnClickHandler = () => {
    console.log('clicked');
    history.back();
};

replayGameBtn.addEventListener('click', replayeBtnClickHandler);

let gameArray = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

let numberPicked = 0;

const checkWinnerAllRows = chr => {
    for (let i = 0; i < 3; i++) {
        let num = 0;
        for (let j = 0; j < 3; j++) {
            num++;
            if(gameArray[i][j] !== chr) {
                break;
            }
        }
        if(num === 3) {
            return i;  //number row that is winn.
        }
    }
    return -1; // show winner not exist in i row
};

const checkWinnerAllCols = chr => {
    for(let j = 0; j < 3; j++) {
        let num = 0;
        for(let i = 0; i < 3; i++) {
            num++;
            if(gameArray[i][j] !== chr) {
                break;
            }
        }
        if(num === 3) {
            return j;  //number column that is win.
        }
    }
    return -1;
};

const checkWinnerAllDiagnal = chr => {
    // for (let i = 0; i < 3; i++) {
    //     let num = 0;
    //     for(let j = 0; j < 3; j++) {
    //         num++;
    //         if(gameArray[i][j] !== chr || i !== j) {
    //             break;
    //         }
    //     }
    //     if(num === 3) {
    //         return 'diagnal';
    //     }
    // }
    // return -1;
    let numDiagnol = 0;
    for(let i = 0; i < 3; i++) {
        numDiagnol++;
        if(gameArray[i][i] !== chr) {
            break;
        }
    }
    
    let numAntiDiagnol = 0;
    for(let i = 2; i >= 0; i--) {
        numAntiDiagnol++;
        if(gameArray[2 - i][i] !== chr) {
            break;
        }
    }

    if(numDiagnol === 3) {
        return 'Diagonal row';
    } else if(numAntiDiagnol === 3) {
        return 'AntiDiagnol row';
    } else {
        return -1;
    }
};

const showWinnerBoxUi = (winlocate) => {
    
}

const pickWinnerUser = (markType) => {
    if(numberPicked < 5) {
        return;
    }
    
    let rowWinner = checkWinnerAllRows(markType);  // attention that row start from 0
    if(rowWinner !== -1) {
        // showUiWinnerBox(rowWinner);
        console.log('roe', rowWinner);
    }

    let colWinner = checkWinnerAllCols(markType);  // attention that col start from 0
    if(colWinner !== -1) {
        console.log('column', colWinner);
    }

    let diagnalWin = checkWinnerAllDiagnal(markType);
    console.log(diagnalWin);
    // if(diagnalWin !== -1) {
    //     console.log('win is diagnol row');
    // }

};

const boxClickedHandler = event => {
    numberPicked++;
    let markType = activeUser ? 'x' : 'o';

    // Update active user btn in header app
    if (activeUser && user1) {
        activeUserBtn.innerHTML = '<i class="fa fa-dot-circle-o"></i> Turn';
        event.target.innerHTML = '<i class="fa fa-close"></i>';
    } else if(!activeUser, user1) {
        activeUserBtn.innerHTML = '<i class="fa fa-close"></i> Turn';
        event.target.innerHTML = '<i class="fa fa-dot-circle-o"></i>';
    }
    activeUser = !activeUser;

    // create gameArray and update it with x and o
    let btnClickedId = event.target.id;
    let rowId = btnClickedId[0];
    let colId = btnClickedId[1];
    gameArray[rowId][colId] = markType;

    //run nelow function for recogonize winner
    pickWinnerUser(markType);
    event.currentTarget.removeEventListener('click', boxClickedHandler);
};

for (const box of gameBoxs) {
    box.addEventListener('click', boxClickedHandler);
}
