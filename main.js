// Variables
let lastclicked;
const tempnums = document.querySelector('.nums');
const tempops = document.querySelector('.ops');
const outputs = document.querySelector('.outputs');

// Functions

function add(arg1, arg2) {
  return arg1 + arg2;
}

function subtract(arg1, arg2) {
  return arg1 - arg2;
}

function multiply(arg1, arg2) {
  return arg1 * arg2;
}

function divide(arg1, arg2) {
  if (arg2 == 0) {
    alert("Nice try... you can't divide by zero.");
  } else {
    return arg1 / arg2;
  }
}

function modulus(arg1, arg2) {
  return arg1 % arg2;
}

function resetDisplay() {
  lastclicked = '';
  tempnums.textContent = '';
  tempops.textContent = '';
  outputs.textContent = '';
}

function operate(num1, operator, num2) {
  const x = parseFloat(num1);
  const y = parseFloat(num2);
  switch (operator) {
    case '+':
      return add(x, y);
      break;
    case '-':
      return subtract(x, y);
      break;
    case '*':
      return multiply(x, y);
      break;
    case '÷':
      return divide(x, y);
      break;
    case '%':
      return modulus(x, y);
      break;
    default:
      console.log('No valid operation detected.');
  }
}

function numberClick(e) {
  const n = e.target.textContent;
  if (!lastclicked || lastclicked == 'operator') {
    outputs.textContent = n;
    lastclicked = 'number';
  } else if (lastclicked == 'number' || lastclicked == 'decimal') {
    if (outputs.textContent.length < 9) {
      outputs.textContent += n;
    }
    lastclicked = 'number';
  } else {
    alert('Invalid selection');
  }
}

function operatorClick(e) {
  const n = e.target.textContent;
  if (lastclicked == 'number') {
    if (!tempops.textContent) {
      tempnums.textContent = outputs.textContent;
      tempops.textContent = n;
      outputs.textContent = '';
    } else {
      tempnums.textContent = operate(
        tempnums.textContent,
        tempops.textContent,
        outputs.textContent
      );
      if (tempnums.textContent.length > 9) {
        tempnums.textContent = parseFloat(tempnums.textContent).toFixed(9);
      }
      outputs.textContent = '';
    }
    lastclicked = 'operator';
    if (tempnums.textContent) {
      tempops.textContent = n;
    } else {
      resetDisplay();
    }
  } else if (lastclicked == 'operator') {
    tempops.textContent = n;
  } else if ((lastclicked = 'equals')) {
    tempnums.textContent = outputs.textContent;
    tempops.textContent = n;
    outputs.textContent = '';
    lastclicked = 'operator';
  } else {
    alert('Invalid selection');
  }
}

function funcClick(e) {
  const n = e.target.textContent;
  switch (n) {
    case 'AC':
      resetDisplay();
      break;
    case 'C':
      outputs.textContent = outputs.textContent.substring(
        0,
        outputs.textContent.length - 1
      );
      if (outputs.textContent.length == 0) {
        if (tempops.textContent) {
          lastclicked = 'operator';
        } else {
          lastclicked = '';
        }
      }
      break;
    case '+/-':
      if (outputs.textContent.substring(0, 1) == '-') {
        outputs.textContent = outputs.textContent.substring(
          1,
          outputs.textContent.length
        );
      } else if (outputs.textContent.length >= 1) {
        outputs.textContent = '-' + outputs.textContent;
      }
      break;
    default:
      alert('No valid function detected');
  }
}

function decimalClick(e) {
  const n = e.target.textContent;
  if (
    (lastclicked =
      'number' &&
      outputs.textContent.length < 8 &&
      !outputs.textContent.includes('.'))
  ) {
    outputs.textContent += n;
    lastclicked = 'decimal';
  }
}

function equalsClick(e) {
  const n = e.target.textContent;
  if (lastclicked == 'number') {
    if (tempops.textContent) {
      tempnums.textContent = operate(
        tempnums.textContent,
        tempops.textContent,
        outputs.textContent
      );
      if (tempnums.textContent.length > 9) {
        tempnums.textContent = parseFloat(tempnums.textContent).toFixed(9);
      }
      outputs.textContent = tempnums.textContent;

      lastclicked = 'equals';
      tempops.textContent = n;
    }
  } else {
    alert('Invalid selection');
  }
}

// Listeners

const nums = document.querySelectorAll('.btn.num:not(.dec)');
nums.forEach((num) => num.addEventListener('click', numberClick));

const ops = document.querySelectorAll('.btn.op:not(.eq)');
ops.forEach((op) => op.addEventListener('click', operatorClick));

const funcs = document.querySelectorAll('.btn.func');
funcs.forEach((func) => func.addEventListener('click', funcClick));

const decbtn = document.querySelector('.btn.num.dec');
decbtn.addEventListener('click', decimalClick);

const eqbtn = document.querySelector('.btn.op.eq');
eqbtn.addEventListener('click', equalsClick);
