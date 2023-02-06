

const btn_chars = ["C", "+/-", "%", "÷", "7", "8","9", "×", 
"4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]
const operator_btns = new Set(["÷", "×", "-", "+", "="]);
const special_btns = new Set(["C", "+/-", "%"]);
let operand = 0;
let result = 0;
const display_label = document.querySelector("label");
display_label.appendChild(document.createTextNode(`${result}`));

/**
 * createBtnGrid generates the grid of buttons that will be on 
 * the calculator. There will be 19 buttons in total.
 * 
 */
function createBtnGrid(){

    const btn_grid = document.getElementById(`btn-grid`);

    for(c of btn_chars){
        let btn = document.createElement('button');
        let btn_content = document.createTextNode(`${c}`);
        btn.value = c;
        //add style to button
        addBtnClass(btn);
        //add event listeners to each button
        addBtnEventListener(btn, c);
        //add content to btn
        btn.appendChild(btn_content);

        //add btn to button section
        btn_grid.appendChild(btn);
    }
}

/**
 * addBtnClass will assign the proper css styling class to the 
 * button that is passed in as a parameter.
 * 
 */
function addBtnClass(button){
    //determines what class to give current btn
    if(operator_btns.has(c)){
        button.classList.add("operator");
    }
    else if(special_btns.has(c)){
        button.classList.add("special");
    } 
    if(c =="0"){
        button.classList.add(`zero`);
    }
}

function addBtnEventListener(button, button_char){
    //create cases for the kinds of buttons possible
    
    //button is decimal
    if(button_char == "."){

    }
    //button is a special button
    if(special_btns.has(button_char)){
        //assign the proper function to this button depending on char
    }
    //button is operator
    else if(operator_btns.has(button_char)){
        //assign the proper function to this button depending on char
    }
    //button is a number
    else{
        button.addEventListener("click", (e) =>{
            console.log(`${e.srcElement.value} was pressed`);
        })
    }

}


function updateResult(){
    display_label.removeChild
}

createBtnGrid();
