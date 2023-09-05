const { expect } = require('chai');
const { counter } = require('./module');

describe('Тестування замикання', () => {
  it('Повинен повертати наступне значення замиканням', () => {
    const increment = counter();
    expect(increment()).to.equal(1);
    expect(increment()).to.equal(2);
    expect(increment()).to.equal(3);
  });

  it('Має зберігати стан лічильника між викликами', () => {
    const increment1 = counter();
    const increment2 = counter();

    expect(increment1()).to.equal(1);
    expect(increment1()).to.equal(2);
    expect(increment1()).to.equal(3);

    expect(increment2()).to.equal(1);
    expect(increment2()).to.equal(2);
    expect(increment2()).to.equal(3);
  });

  it('Має зберігати стан лічильника між викликами для різних інстанцій', () => {
    const increment1 = counter();
    const increment2 = counter();

    expect(increment1()).to.equal(1);
    expect(increment1()).to.equal(2);

    expect(increment2()).to.equal(1);
    expect(increment2()).to.equal(2);

    expect(increment1()).to.equal(3);
    expect(increment2()).to.equal(3);
  });

  // Додайте інші тести за необхідністю, перевіряючи різні послідовності
});
