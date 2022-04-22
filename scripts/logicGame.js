export const loginGameFunction = () => {

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
    let activeUser = true; // if activeUser variable is true, therefore x user is active.

    // replay from first that user's pick X or O mark so that two user soccer is zero.
    const replayGameBtn = document.querySelector('.replay-game');

    //  Restart Button Handler
    const restartModal = document.querySelector('.restart-modal');
    const restartBackdrop = document.querySelector('.restart-backdrop');
    const cancelRestartBtn = restartModal.querySelector('button:nth-of-type(1)');
    const doneRestartBtn = restartModal.querySelector('button:nth-of-type(2)');

    const replayeBtnClickHandler = () => {
        restartModal.style.display = 'block';
        restartBackdrop.style.display = 'block';
    };

    const cancelRestartBtnHanler = () => {
        restartModal.style.display = 'none';
        restartBackdrop.style.display = 'none';
    };

    const doneRestartBtnHanler = () => {
        restartModal.style.display = 'none';
        restartBackdrop.style.display = 'none';
        document.location.reload(true);
    };

    cancelRestartBtn.addEventListener('click', cancelRestartBtnHanler);
    doneRestartBtn.addEventListener('click', doneRestartBtnHanler);

    replayGameBtn.addEventListener('click', replayeBtnClickHandler);

    let gameArray = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

    let numberPicked = 0;  // sum of numberinf of picked of two user.

    const checkWinnerAllRows = chr => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(gameArray[i][j] !== chr) {
                    break;
                }
                if(j === 2) {
                    return i;
                }
            }
        }
        return -1; // show winner not exist in i row.
    };

    const checkWinnerAllCols = chr => {
        for(let j = 0; j < 3; j++) {
            for(let i = 0; i < 3; i++) {
                if(gameArray[i][j] !== chr) {
                    break;
                }
                if(i === 2) {
                    return j;
                }
            }
        }
        return -1;  // show winner not exist in i column.
    };

    const checkWinnerAllDiagnal = chr => {
        let numDiagnol = 0;
        let numAntiDiagnol = 0;

        for(let i = 0; i < 3; i++) {
            if(gameArray[i][i] !== chr) {
                break;
            }
            numDiagnol++;
        }

        for(let i = 2; i >= 0; i--) {
            if(gameArray[2 - i][i] !== chr) {
                break;
            }
            numAntiDiagnol++;
        }

        if(numDiagnol === 3) {
            return 'Diagonal';
        } else if(numAntiDiagnol === 3) {
            return 'AntiDiagnol';
        } else {
            return -1;
        }
    };

    // handle modal for winner modal show to user.

    const modalWinner = document.querySelector('.modal-winner');
    const backdrop = document.querySelector('.backdrop');
    const quitModalBtn = modalWinner.querySelector('button:nth-of-type(1)');
    const nextRoundModalBtn = modalWinner.querySelector('button:nth-of-type(2)');

    // button quit and next-round of modal is handled in below
    const showWinnerModal = markType => {
        const markWinnerModal = modalWinner.querySelector('p span');
        if(markType === 'x') {
            markWinnerModal.innerHTML = '<i class="fa fa-close"></i>';
        } else if(markType === 'o') {
            markWinnerModal.innerHTML = '<i class="fa fa-dot-circle-o"></i>';
        } else {
            modalWinner.querySelector('p').innerHTML = 'The game equalised'
        }

        modalWinner.style.display = 'block';
        backdrop.style.display = 'block';
    };

    const quitModalBtnHandler = () => {
        document.location.reload(true);
    };

    const nextRoundModalBtnHandler = () => {
        gameArray = gameArray.map((elm) => {
            return ['-', '-', '-'];
        });

        numberPicked = 0;

        modalWinner.style.display = 'none';
        backdrop.style.display = 'none';

        for (const box of gameBoxs) {
            box.innerHTML = '';
            box.classList.replace('game-box-item-winned', 'game-box-item');
            box.addEventListener('click', boxClickedHandler);
        }
    };

    quitModalBtn.addEventListener('click', quitModalBtnHandler);
    nextRoundModalBtn.addEventListener('click', nextRoundModalBtnHandler);

    const updateScoreWinner = markType => {
        const scoreGameMarkType = document.querySelectorAll('.score-game button');
        if(markType === 'x') {
            +scoreGameMarkType[0].querySelector('p').innerHTML++;
        } else if(markType === 'o') {
            +scoreGameMarkType[2].querySelector('p').innerHTML++;
        } else {
            +scoreGameMarkType[1].querySelector('p').innerHTML++;
        }
    };

    const highliteWinnerUi = (whereWin) => {
        if(whereWin === 'Diagonal') {
            for(let i = 0; i < 3; i++) {
                document.getElementById(`${i}${i}`).classList.replace('game-box-item','game-box-item-winned');
            }
        } else if(whereWin === 'AntiDiagnol') {
            for(let i = 2; i >= 0; i--) {
                document.getElementById(`${2 - i}${i}`).classList.replace('game-box-item','game-box-item-winned');
            }
        } else {
            let whereWinArr = whereWin.split(' ');
            let whereWinNumber = whereWinArr[1];
            if(whereWinArr.includes('row')) {
                for(let i = 0; i < 3; i++) {
                    document.getElementById(`${whereWinNumber}${i}`).classList.replace('game-box-item','game-box-item-winned');
                }
            } else if(whereWinArr.includes('col')) {
                for(let i = 0; i < 3; i++) {
                    document.getElementById(`${i}${whereWinNumber}`).classList.replace('game-box-item','game-box-item-winned');
                }
            }
        }
    };

    const pickWinnerUser = (markType) => {
        if(numberPicked < 5) {
            return;
        }
        console.log(numberPicked);
        let rowWinner = checkWinnerAllRows(markType);  // attention that row start from 0
        let colWinner = checkWinnerAllCols(markType);  // attention that col start from 0
        let diagnalWin = checkWinnerAllDiagnal(markType);

        if(rowWinner !== -1) {
            highliteWinnerUi(`row ${rowWinner}`);
            updateScoreWinner(markType);
            showWinnerModal(markType);
        } else if(colWinner !== -1) {
            highliteWinnerUi(`col ${colWinner}`);
            updateScoreWinner(markType);
            showWinnerModal(markType);
        } else if(diagnalWin !== -1) {
            highliteWinnerUi(diagnalWin);
            updateScoreWinner(markType);
            showWinnerModal(markType);
        } else {
            if(numberPicked === 9) {
                updateScoreWinner();
                showWinnerModal();
            }
        }
    };

    const boxClickedHandler = event => {
        console.log('clicke');
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

        // run below function for recogonize winner
        pickWinnerUser(markType);

        // event is deleted after that it is one time occured.
        event.currentTarget.removeEventListener('click', boxClickedHandler);
    };

    for (const box of gameBoxs) {
        box.addEventListener('click', boxClickedHandler);
    }

}