const questions = require('./questions')

const questionsCopy = [...questions]

function getRandomQuestion() {
    if (questionsCopy.length > 0) {
        const randomIndex = Math.floor(Math.random() * questionsCopy.length);
        const randomQuestion = questionsCopy.splice(randomIndex, 1)[0]; // Видаляємо питання з копії
        return randomQuestion;
    }
    return null; 
}

module.exports = getRandomQuestion