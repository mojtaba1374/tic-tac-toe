// reset local storage for starting or replaying game
localStorage.clear();

let player1Mark;
let player2Mark;

const xMarkButton = document.querySelector('.x-shape');
const oMarkButton = document.querySelector('.o-shape');

const xMarkButtonClickHandler = () => {
    oMarkButton.style['background-color'] = '#2d5364';
    oMarkButton.style.color = '#2fc4be';
    xMarkButton.style['background-color'] = '#2fc461';
    xMarkButton.style.color = '#192a32';
    player1Mark = 'x';
    player2Mark = 'o';
    localStorage.setItem('player1Mark', player1Mark);
    localStorage.setItem('player2Mark', player2Mark);
};

const oMarkButtonClickHandler = () => {
    xMarkButton.style['background-color'] = '#2d5364';
    xMarkButton.style.color = '#2fc4be';
    oMarkButton.style['background-color'] = '#2fc461';
    oMarkButton.style.color = '#192a32';
    player1Mark = 'o';
    player2Mark = 'x';
    localStorage.setItem('player1Mark', player1Mark);
    localStorage.setItem('player2Mark', player2Mark);
};

xMarkButton.addEventListener('click', xMarkButtonClickHandler);
oMarkButton.addEventListener('click', oMarkButtonClickHandler);

let pickePlayerType;

const pickrivalContainer = document.querySelectorAll('.pick-rival button');

console.log(pickrivalContainer);

for (const button of pickrivalContainer) {
    button.addEventListener('click', event => {
        let playerType = event.target.textContent.trim().replace('New Game VS ', '');
        pickePlayerType = playerType;
        localStorage.setItem('pickeRivalType', pickePlayerType);
    });
}

