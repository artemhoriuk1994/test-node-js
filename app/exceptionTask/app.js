const readline = require('readline'); 
const fs = require('fs');
const assert = require('assert');
const taskDescription = require('./taskDescription');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(taskDescription, (functionInput) => {
  const studentFunction = `
    ${functionInput}
    module.exports = calculateAverageGrade;
  `;

  fs.writeFileSync('./student_code.js', studentFunction, 'utf-8');

  // Load the student's function directly from the student_code.js file
  const testFunction = require('./student_code');

  const testCases = [
    { input: [7, 8, 9, 6], expectedOutput: 7.5 },
    { input: [5, 5, 5, 5], expectedOutput: 5 },
    { input: [], expectedOutput: null },
  ];

  try {
    testCases.forEach((testCase, index) => {
      const result = testFunction(testCase.input);
      assert.deepStrictEqual(result, testCase.expectedOutput);
      console.log(`Тест ${index + 1} пройдено успішно!`);
    });
  } catch (error) {
    console.error('Тест не пройдено:', error.message);
  } finally {
    rl.close();
  }
});


