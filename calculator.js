// some sort of running total
let runningTotal = 0;
//keep a track of what they are writing.
let buffer = "0";
//keep track of the operator.
let previousOperator;
//the screen.
const screen = document.querySelector('.screen')
//bind event listner
//This example uses the addEventListener() method to attach a click event to the buttons.
document.querySelector('.cal-buttons').addEventListener('click', function(e){
    console.log('here')
    //must pass in the innetText.
    buttonClick(event.target.innerText)
})

//Is it a number or a symbol.
function buttonClick(value) {
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        // console.log(value);
        //this takes the number and a value.
        handleNumber(value);
    }
    //the rerender function is takes it to the beginning.
    rerender();
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        //adding the value to the end of it +=
        buffer += value;
    }
    rerender();
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
          buffer = "0"
          runningTotal = 0;
          previousOperator = null;
          break;
        case "=":
        if (previousOperator === null) {
            return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
        break;
        case "←":
            if(buffer.length === 1){
                buffer = "0"
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
            default:
                handleMath(value);
            break;

    }

}
function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);

    }
    previousOperator = value;
    buffer = "0";
}
function flushOperation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "*") {
        runningTotal *= intBuffer;
    } else  {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText= buffer;
}
