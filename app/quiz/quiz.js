const { stdin, stdout } = require('process');
const questions = require('./questions')
const readline = require('readline');

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

let score = 0;
let currentQuestion = 0;
const wrongConditionAnswers = [];

function askOneMoreTime (questionId) {
  const wrongCondition = questions.find(id => questionId !== id);
  console.log(wrongCondition)
  wrongConditionAnswers.push(wrongCondition)
  if (!wrongConditionAnswers) return;
  console.log(wrongConditionAnswers)
}

function askQuestion() {
  if (currentQuestion < questions.length) {
    const { question, options, correctAnswer, id } = questions[currentQuestion];

    console.log(`Питання №${id}: ${question}`);
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });

    rl.question('Виберіть варіант відповіді (1-3): ', (answer) => {
      const selectedOption = parseInt(answer)
      const optionsForSelections = [1,2,3]
      if (optionsForSelections.includes(selectedOption)) {
        if(options[selectedOption -1] === correctAnswer){
        score++;
    }
      currentQuestion++;
      askQuestion();
      } else {
        console.log('Будь ласка виберыть варіант 1, 2 або 3')
        askQuestion()
      }
      
    });
  } else {
    console.log(`Гра завершена! Ваш результат: ${score} правильних відповідей із ${questions.length} питань.`);
    rl.close();
  }
}

askQuestion();