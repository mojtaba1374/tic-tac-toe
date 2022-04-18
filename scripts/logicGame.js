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

let gameArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// const diagnoseWinner = () => {
//     if(gameArray)
// }

const boxClickedHandler = event => {
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
    let markType = activeUser ? 'o' : 'x';
    console.log(markType);
    btnClickedId = event.target.id;
    switch (btnClickedId) {
        case '1':
            gameArray[0][0] = markType;
            break;
        case '2':
            gameArray[0][1] = markType;
            break;
        case '3':
            gameArray[0][2] = markType;
            break;
        case '4':
            gameArray[1][0] = markType;
            break;
        case '5':
            gameArray[1][1] = markType;
            break;
        case '6':
            gameArray[1][2] = markType;
            break;
        case '7':
            gameArray[2][0] = markType;
            break;
        case '8':
            gameArray[2][1] = markType;
            break;
        case '9':
            gameArray[2][2] = markType;
            break;
        default:
            break;
    }
    event.currentTarget.removeEventListener('click', boxClickedHandler);
};

for (const box of gameBoxs) {
    box.addEventListener('click', boxClickedHandler);
}
