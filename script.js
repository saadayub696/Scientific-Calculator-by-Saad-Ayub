let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');
let historyOverlay = document.getElementById('history-overlay');
let historyList = document.getElementById('history-list');

let string = "";

// Helper: Add entries to history popup
function addToHistory(exp, res) {
    let div = document.createElement('div');
    div.classList.add('history-item');
    div.innerHTML = `${exp} = <strong>${res}</strong>`;
    historyList.prepend(div);
}

Array.from(buttons).forEach(button => {
    button.addEventListener('click', (e) => {
        let btnText = e.target.innerText;

        // 1. System Button Logic
        if (btnText === 'H') {
            historyOverlay.classList.remove('hidden');
            return;
        }
        if (btnText === 'Clear History' || btnText === '×') {
            return; // Ignore these for math string
        }

        // 2. Math Logic
        if(btnText == '='){
            try {
                let expression = string;
                string = eval(string);
                input.value = string;
                addToHistory(expression, string);
            } catch {
                input.value = "Error";
                string = "";
            }
        }
        else if(btnText == 'AC'){
            string = "";
            input.value = string;
        }
        else if(btnText == 'DEL'){
            string = string.toString().slice(0, -1);
            input.value = string;
        }
        else if(['sin', 'cos', 'tan', '√'].includes(btnText)){
            let val = parseFloat(input.value);
            if(isNaN(val)) return;

            let res;
            if(btnText == 'sin') res = Math.sin(val * Math.PI / 180);
            else if(btnText == 'cos') res = Math.cos(val * Math.PI / 180);
            else if(btnText == 'tan') res = Math.tan(val * Math.PI / 180);
            else res = Math.sqrt(val);
            
            let finalRes = res.toFixed(4);
            addToHistory(`${btnText}(${val})`, finalRes);
            input.value = finalRes;
            string = finalRes;
        }
        else {
            string += btnText;
            input.value = string;
        }
    })
});

// History Popup Controls
document.getElementById('close-history').addEventListener('click', () => {
    historyOverlay.classList.add('hidden');
});

document.getElementById('clear-history').addEventListener('click', () => {
    historyList.innerHTML = "";
});