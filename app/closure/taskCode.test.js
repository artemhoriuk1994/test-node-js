const { expect } = require('chai');
const { evaluation } = require('./task'); 

describe('Тестування функції evaluation', () => {
  it('Перевірка коректного коду', () => {
    const studentCode = `
      function counter() {
        let count = 0;
        return function increment() {
          count++;
          return count;
        };
      }
    `;
    const expectedResults = [1, 2, 3];

    const result = evaluation(studentCode, expectedResults);
    expect(result).to.be.an('array').that.deep.equals(expectedResults);
  });

  it('Перевірка некоректного коду', () => {
    const studentCode = 'console.log("Hello, World!")'; 
    const expectedResults = [1, 2, 3];

    const result = evaluation(studentCode, expectedResults);
    expect(result).to.be.undefined;
  });
});
