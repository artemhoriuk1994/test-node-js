function counter() {
    let count = 0;
  
    function increment() {
      count++;
      return count;
    }
  
    return increment;
  }

  module.exports={
    counter
  }