var board = document.getElementsByClassName('board')[0], // Игровое поле
    player = document.getElementsByClassName('gamer')[0], // Строка хода
    element, innerElement,
    gamer = true, // Показывает, какой игрок сейчас ходит, если true то крестики
    gameTable = [[null, null, null], [null, null, null], [null, null, null]], // Матрица игры
    nullCount = 9, // Кол-во оставшихся ходов
    countX = 0,
    count0 = 0,
    winner = null;

player.innerText = 'Сейчас ходит X';

// Генерация игрового поля
for (var i = 0; i < 9; i++) {
    element = document.createElement('div');
    element.classList.add('cell');
    innerElement = document.createElement('div');
    innerElement.classList.add('inner-cell');
    innerElement.onclick = tableClick;
	innerElement.setAttribute('x', (i % 3).toString());
    innerElement.setAttribute('y', parseInt(i / 3)	.toString());
    element.appendChild(innerElement);
	board.appendChild(element);
}
document.getElementsByClassName('button')[0].onclick = reset;
document.getElementsByClassName('score-button')[0].onclick = reset_scoreboard;

/**
 * Событие нажатие на ячейку
 */
function tableClick() {
    if (this.innerText == '') { //Проверка содержимого ячейки
        this.innerText = gamer ? 'X' : 'O';
        var y = this.getAttribute('y'), x = this.getAttribute('x');
        gameTable[y][x] = gamer;
        nullCount--;
        if ((gameTable[y][0] === gamer && gameTable[y][1] === gamer && gameTable[y][2] === gamer) ||
            (gameTable[0][x] === gamer && gameTable[1][x] === gamer && gameTable[2][x] === gamer) ||
            (gameTable[0][0] === gamer && gameTable[1][1] === gamer && gameTable[2][2] === gamer) ||
            (gameTable[2][0] === gamer && gameTable[1][1] === gamer && gameTable[0][2] === gamer)) {
            winner = gamer; 
        }
		
		
		
        gamer = !gamer;
        player.innerText = gamer ? 'Сейчас ходит X' : 'Сейчас ходит O';
        if (nullCount == 0 || winner !== null) {
            if (winner !== null) {
                scoreboard(winner);
                if (confirm('Победили ' + (winner ? 'X' : 'O') + '.\nЖелаете сыграть ещё?')) {
                    reset();
                }
            }
            else if (confirm('Игра закончилась в ничью.\nЖелаете сыграть ещё?')) {
                reset();
            }
        }
    }
    else {
        alert('Недопустимый ход');
    }
}

/**
 * Функция сброса параметров игры
 */
 
 
function reset() {
    gamer = true; // Показывает, какой игрок сейчас ходит
    gameTable = [[null, null, null], [null, null, null], [null, null, null]]; // Матрица игры
    nullCount = 9; // Кол-во оставшихся ходов
    winner = null;
    var table = document.getElementsByClassName('inner-cell');
    for (var i = 0; i < table.length; i++) {
        table[i].innerText = '';
    }
    player.innerText = 'Сейчас ходит X';
}

function scoreboard() {
    if (winner) {
        var table = document.getElementsByClassName('scoreX');
        for (var i = 0; i < table.length; i++) {
            table[i].innerText = ++countX;
        }    
    }
    else { 
        var table = document.getElementsByClassName('score0');
        for (var i = 0; i < table.length; i++) {
            table[i].innerText = ++count0;
        }    
    }
}

function reset_scoreboard() {
    reset();
    countX = 0;
    count0 = 0;
    var table1 = document.getElementsByClassName('scoreX');
    for (var i = 0; i < table1.length; i++) {
        table1[i].innerText = countX;
    }    
    var table2 = document.getElementsByClassName('score0');
    for (var i = 0; i < table2.length; i++) {
        table2[i].innerText = count0;
    }    
}