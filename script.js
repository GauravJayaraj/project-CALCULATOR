/*
    add
    subtract
    multiply
    divide
*/

function add(numA, numB){
    return numA+numB;
}

function subtract(numA, numB){
    return numA-numB;
}

function multiply(numA, numB){
    return numA*numB;
}

function divide(numA, numB){
    if(numB)
        return "BRUHH, Y U DO DIS"
    return numA/numB;
}



function operate(numA, numB, operator){
    
    numA = parseFloat(numA);
    numB = parseFloat(numB);
    
    let res;

    if(isNaN(numA)==true || isNaN(numB)==true)
        res = "Invalid operator(s)";


    if(operator=='+'){
        res = add(numA, numB);
    }
    else if(operator=='-'){
        res = subtract(numA, numB);
    }
    else if(operator=='*'){
        res = multiply(numA, numB);
    }
    else if(operator=='/'){
        res = divide(numA, numB);
    }
    else{
        res = "Invalid Operation!";
    }

    return Math.round(res * 100) / 100

}


const numbers = document.querySelectorAll("[data-operand]");
const operators = document.querySelectorAll("[data-operator]");

const clear = document.querySelector("[data-clear]");
const equals = document.querySelector("[data-equals]");
const signToggle = document.querySelector("[data-signchange]");


const numberA = document.querySelector("[data-numbera]");
const numberB = document.querySelector("[data-numberb]");



const Calculator = {
    
    calcNumA : "",
    calcNumB : "",
    calcOper : undefined,
    calcFlag : false,           // after = set to true so after an = cannot append

    initialize(){
        this.calcNumA = "";
        this.calcNumB = "";
        this.calcOper = undefined;
        numberA.innerText = this.calcNumA;
        numberB.innerText = this.calcNumB;
    },

    appendNumber(number){
        if(this.calcFlag)
        {
            this.refresh();
            this.calcFlag = false;
        }

        if(number==='.' && this.calcNumB.includes("."))
            return;

        this.calcNumB = this.calcNumB.toString()+number.toString();
    },

    signChange(){
        if(this.calcNumB[0]!="-"){
            this.calcNumB = "-"+this.calcNumB;
        }
        else{
            this.calcNumB = this.calcNumB.slice(1, this.calcNumB.length);
        }

        this.updateDisplayNumB();
    },

    updateDisplayNumB(){
        numberB.innerText = this.calcNumB;
    },

    selectOperator(operator){
        if(this.calcNumB==="")
            return;

        if(this.calcNumA!=="")          // when we want to continue current result
        {
            this.cOperate();   
        }   
            
        this.calcFlag = false;          //  unset forbidden append after = , as we followed with operator
        this.calcOper = operator.toString();

        // transfer numberB to numberA as that operand is fixed
        this.calcNumA = this.calcNumB.toString();
        this.calcNumB = "";

        this.updateDisplayNumB();
        this.updateDisplayNumA();
    },

    updateDisplayNumA(){
        numberA.innerText = this.calcNumA.toString()+this.calcOper.toString();
    },

    refresh(){
        this.initialize();
    },

    cOperate(){
        
        if(this.calcNumA==="" || this.calcNumB==="")      // can't compute
            return;
        
        let result = operate(this.calcNumA, this.calcNumB, this.calcOper);  

        this.calcNumA = "";
        this.calcNumB = result.toString();
        this.calcOper = undefined;

        numberA.innerText = this.calcNumA;
        numberB.innerText = this.calcNumB;
        this.calcFlag=true;
    }

}


// number stored in obj to frontend

numbers.forEach( (number)=>{
    number.addEventListener('click', ()=>{
        Calculator.appendNumber(number.innerText);
        Calculator.updateDisplayNumB();
    });
});

// help select operator

operators.forEach( (operator)=>{
    operator.addEventListener('click', ()=>{
        Calculator.selectOperator(operator.innerText);
        
    })
})


// clear means clear the obj data members as well as display
clear.addEventListener('click', ()=>{
    Calculator.refresh();
    
})


// toggle sign

signToggle.addEventListener('click', ()=>{
    Calculator.signChange();
})


// on equals

equals.addEventListener('click', ()=>{
    Calculator.cOperate();
})

// Driver

Calculator.initialize();
