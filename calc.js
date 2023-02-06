

const btn_chars = ["C", "+/-", "%", "/", "7", "8","9", "x", 
"4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]

const orange_btns = new Set(["/", "x", "-", "+", "="]);
const light_grey_btns = new Set(["C", "+/-", "%"]);
function addBtns(){

    //define button_sections css properties to make a grid that
    //is 5 x 4
    const btn_grid = document.getElementById(`btn-grid`);


    //calculator will be 4 x 5, so 20 buttons
    for(c of btn_chars){
        console.log(c);
        //create button
        let btn = document.createElement('button');
        //create content that will be in btn, For now I will put i
        let btn_content = document.createTextNode(`${c}`);

        //determines what class to give current btn
        if(orange_btns.has(c)){
            btn.classList.add("operator");
        }
        else if(light_grey_btns.has(c)){
            btn.classList.add("special");
        } 

        if(c =="0"){
            btn.classList.add(`zero`);
        }
        //add content to btn
        btn.appendChild(btn_content);

        //add btn to button section
        btn_grid.appendChild(btn);
    }
}

addBtns();
