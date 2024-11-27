document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false;

    const updateDisplay = () => {
        display.textContent = currentInput;
    };

    const clear = () => {
        currentInput = '0';
        previousInput = '';
        operation = null;
    };

    const handleNumberInput = (number) => {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput += number;
        }
    };

    const handleDecimalInput = () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    };

    const handleOperatorInput = (op) => {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        shouldResetDisplay = true;
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
    };

    document.querySelectorAll('.number, .decimal').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('decimal')) {
                handleDecimalInput();
            } else {
                handleNumberInput(button.dataset.num);
            }
            updateDisplay();
        });
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            handleOperatorInput(button.dataset.op);
        });
    });

    document.querySelector('.equals').addEventListener('click', () => {
        if (operation) calculate();
        updateDisplay();
    });

    document.querySelector('.clear').addEventListener('click', () => {
        clear();
        updateDisplay();
    });

    updateDisplay();
});

