const prompt = require('prompt-sync')();
const vm = require('vm');
const {counter} = require('./module');

function evaluation(studentCode) {
  const context = vm.createContext({});
  let evaluatedCode;

  try {
    if (!studentCode.includes('function') && studentCode.length < 25 ) throw new Error ('Невірний формат')
    context.counter = counter(); 
    evaluatedCode = vm.runInContext(studentCode, context);

  } catch (error) {
    console.error('При виконанні коду виникла помилка:', error);
    return;
  }

  const increment = context.counter; 

  const expectedResults = [1, 2, 3];
  const actualResults = [];

  for (let i = 0; i < expectedResults.length; i++) {
    const result = increment();
    actualResults.push(result);
  }

  const isCorrect = JSON.stringify(actualResults) === JSON.stringify(expectedResults);

  if (isCorrect  && !'' && actualResults.length > 0) {
    console.log('Задача вирішена');
  } else {
    console.log('Код не вірний!');
    console.log('Очікувані результати:', expectedResults);
    console.log('Фактичні результати:', actualResults);
  }
}

function main() {
  const task = `Задача: Лічильник замиканням 
  Напишіть функцію counter(), яка повертає іншу функцію. Повернена функція має бути лічильником і повертати наступне значення лічильника при кожному виклику.
  Приклад використання функції counter() 
  const increment = counter();
  console.log(increment()); // 1
  console.log(increment()); // 2
  console.log(increment()); // 3

  Ваше завдання - написати функцію counter(), використовуючи замикання для збереження стану лічильника між викликами.
`;
  console.log( task);
  console.log('Введіть Ваш код:');
  const studentCode = prompt();

  evaluation(studentCode);
}

main();
