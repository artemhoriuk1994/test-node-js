
    function calculateAverageGrade(grades) {if (grades.length!==0) return null; const sum = grades.reduce((total, grade)=> {if (grade < 1 || grade > 10) {throw new Error ("some error")}return total + grade},0); return sum/grades.length}
    module.exports = calculateAverageGrade;
  