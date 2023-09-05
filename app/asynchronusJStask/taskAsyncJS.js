const fs = require('fs');
const vm = require('vm');
const Mocha = require('mocha');
const readline = require('readline');
const { taskDescription } = require('./taskDescription');
const testCases  = require('./testCases')


console.log(taskDescription);
const studentCodeFile = fs.createWriteStream('./student_code.js');

function runStudentCode(studentCode) {
  const context = {};
  vm.createContext(context);
  vm.runInContext(studentCode, context);
  return context;
}

async function testStudentCode(studentCode, testCases) {
  const mocha = new Mocha();
 console.log(testCases)
  testCases.forEach((testCase, index) => {
    mocha.suite.emit('pre-require', global, null, mocha);
    mocha.suite.emit('require', runTest(studentCode, testCase, index), null, mocha);
  });

  return new Promise((resolve, reject) => {
    mocha.run((failures) => {
      resolve(failures);
    });
  });
}

function runTest(studentCode, testCase, index) {
  return function () {
    it(`Тест #${index + 1}`, async () => {
      const studentContext = runStudentCode(studentCode);

      //Отримання функції студента з контексту
      const studentFunction = studentContext[testCase.functionName];

      // Перевірка на існування функції
      expect(studentFunction).to.exist;

      // виклик функції з тестами
      const result = await studentFunction.apply(null, testCase.args);

      // Перевірка очікуємого результату
      expect(result).to.deep.equal(testCase.expectedResult);
    });
  };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let studentCode = '';
let codeStarted = false;

rl.on('line', (input) => {
  if (!codeStarted) {
    codeStarted = true;
    studentCode = input;
    studentCodeFile.write(studentCode, (err) => {
      if (err) {
        console.error('Помилка при збереженні коду:', err);
        process.exit(1);
      } else {
        console.log('Код збережено в файл в student_code.js');
        console.log('Починаємо тест кода...');
        testStudentCode(studentCode, testCases)
          .then((failures) => {
            if (failures === 0) {
              console.log('Всі тести пройдені успішно!');
            } else {
              console.error(`Тестів не пройдено: ${failures}`);
            }
            process.exit(0);
          })
          .catch((error) => {
            console.error('Помилка при виконанні тестів:', error);
            process.exit(1);
          });
      }
    });
  }
});


