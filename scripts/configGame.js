// reset local storage for starting or replaying game
localStorage.clear();

let player1Mark;
let pickePlayerType;

const container = document.querySelector('.container');
const xMarkButton = document.querySelector('.x-shape');
const oMarkButton = document.querySelector('.o-shape');

const xMarkButtonClickHandler = () => {
    oMarkButton.style['background-color'] = '#2d5364';
    oMarkButton.style.color = '#2fc4be';
    xMarkButton.style['background-color'] = '#2fc461';
    xMarkButton.style.color = '#192a32';
    player1Mark = 'x';
    localStorage.setItem('player1Mark', player1Mark);
};

const oMarkButtonClickHandler = () => {
    xMarkButton.style['background-color'] = '#2d5364';
    xMarkButton.style.color = '#f2b237';
    oMarkButton.style['background-color'] = '#2fc461';
    oMarkButton.style.color = '#192a32';
    player1Mark = 'o';
    localStorage.setItem('player1Mark', player1Mark);
};

xMarkButton.addEventListener('click', xMarkButtonClickHandler);
oMarkButton.addEventListener('click', oMarkButtonClickHandler);

// pick user rival for gaming with you (these two below const is for when i want to mount cpu player)!AFTER!
const cpuRivalButton = document.querySelector('.pick-rival :first-child');
const userRivalButton = document.querySelector('.pick-rival :last-child');

userRivalButton.addEventListener('click', event => {
    let playerType = event.target.textContent.trim().replace('New Game VS ', '');
    pickePlayerType = playerType;
    localStorage.setItem('pickeRivalType', pickePlayerType);
    console.log('clicked');
    if(player1Mark) {
        container.innerHTML = gamePageHTML;
        pageStyleSheet.href = './styles/gameStyle.css';
        // dynamically import logicGame.js script
        import('./logicGame.js')
            .then(module => {
                module.loginGameFunction();
            });
    }
});


//  select variable of styleSheet and container div html, for changing these; when user pick start game.
const pageStyleSheet = document.head.querySelector('link:nth-of-type(1)');
const gamePageHTML = `
    <div class="app">
        <div class="header-app">
            <div class="shaped">
                <i class="fa fa-close"></i>
                <i class="fa fa-dot-circle-o"></i>
            </div>
            <button class="active-user">
                <i class="fa fa-close"></i> Turn
            </button>
            <button class="replay-game">
                <i class="fa fa-repeat"></i>
            </button>
        </div>
        <div class="restart-backdrop">

        </div>
        <div class="restart-modal">
            <p>RESTART GAME?</p>
            <button>Cancel</button>
            <button>Restart</button>
        </div>
        <div class="game-box">
            <div class="game-box-item" id="00"></div>
            <div class="game-box-item" id="01"></div>
            <div class="game-box-item" id="02"></div>
            <div class="game-box-item" id="10"></div>
            <div class="game-box-item" id="11"></div>
            <div class="game-box-item" id="12"></div>
            <div class="game-box-item" id="20"></div>
            <div class="game-box-item" id="21"></div>
            <div class="game-box-item" id="22"></div>
        </div>
        <div class="score-game">
            <button>
                <i class="fa fa-close"></i>
                <p>0</p>
            </button>
            <button>
                Ties
                <p>0</p>
            </button>
            <button>
                <i class="fa fa-dot-circle-o"></i>
                <p>0</p>
            </button>
        </div>
    </div>
    <!-- backdrop and modal for show winner to user -->
    <div class="backdrop"></div>
    <div class="modal-winner">
    <p><span>x</span> TAKES THE ROUND</p>
    <button>Quit</button>
    <button>Next Round</button>
    </div>
`;