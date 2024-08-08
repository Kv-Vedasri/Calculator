import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      return;
    }

    if (value === '=') {
      if (firstOperand !== null && operator && !waitingForSecondOperand) {
        const secondOperand = parseFloat(display);
        const result = calculate(firstOperand, secondOperand, operator);
        animateDisplay(String(result));
        setFirstOperand(result);
        setOperator(null);
        setWaitingForSecondOperand(false);
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (firstOperand === null) {
        setFirstOperand(parseFloat(display));
      } else if (operator && !waitingForSecondOperand) {
        const secondOperand = parseFloat(display);
        const result = calculate(firstOperand, secondOperand, operator);
        animateDisplay(String(result));
        setFirstOperand(result);
      }
      setOperator(value);
      setWaitingForSecondOperand(true);
      return;
    }

    if (value === '.') {
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
      return;
    }

    if (waitingForSecondOperand) {
      animateDisplay(value);
      setWaitingForSecondOperand(false);
    } else {
      animateDisplay(display === '0' ? value : display + value);
    }
  };

  const calculate = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return b;
    }
  };

  const animateDisplay = (value: string) => {
    const displayElement = document.querySelector('.display');
    if (displayElement) {
      displayElement.classList.add('change');
      setTimeout(() => {
        displayElement.classList.remove('change');
        setDisplay(value);
      }, 300);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Calculator</h1>
      <div className="calculator">
        <div className="display" role="textbox" aria-live="polite">{display}</div>
        <div className="buttons">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', 'C', '+', '='].map((btn) => (
            <button
              key={btn}
              className={`btn ${btn === '=' ? 'equal' : ''} ${['+', '-', '*', '/', 'C'].includes(btn) ? 'operator' : ''}`}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
