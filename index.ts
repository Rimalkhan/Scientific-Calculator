import inquirer from 'inquirer';

async function main() {
    const { operation } = await inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'Choose an operation:',
            choices: [
                'Add', 'Subtract', 'Multiply', 'Divide',
                'Square', 'Square Root', 'Exponential', 'Logarithm',
                'Sin', 'Cos', 'Tan'
            ],
        },
    ]);

    let result: number | string;
    switch (operation) {
        case 'Add':
        case 'Subtract':
        case 'Multiply':
        case 'Divide':
            result = await performBasicOperation(operation);
            break;
        case 'Square':
        case 'Square Root':
        case 'Exponential':
        case 'Logarithm':
        case 'Sin':
        case 'Cos':
        case 'Tan':
            result = await performSingleOperation(operation);
            break;
        default:
            console.log('Invalid operation');
            return;
    }

    console.log('Result:', result);
}

async function performBasicOperation(operation: string): Promise<number> {
    const { num1, num2 } = await inquirer.prompt([
        {
            type: 'input',
            name: 'num1',
            message: 'Enter the first number:',
            validate: validateNumber,
        },
        {
            type: 'input',
            name: 'num2',
            message: 'Enter the second number:',
            validate: validateNumber,
        },
    ]);

    switch (operation) {
        case 'Add':
            return parseFloat(num1) + parseFloat(num2);
        case 'Subtract':
            return parseFloat(num1) - parseFloat(num2);
        case 'Multiply':
            return parseFloat(num1) * parseFloat(num2);
        case 'Divide':
            if (parseFloat(num2) === 0) {
                throw new Error('Cannot divide by zero');
            }
            return parseFloat(num1) / parseFloat(num2);
        default:
            throw new Error('Invalid operation');
    }
}

async function performSingleOperation(operation: string): Promise<number> {
    const { num } = await inquirer.prompt([
        {
            type: 'input',
            name: 'num',
            message: 'Enter the number:',
            validate: validateNumber,
        },
    ]);

    switch (operation) {
        case 'Square':
            return parseFloat(num) * parseFloat(num);
        case 'Square Root':
            return Math.sqrt(parseFloat(num));
        case 'Exponential':
            return Math.exp(parseFloat(num));
        case 'Logarithm':
            return Math.log(parseFloat(num));
        case 'Sin':
            return Math.sin(parseFloat(num));
        case 'Cos':
            return Math.cos(parseFloat(num));
        case 'Tan':
            return Math.tan(parseFloat(num));
        default:
            throw new Error('Invalid operation');
    }
}

function validateNumber(input: string): boolean | string {
    return !isNaN(parseFloat(input)) ? true : 'Please enter a valid number';
}

main().catch((error) => console.error(error.message));
