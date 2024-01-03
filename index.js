
let r0_c0, r0_c1, r0_c2;
let r1_c0, r1_c1, r1_c2;
let r2_c0, r2_c1, r2_c2;

// accéder les valeurs de chaque boutons
function acces_values() {
    r0_c0 = document.getElementById('r0-c0');
    r0_c1 = document.getElementById('r0-c1');
    r0_c2 = document.getElementById('r0-c2');

    r1_c0 = document.getElementById('r1-c0');
    r1_c1 = document.getElementById('r1-c1');
    r1_c2 = document.getElementById('r1-c2');

    r2_c0 = document.getElementById('r2-c0');
    r2_c1 = document.getElementById('r2-c1');
    r2_c2 = document.getElementById('r2-c2');
}

// Condition pour gagner
function winCondition() {
    const symbols = ['X', 'O'];
    acces_values();

    for (const symbol of symbols) {
        if (
            // condition row
            (r0_c0.textContent === symbol && r0_c1.textContent === symbol && r0_c2.textContent === symbol) || 
            (r1_c0.textContent === symbol && r1_c1.textContent === symbol && r1_c2.textContent === symbol) || 
            (r2_c0.textContent === symbol && r2_c1.textContent === symbol && r2_c2.textContent === symbol) ||
            // condition col
            (r0_c0.textContent === symbol && r1_c0.textContent === symbol && r2_c0.textContent === symbol) ||
            (r0_c1.textContent === symbol && r1_c1.textContent === symbol && r2_c1.textContent === symbol) || 
            (r0_c2.textContent === symbol && r1_c2.textContent === symbol && r2_c2.textContent === symbol) ||  

            // condition diag
            (r0_c0.textContent === symbol && r1_c1.textContent === symbol && r2_c2.textContent === symbol) ||
            (r0_c2.textContent === symbol && r1_c1.textContent === symbol && r2_c0.textContent === symbol)
        ){
            console.log(`The ${symbol} win the game!!`);
            return true;
        }
        
    }
    return false;
}

// Déroulement d'un match
let turn = 0;
const player1_symbol = 'X';
const player2_symbol = 'O';

function alternateTurns(event) {
    const button = event.target;
    turn += 1;
    // console.log(turn);

    if (winCondition()) {
        console.log(`Game over!!`)
    } else {
        let symbole_to_write = '';

        if (turn % 2 === 0) {
            symbole_to_write = player1_symbol;
            console.log(symbole_to_write);
        } else {
            symbole_to_write = player2_symbol;
            console.log(symbole_to_write);
        }

        button.textContent = symbole_to_write;
    }

}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        alternateTurns(event);
    });
});

