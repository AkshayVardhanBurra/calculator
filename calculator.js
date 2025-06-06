
class Calculator {

    constructor() {
        this.current = null;
        this.memory = null;
        this.num1 = null;
        this.num2 = null;
        this.op = "";

    }
   

    operate(){
        if(this.errorMessage()){
            return;
        }

        if(this.op == "x"){
            if(this.memory == null){
                this.current = this.num1 * this.num2;
                this.memory = this.current;
            }else{
                this.current = this.memory * this.num1;
                
            }
        } else if(this.op == "/"){
            if(this.memory == null){
                this.current = this.num1 / this.num2;
                this.memory = this.current;
            }else{
                this.current = this.memory/this.num1;
            }
        } else if(this.op == "+"){
        
            if(this.memory == null){
                console.log("right here!")
                this.current = this.num1 + this.num2;
                this.memory = this.current;
            }else{
                console.log("memory is not null")
                this.current = this.memory + this.num1;
            }
        }else{
            if(this.memory == null){
                this.current = this.num1 - this.num2;
                this.memory = this.current;
            }else{
                this.current = this.memory - this.num1;
            }
        }
        
        this.memory = this.current;
    }


    errorMessage() {
        if(this.op == "" ){
            console.log("No operator was selected")
            return true;
        }
        if(this.num1 == null){
            console.log("num1 is empty")
            return true;
        }
        if(this.num2 == null && this.isFirstTime()){
            console.log("num2 is empty")
            return true;
        }

        return false;
    }



    setNumbers(n1, n2, op){
        this.num1 = n1;
        this.num2 = n2;
        this.op = op;

    }



    clear(){
        this.num1 = null;
        this.num2 = null;
        this.memory = null;
        this.current = null;
        this.op = "";
    }


    isFirstTime(){
        return this.memory == null;
    }

    setDisplay(display1, display2){
        
        display1.innerText = this.current == 0 ? "0" : this.getFixed(4);
        
        if(this.isFirstTime()){
            display2.innerText = "";
        }else{
            display2.innerText = "" + this.memory;
        }
    }

    getFixed(num){
        return this.current.toFixed(num)
    }

    
    
}
//when users types number, add it to the main display
//when user clicks equal, add that value to the main display and history

const equals = document.getElementById("equal");
const calculator = new Calculator();
const mainDisplay = document.getElementById("mainDisplay");
const memoryDisplay = document.getElementById("memory");
const decimal = document.getElementById("decimal");
const neg = document.getElementById("neg");
let num = "";
let num2 = "";
let op = "";

equals.onclick = () => {
    console.log("here!!!!")
    if(calculator.isFirstTime() && num != "" && num2 != ""){
        calculator.setNumbers(parseFloat(validifyNumber(num)), parseFloat(validifyNumber(num2)), op);
        calculator.operate()
        calculator.setDisplay(mainDisplay, memoryDisplay)

        num = "";
        num2 = "";
        op = "";
    }else if(!calculator.isFirstTime() && num != "" && op != ""){
        calculator.setNumbers(parseFloat(validifyNumber(num)), null, op);
        calculator.operate()
        calculator.setDisplay(mainDisplay, memoryDisplay)

        num = "";
        num2 = "";
        op = "";
    }

    op = "";
}



function addEventListeners(){
    const buttons = document.getElementsByClassName("number");
    console.log("here")
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", (e) => {

            if(calculator.isFirstTime()){
                //If its the first time and memory is null
                console.log("first time")
                //if num isn't typed, then type that.
                if(op == ""){
                    console.log(repeatingButton(e.target, num))
                    if(!repeatingButton(e.target, num)){
                        validifyMainNumber(e);
                    }
                }else if(op != ""){
                    //Time to type out num2 since there is no memory
                    if(!repeatingButton(e.target, num2)){
                        if(e.target == neg && num2 != ""){
                            return;
                        }else if(e.target == neg){
                            num2 += "-";
                            return;
                        }
                        num2 += e.target.innerText.trim();
                        num2 = "" + validifyNumber(num2);
                    }
                }
            }else{
                //Not the first time. There is something in memory.

                //if the user types a number and there is an operator, add it to num

                if(op != ""){
                    console.log("memory")
                    console.log(e.target == decimal)
                    
                    if(!repeatingButton(e.target, num)){
                        validifyMainNumber(e)
                    }

                }else if(op == ""){

                    calculator.clear();
                    if(!repeatingButton(e.target, num)){
                        validifyMainNumber(e)
                    }

                }
            }
            

            console.log("num: " + num);
            console.log("num2: " + num2);
            console.log(calculator);

            appendText()
        })
    }
}

function validifyMainNumber(e) {
    console.log(e.target)
    if(e.target == neg && num != ""){
        return;
    }else if(e.target == neg){
        num += "-";
        return;
    }
    num += e.target.innerText.trim();
    num = "" + validifyNumber(num);
}

function setOp(operator){
    if(num == ""){
        
        if(!calculator.isFirstTime()){
            op = operator.trim();
            appendText();
        }
        return;
    }
    //if num1 operator num2 is typed out and another operator is being added
    if(op != "" && num2 != ""){
        //operate the initial
        calculator.setNumbers(parseFloat(validifyNumber(num)), parseFloat(validifyNumber(num2)), op);
        calculator.operate(); // this will put the result in memory and on main display.
        calculator.setDisplay(mainDisplay, memoryDisplay)
        num2 = "";
        num = "";

        //update the display
    }else if(op != "" && !calculator.isFirstTime()){
        //That means
        calculator.setNumbers(parseFloat(validifyNumber(num)),null, op);
        calculator.operate();
        calculator.setDisplay(mainDisplay, memoryDisplay)
        num = "";

    }

    
    op = operator.trim();
    
    appendText()

}

document.getElementById("plus").onclick = (e) => {
    setOp("+")
   
}
document.getElementById("minus").onclick = (e) => {
    setOp("-")
    
}
document.getElementById("mul").onclick = (e) => {
    setOp("x")
    
}
document.getElementById("div").onclick = (e) => {
    setOp("/")
    
}


function validifyNumber(number){
    
    number = number.trim();
    if(number == "."){
        return "0.";
    }else if(number == "0."){
        return "0.";
    }else if(number.length > 0 && number[number.length - 1] == "."){
        return number;
    }
    return number
}


function appendText(){
    if(calculator.isFirstTime()){
        mainDisplay.innerText = num + " " + op + " " + num2;
    }else{
        console.log("in the appendText")
        mainDisplay.innerText = calculator.getFixed(4) + " " + op + " " + num;
    }
}


addEventListeners();

function repeatingButton(target, numText){
    return (target == decimal && numText.indexOf(".") != -1) || (target == neg && numText.indexOf("-") != -1)
}

document.getElementById("clear").onclick = () => {
    
    num = "";
    num2 = "";
    op = "";
    calculator.clear()
    mainDisplay.innerText = "0";
    memoryDisplay.innerText = "";
}
// if calculator.isFirstTime()

//      get the first number properly 

//      get the second number properly after the operator


// else

    // get the operator

    // get the first number properly


// make sure to auto calculate when the user clicks the next operator again.











