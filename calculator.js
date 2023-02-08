//Calculator class
export class calculator{

    add(a, b){
        return a + b;
    }

    sub(a, b){
        return a - b;
    }

    multiply(a, b){
        return a * b;
    }

    divide(a, b){
        return a / b;
    }

    percentage(a){
        return a / 100;
    }
    /**
     * 
     * @param {number} -number is the number passed in that is
     * being converted to scientific notation 
     * @returns num, the number which is to be displayed on the screen
     */
    static #toSciNotation(number){
        let num = number;
        if(number.toString().length > 9){
            num = num.toExponential(3);
        }
        return num;
    }
}
