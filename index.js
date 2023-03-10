import { calculator } from "./calculator.js";
const calc = new calculator();
const btn_chars = ["C", "+/-", "%", "÷", "7", "8","9", "×", 
"4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
const operator_btns = new Set(["÷", "×", "-", "+", "="]);
const special_btns = new Set(["C", "+/-", "%"]);
const current_num = document.getElementById('current-num');
let operand1 = '';
let operand2 = '';
let curr_operator = null;
let resetScreen = false;
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


/**
 * addBtnEventListener will add event listeners to
 * all the buttons one the calculator.
 * 
 */
function addBtnEventListener(button, button_char){
    
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
        operatorListeners(button);
    }
    //button is a number
    else{
        button.addEventListener("click", appendDigit);
    }
}


function operatorListeners(button){
    button.addEventListener('click', setOperator);
}

/**
 * specialListeners will add event listeners to
 * all the buttons that I defined as "special" ("C", "+/-", "%").
 * 
 */
function specialListeners(button, button_char){
    //assign the proper function to this button depending on char
    if(button_char == "C"){
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

function setOperator(e){
    console.log(e.srcElement.value);
    if(curr_operator !== null)  compute();

    operand1 = current_num.textContent;
    curr_operator = e.srcElement.value;
    resetScreen = true;
    console.log(`operand1 is: ${operand1}, operator is ${curr_operator}, resetScreen is ${resetScreen}`)
}

function compute(){
    //if operator is null, do nothin
    if(curr_operator === null || resetScreen) return;

    operand2 = current_num.textContent
    if(curr_operator == "÷" && operand2 == "0"){
        console.error("Division by zero error");
        alert("divison by zero error");
        return;
    }
    console.log(`operand2 is ${operand2}`);
    const result = document.createTextNode(`${operate()}`);
    console.log(result.textContent);
    current_num.removeChild(current_num.firstChild);
    current_num.appendChild(result);
    curr_operator = null;
}

function operate(){
    const a = Number(operand1);
    const b = Number(operand2);
    console.log(operand1, curr_operator, operand2);
    if(curr_operator == "÷")
        return calc.divide(a, b);
    else if (curr_operator == "×")
        return calc.multiply(a, b);
    else if (curr_operator == "+")
        return calc.add(a, b);
    else if (curr_operator == "-")
        return calc.sub(a, b);
    else
        console.log(a, b);
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
function reset(screenonly = true){
    //clear operand1, operand2, and operator
    if(screenonly){
        operand1 = '';
        operand2 = '';
        curr_operator = null;
        console.log('Full reset');
    }
    else{
        console.log('display only reset');
    }
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

    if(curr_num_content === "0" || resetScreen){
        curr_num_content = "";
        resetScreen = false;
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



