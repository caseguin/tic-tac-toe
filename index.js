// Condition pour gagner
function winCondition() {
    const symbols = ['X', 'O'];
    const win_conditions = [
                // Rows
                ['r0_c0', 'r0_c1', 'r0_c2'],
                ['r1_c0', 'r1_c1', 'r1_c2'],
                ['r2_c0', 'r2_c1', 'r2_c2'],
                // Columns
                ['r0_c0', 'r1_c0', 'r2_c0'],
                ['r0_c1', 'r1_c1', 'r2_c1'],
                ['r0_c2', 'r1_c2', 'r2_c2'],
                // Diagonals
                ['r0_c0', 'r1_c1', 'r2_c2'],
                ['r0_c2', 'r1_c1', 'r2_c0']
    ]

    for (const symbol of symbols) {
        for (const condition of win_conditions) {
            const [var1, var2, var3] = condition;
            if (
                document.getElementById(var1).textContent === symbol &&
                document.getElementById(var2).textContent === symbol &&
                document.getElementById(var3).textContent === symbol                
            ) {
                return {result: true, symbol, variables: [var1, var2, var3]};
            }
        }
        
    }
    return {result: false, symbol: null, variables: []};
}



// Condition de null
function nullCondition() {
    const gridElements = document.querySelectorAll('.button');

    for (const element of gridElements) {
        if (element.textContent === '') {
            return false;
        }
    }

    return true;
}



// Bouton rematch
function newGame(){
    // Enlever le texte de la grille
    const gridElements = document.querySelectorAll('.button');
    for (element of gridElements) {
        element.textContent = '';
        element.style.backgroundColor = ''; 
    }

    if (narrator_element) {
        narrator_element.innerHTML = `Let's begin this game! <br> Player 1, please choose a cell`;
        narrator_element.style.color = '';
    }
}




// Déroulement d'un match
let turn = -1;
const player1_symbol = 'X';
const player2_symbol = 'O';
const narrator_element = document.getElementById('narrator');

// fonction de déroulement du match
function alternateTurns(event) {
    const button = event.target;

    if (button.textContent !== '') {
        return;
    }

    turn += 1;

    const win_result = winCondition();
    if (win_result.result) {
        return;
    
    } else if (nullCondition()) {
        return;

    } else {
        let symbole_to_write = '';

        if (turn % 2 === 0) {
            symbole_to_write = player1_symbol;
            if (narrator_element) {

                narrator_element.innerHTML = 'Player 2, choose a cell';
            }
            
        } else {
            symbole_to_write = player2_symbol;
            if (narrator_element) {
                narrator_element.innerHTML = 'Player 1, choose a cell';
            }
        }

        button.textContent = symbole_to_write;
    }

}

// Gestion des events
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        alternateTurns(event);

        const win_result = winCondition()

        if (win_result.result) {

            if (narrator_element) {
                narrator_element.innerHTML = `GAME OVER!! Les ${win_result.symbol} ont gagné!!`;
                narrator_element.style.color = 'red';
            }

            for (variable of win_result.variables) {
                const wining_button = document.getElementById(variable);
                wining_button.style.backgroundColor = 'red';
            }

            confetti({
                particleCount: 1500,
                spread: 500,
                startVelocity: 40,
                scalar: 0.9,
                ticks: 100
            })

        } else if (nullCondition()) {
            console.log('NULL, Nobody win');

            if (narrator_element) {
                narrator_element.innerHTML = `Partie null...`;
                narrator_element.style.color = 'red';
            }

        } else {}
    });
});
