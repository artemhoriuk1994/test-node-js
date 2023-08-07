
const assert = require('assert');
const calculateAverageGrade = require('./student_code');

describe('calculateAverageGrade', () => {
  it('Повинно повернути середній бал', () => {
    const grades = [7, 8, 9, 6];
    const result = calculateAverageGrade(grades);
    assert.strictEqual(result, 7.5);
  });

  it('Повинно повернути 5 при однакових оцінках', () => {
    const grades = [5, 5, 5, 5];
    const result = calculateAverageGrade(grades);
    assert.strictEqual(result, 5);
  });

  it('Повинно повернути null при порожньому масиві оцінок', () => {
    const grades = [];
    const result = calculateAverageGrade(grades);
    assert.strictEqual(result, null);
  });

  it('Повинно викинути виняток при неприпустимій оцінці', () => {
    const grades = [8, -1, 9, 7];
    assert.throws(() => {
      calculateAverageGrade(grades);
    }, Error, 'Неприпустима оцінка');
  });
});
