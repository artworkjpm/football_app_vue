const getYear = new Date().getFullYear();
const getMonth = new Date().getMonth();

const startYear = 2017;
console.log(getYear, getMonth)

if (getMonth > 7 && getMonth < 12){
  getYear = getYear - 1
  
}

console.log(getYear)