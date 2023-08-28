const { stdin, stdout } = require('process');
const getRandomQuestion = require('./getRandomQuestion')
const readline = require('readline');

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

let score = 0;
let index = 1;

function askQuestion() {
  const randomQuestion = getRandomQuestion()
  if (randomQuestion) {
    const { question, options, correctAnswer, multipleAnswer } = randomQuestion
    console.log(`\x1b[32mПитання №${index}: ${question}\x1b[0m`);
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
    
const isMultipleAnswers = multipleAnswer ? 'Виберіть декілька правильних відповідей (вказуйте відповіді через кому без пробілів): ' : 'Виберіть варіант відповіді (1-3): '

rl.question(isMultipleAnswers, (answer) => {
  const selectedOption = parseInt(answer);
  const optionsForSelections = [1, 2, 3];
  
  if (multipleAnswer) {
      optionsForSelections.push(4,5)
      const selectedOptions = answer.split(',').map(option => parseInt(option.trim()));
      const correctOptions = optionsForSelections.filter(optionIndex =>
        selectedOptions.includes(optionIndex) &&
        correctAnswer.includes(options[optionIndex - 1])
    );

    const earnedPoints = correctOptions.length * 1 +
                        (optionsForSelections.length - correctOptions.length) * 0.25;

    score += earnedPoints;

    index++;
    askQuestion();
  } else {
      if (optionsForSelections.includes(selectedOption)) {
        console.log(options[selectedOption - 1])
          if (options[selectedOption - 1] === correctAnswer) {
              score++;
          }
          index++;
          askQuestion();
      } else {
          console.log('\x1b[31m%s\x1b[0m', 'Будь ласка виберіть варіант 1, 2 або 3');
          askQuestion();
      }
  }
});

  } else {
    console.log(`Гра завершена! Ваш результат: ${score}`);
    rl.close();
  }
}

askQuestion();