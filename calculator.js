//Calculator class
export class calculator{

    add(a, b){
        return calculator.#toSciNotation(a + b);
    }

    sub(a, b){
        return calculator.#toSciNotation(a - b);
    }

    multiply(a, b){
        return calculator.#toSciNotation(a * b);
    }

    divide(a, b){
        return calculator.#toSciNotation(a / b);
    }

    percentage(a){
        return calculator.#toSciNotation(a / 100);
    }
    /**
     * 
     * @param {number} -number is the number passed in that is
     * being converted to scientific notation 
     * @returns num, the number which is to be displayed on the screen
     */
    static #toSciNotation(number){
        let num = number;
        console.log(number);
        if(number.toString().length > 10){
            num = num.toExponential(3);
        }
        return num;
    }
}
