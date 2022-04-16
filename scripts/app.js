const user1 = prompt('please enter your type among * and +', '*');

let user2;

if (user1 === '*') {
    user2 = '+';
} else if(user1 === '+') {
    user2 = '*';
}

const gameBoxs = document.querySelectorAll('.game-box-item');

let arrayBoxId = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const createRandomId = () => {
    return (Math.floor((Math.random() * 9)) + 1);
}

const clickBoxCpuUserHandler = () => {

    let randomId = createRandomId();
    while(!arrayBoxId.includes(randomId)) {
        randomId = createRandomId();
    }
    
    const index = arrayBoxId.indexOf(randomId);
    if (index > -1) {
        arrayBoxId.splice(index, 1);
    }

    const boxCpuUser = document.getElementById(`box${randomId}`);

    setTimeout(() => {
        if(user2 === '*') {
            boxCpuUser.innerHTML = '*';
        } else if(user2 === '+') {
            boxCpuUser.innerHTML = '+';
        }
        console.log(randomId);
    }, 1500);
}

const clickBoxOneUserHandler = event => {
    let boxId = event.target.id;
    let numberedId = +boxId.charAt(boxId.length - 1);

    const index = arrayBoxId.indexOf(numberedId);
    if (index > -1) {
        arrayBoxId.splice(index, 1);
    }

    if(user1 === '*') {
        event.target.innerHTML = '*';
    } else if(user1 === '+') {
        event.target.innerHTML = '+';
    }
    clickBoxCpuUserHandler();
};

for (const box of gameBoxs) {
    box.addEventListener('click', clickBoxOneUserHandler);
}

