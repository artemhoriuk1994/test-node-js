const taskDescription = `
  Задача: Асинхронне отримання списка користувачів

  Реалізуйте функцію getUsers, яка асинхронно отримує список користувачів з сервера.
  Функція повинна повертати масив об'єктів користувачів, кожний об'єкт має влістивості 'name', 'age' і 'email'.
`;

const usersDatabase = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 28, email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', age: 25, email: 'alice@example.com' },
    { id: 4, name: 'John Uokf', age: 30, email: 'Uokf@example.com' },
    { id: 5, name: 'Jane Loper', age: 28, email: 'loper@example.com' },
    { id: 6, name: 'Johnson Kit', age: 25, email: 'kit@example.com' }
  ];

async function getUsers() {
 try {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return usersDatabase
 } catch (error) {
    console.error('Помилка отримання даних з сервера', error.message )
 }
}

module.exports = { getUsers, taskDescription };
