import { calculator } from "./calculator.js";
const calc = new calculator();
const btn_chars = ["C", "+/-", "%", "÷", "7", "8","9", "×", 
"4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
const operator_btns = new Set(["÷", "×", "-", "+", "="]);
const special_btns = new Set(["C", "+/-", "%"]);
const current_num = document.getElementById('current-num');
let operand1 = '';
let operant2 = '';
let operator = null;


current_num.appendChild(document.createTextNode(`0`));

/**
 * createBtnGrid generates the grid of buttons that will be on 
 * the calculator. There will be 19 buttons in total.
 * 
 */
function createBtnGrid(){

    const btn_grid = document.getElementById(`btn-grid`);

    for(let c of btn_chars){
        let btn = document.createElement('button');
        let btn_content = document.createTextNode(`${c}`);
        btn.value = c;
        //add style to button
        addBtnClass(btn, c);
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
function addBtnClass(button, button_char){
    //determines what class to give current btn
    if(operator_btns.has(button_char)){
        button.classList.add("operator");
    }
    else if(special_btns.has(button_char)){
        button.classList.add("special");
    } 
    if(button_char =="0"){
        button.classList.add(`zero`);
    }
}

function addBtnEventListener(button, button_char){
    //create cases for the kinds of buttons possible
    
    //button is decimal
    if(button_char == "."){
        button.addEventListener('click', appendDecimal);
    }
    //button is a special button
    else if(special_btns.has(button_char)){
        specialListeners(button, button_char);
    }
    //button is operator
    else if(operator_btns.has(button_char)){
        //assign the proper function to this button depending on char
    }
    //button is a number
    else{
        button.addEventListener("click", appendDigit);
    }
}

function specialListeners(button, button_char){
    //assign the proper function to this button depending on char
    if(button_char === "C"){
        button.addEventListener('click', reset);
    }
    else if(button_char == "+/-"){
        button.addEventListener('click', oppositeSign);
    }
    else if(button_char == "%"){
        button.addEventListener('click', percent);
    }
    else{
        console.error('Unknow button was clicked');
    }
}


/**
 * percent will give the percentage value of the 
 * current number (current_num). I.e it will divide the displayed number by 100
 * 
 */
function percent(){
    let curr_num_content = current_num.textContent;
    const res = calc.percentage(Number(curr_num_content));
    clearCurrentNum();
    current_num.appendChild(document.createTextNode(res));
}

/**
 * oppositeSign check the sign of the current number displayed
 * If the number is positive, the number will become negative
 * if the number is negative, the number will become positive
 */
function oppositeSign(){
    //check if "-" is in the display
    let curr_num_content = current_num.textContent;

    //cannot make 0 negative or positive
    console.log(Number(curr_num_content));
    if(Number(curr_num_content) == 0) return; 

    //if "-" is in the display, we must make it positive
    if(curr_num_content.charAt(0) == "-"){
        curr_num_content = curr_num_content.substring(1, curr_num_content.length);
    }
    else{
        //must add negative
        curr_num_content = `-${curr_num_content}`;
    }

    clearCurrentNum();
    current_num.appendChild(document.createTextNode(`${curr_num_content}`));
}


/**
 * reset will reset the calculator program back to its initial default state
 */
function reset(){
    //clear operand1, operand2, and operator
    operand1 = '';
    operant2 = '';
    operator = null;
    clearCurrentNum();
    current_num.appendChild(document.createTextNode(`0`));
}

/**
 * clearCurrentNum is used to erase what is displayed on the 
 * display (current_num)
 */
function clearCurrentNum(){
    current_num.removeChild(current_num.firstChild);
}


/**
 * appendDigit will append a digit that was clicked by the user to the
 * number that is being displayed on the screen. However once there is 9 digits on the 
 * display (current_num), no more digits will be added to the display. 
 */
function appendDigit(e){
    let curr_num_content = current_num.textContent;
    const num = e.srcElement.value;
    //limit number entered at 9 digits long
    if(digitCount() > 8) return;

    if(curr_num_content === "0"){
        curr_num_content = "";
    }

    clearCurrentNum();
    current_num.appendChild(document.createTextNode(`${curr_num_content}${num}`));
}


/**
 * appendDecimal will append a decimal point to the 
 * number that is being displayed on the screen. However if
 * a decimal point already exists, then it will not add another.
 */
function appendDecimal(e){
    const curr_num_content = current_num.textContent;
    
    //do not add decimal if theres already a decimal
    if(curr_num_content.includes(".")) return;

    clearCurrentNum();
    console.log('decimal added')
    current_num.appendChild(document.createTextNode(`${curr_num_content}.`));
}

/**
 * digitCount will count the number of digits in the 
 * display label
 * @return {digitCount} - the total number of digits that are on the display
 */
function digitCount(){
    let current_num_content = current_num.textContent;
    let digitCount = 0; 
    for(const ch of current_num_content){
        if (ch !== ".")
            digitCount++;
    }
    return digitCount;
}

createBtnGrid();



