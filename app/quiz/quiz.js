const { stdin, stdout } = require('process');
const questions = require('./questions')
const readline = require('readline');
console.log(questions)
const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

let score = 0;
let currentQuestion = 0;

function askQuestion() {
  if (currentQuestion < questions.length) {
    const { question, options, correctAnswer } = questions[currentQuestion];

    console.log(`Питання №${currentQuestion + 1}: ${question}`);
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });

    rl.question('Виберіть варіант відповіді (1-3): ', (answer) => {
      const selectedOption = options[parseInt(answer) - 1];
      if (selectedOption === correctAnswer) {
        score++;
      }
      currentQuestion++;
      askQuestion();
    });
  } else {
    console.log(`Гра завершена! Ваш результат: ${score} правильних відповідей із ${questions.length} питань.`);
    rl.close();
  }
}

askQuestion();