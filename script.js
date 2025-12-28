let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnText = e.target.innerHTML;

        if(btnText == '='){
            try {
                // Evaluates the math string
                string = eval(string);
                input.value = string;
            } catch (error) {
                input.value = "Error";
                string = "";
            }
        }
        else if(btnText == 'AC'){
            string = "";
            input.value = string;
        }
        else if(btnText == 'DEL'){
            string = string.toString().substring(0, string.length - 1);
            input.value = string;
        }
        // Scientific Logic
        else if(btnText == 'sin'){
            input.value = Math.sin(parseFloat(input.value) * Math.PI / 180).toFixed(4);
            string = input.value;
        }
        else if(btnText == 'cos'){
            input.value = Math.cos(parseFloat(input.value) * Math.PI / 180).toFixed(4);
            string = input.value;
        }
        else if(btnText == 'tan'){
            input.value = Math.tan(parseFloat(input.value) * Math.PI / 180).toFixed(4);
            string = input.value;
        }
        else if(btnText == '√'){
            input.value = Math.sqrt(parseFloat(input.value)).toFixed(4);
            string = input.value;
        }
        else{
            string += btnText;
            input.value = string;
        }
    })
});