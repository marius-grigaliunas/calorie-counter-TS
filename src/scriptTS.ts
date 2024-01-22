//hide insturctions
document.querySelector(".instructions")?.classList.add("hide");
//hide instructions

let year = new Date().getFullYear();
let month = new Date().getMonth();
let today = new Date().getDate();

const calendar = document.querySelector<HTMLElement>(".calendar-body");
const selectedMonth = document.querySelector<HTMLElement>(".current-month");
const selectedYear = document.querySelector<HTMLElement>(".current-year");
const navButtons = document.querySelectorAll<HTMLElement>(".calendar-navigation span");
const currentFullDate = document.getElementById("current-full-date");

const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const dateDate = `${today}-${month}-${year}`;
let selectedDate = `${today}-${month}-${year}`;

const getFormattedFullDate = (date: Date) : string => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${days[date.getDay()]}  ${day} ${months[month]} ${year}`;
};

selectedMonth ? selectedMonth.textContent = months[month] : 'undefined';
selectedYear  ? selectedYear.textContent = year.toString() : 'undefined';
currentFullDate ? currentFullDate.textContent = getFormattedFullDate(new Date())
    : 'undefined';

const generateCalendar = () => {
    if(calendar) {
        //get the last date of the previous month
        let dateLast_MonthPrev = new Date(year, month, 0).getDate();
        //get the last date of the month
        let dateLast = new Date(year, month+1, 0).getDate();
        
        // get the name of the first day of the month. 0 - sunday, 1- monday ...
        let dayFirst = new Date(year, month, 1).getDay();
        //get the name of the last day of the month
        let dayLast = new Date(year, month, dateLast).getDay();
    
        for(let i = 1; i <= dateLast; i++) {
            let day = new Date(year, month, i).getDay();
    
            // if first day of the months isn't monday fill it with the last month's dates
            if(i === 1 && day !== 1) {
                let lastMonthDate;
    
                if(day !== 0) {
                    lastMonthDate = dateLast_MonthPrev - day + 1;
                } else {
                    lastMonthDate = dateLast_MonthPrev - 7 + 1;
                    dayFirst = 7;
                }
    
                for(let j = 1; j < dayFirst; j++) {
                    if(j === 6) {
                        calendar.insertAdjacentHTML('beforeend', `<div id="${lastMonthDate + j}-${month === 0 ? 11 : month-1}-${month === 0? year-- : year}" class="day weekend last-month">${lastMonthDate + j}</div>`); 
                    } else {
                        calendar.insertAdjacentHTML('beforeend', `<div id="${lastMonthDate + j}-${month === 0 ? 11 : month-1}-${month === 0? year-- : year}" class="day workday last-month">${lastMonthDate + j}</div>`);
                    }        
                }
    
            }
    
            // if day is weekend day name different classes for coloring
            if(day === 0 || day === 6) {
                if(i === today && month.toString() == dateDate.split('-')[1]) {
                    calendar.insertAdjacentHTML('beforeend', `<div id="${i}-${month}-${year}" class="day today weekend">${i}</div>`);
                } else {
                    calendar.insertAdjacentHTML('beforeend', `<div id="${i}-${month}-${year}" class="day weekend">${i}</div>`);
                } 
            } else {
                if(i === today && month.toString() == dateDate.split('-')[1]) {
                    calendar.insertAdjacentHTML('beforeend', `<div id="${i}-${month}-${year}" class="day today workday">${i}</div>`);
                } else {
                    calendar.insertAdjacentHTML('beforeend', `<div id="${i}-${month}-${year}" class="day workday">${i}</div>`);
                }
            }
        }
    
        //if the last day of the month isn't sunday, fill the rest of the week with the next month dates 
        if(dayLast !== 0) {
            for(let i = dayLast + 1; i <= 7; i++) {
                if(i === 6 || i === 7) {
                    calendar.insertAdjacentHTML('beforeend', `<div id="${i}-${month === 11 ? 0 : month+1}-${month === 11 ? year+1 : year}" class="day weekend next-month">${i - dayLast}</div>`); 
                } else {
                    calendar.insertAdjacentHTML('beforeend', `<div id="${i}-${month === 11 ? 0 : month+1}-${month === 11 ? year+1 : year}" class="day workday next-month">${i - dayLast}</div>`);
                }
            }
        }
        addSelectOnClick();
    }

    console.log(calendar);
};

const addSelectOnClick = () => {
  const calendarContainer = document.querySelector<HTMLElement>(".calendar-body");

  calendarContainer?.addEventListener("click", (e) => {
    const clickedDay = (e.target as HTMLElement).closest(".day");

    if(clickedDay) {
      const daysToSelect = document.querySelectorAll<HTMLElement>(".day");

      if(document.querySelector(".today")) {
        document.querySelector(".today")?.classList.remove("today");
      }

      clickedDay.classList.add("today");

      selectedDate = clickedDay.querySelector(".day-number") ? `${clickedDay.querySelector(".day-number")?.textContent}-${month}-${year}` : `${clickedDay.textContent}-${month}-${year}`;
      
      const selectedDatearray = selectedDate.split('-');
      currentFullDate ? currentFullDate.textContent = getFormattedFullDate(new Date(+selectedDatearray[2], +selectedDatearray[1], +selectedDatearray[0]))
        : `undefined`;
    }
  });
};

navButtons[0].addEventListener("click", () => {
  if(month === 0) {
      year--;
      month = 11
  } else {
      month--;
  }

  selectedMonth ? selectedMonth.textContent = months[month] : 'undefined';
  selectedYear ? selectedYear.textContent = year.toString() : 'undefined';
  calendar? calendar.innerHTML = "" : 'undefined';
  generateCalendar();
  
  //updateForm();
});

navButtons[1].addEventListener("click", () => {
  if(month === 11) {
      year++;
      month = 0;
  } else {
      month++;
  }

  selectedMonth ? selectedMonth.textContent = months[month] : 'undefined';
  selectedYear ? selectedYear.textContent = year.toString() : 'undefined';
  calendar? calendar.innerHTML = "" : 'undefined';
  generateCalendar();
  
  //updateForm();
});

generateCalendar();

//calorie-counter.js
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = <HTMLInputElement>document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const deleteStorageButton = document.getElementById("delete");
const output = document.getElementById('output');
let isError = false;

localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data") || "{}") : [];

function cleanInputString(str : string) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str : string) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  if (entryDropdown) {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    
    if(targetInputContainer) {
      const entryNumber = targetInputContainer.querySelectorAll('input[type="number"]').length + 1;
      const HTMLString = `
      <div class="meal-container">
      <label for="${entryDropdown.value}-${entryNumber}-calories">Meal ${entryNumber} Calories</label>
      <input
        type="number"
        min="0"
        id="${entryDropdown.value}-${entryNumber}-calories"
        placeholder="Calories"
      />
      </div>`;
      targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
    }
  }
}



/*const addEntryFromInput = (list : []) => {

  if(list.length) {
    const category = list[0].id.split("-")[0];
    const targetContainer = document.querySelector(`#${category} .input-container`);

    for(let i = 0; i < list.length; i++) {
      const entryNumber = list[i].id.split('-')[1];
      const value = list[i].value;
      const HTMLString = `
      <div class="meal-container">
      <label for="${category}-${entryNumber}-calories">${category === 'exercise' ? 'Exercise' : 'Meal'} ${entryNumber} Calories</label>
      <input
        type="number"
        min="0"
        id="${category}-${entryNumber}-calories"
        placeholder="Calories"
        value="${value}"
      />
      </div>`;
      targetContainer.insertAdjacentHTML('beforeend', HTMLString); 
    }
  }
};

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories >= 0 ? 'Deficit' : 'Surplus';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;


  console.log(breakfastNumberInputs);
  createData(budgetCalories ,remainingCalories, exerciseCalories, currentDate,
    arrayFromList(breakfastNumberInputs), arrayFromList(lunchNumberInputs),
    arrayFromList(dinnerNumberInputs), arrayFromList(snacksNumberInputs),
    arrayFromList(exerciseNumberInputs));
  insertCalorieData(currentDate, remainingCalories);
  output.classList.remove('hide');
}

const arrayFromList = (list) => {
  const arr = [];

  for(i = 0; i < list.length; i++) {
    const obj = {
      id: list[i].id,
      value: list[i].value
    }

    arr.push(obj);
  }

  return arr;
}

const createData = (budget, calorieBalance, caloriesBurned, date, breakfastList, lunchList, dinnerList, snackList, exerciseList) => {
  const dataArrIndex = journalData.findIndex( item => item.id === date);
  
  const dataObj = {
    id : date,
    balance: calorieBalance,
    burned: caloriesBurned,
    budget: budget,
    calories: [breakfastList, lunchList, dinnerList, snackList, exerciseList]
  };

  if(dataArrIndex === -1) {
    journalData.push(dataObj);
  } else {
    journalData[dataArrIndex] = dataObj;
  }



  localStorage.setItem("data", JSON.stringify(journalData));
  //update the counter and calendar
  console.log(dataObj);
  console.log(JSON.parse(localStorage.getItem("data")));
};

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (let i = 0; i < list.length; i++) {
    const currVal = cleanInputString(list[i].value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (let i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

const deleteDay = (dateToDelete) => {
  if(journalData.length !== 0) {
    for(let i = 0; i < journalData.length; i++) {
      if(journalData[i].id === dateToDelete) {
        journalData.splice(i, 1);
        console.log("yes");
      }
    }
  }

  localStorage.setItem("data", JSON.stringify(journalData));
  calendar.innerHTML = "";
  generateCalendar();
  let currentDate = `${today}-${month}-${year}`;
  const currentDatearray = currentDate.split('-');
  currentFullDate.innerText = `${days[new Date(currentDatearray[2], currentDatearray[1], currentDatearray[0]).getDay()]}  ${currentDatearray[0]} ${months[currentDatearray[1]]} ${currentDatearray[2]}`

  updateForm();
}

const insertCalorieData = (day, calorieBalance) => {
  const targetDay = document.getElementById(day);
  const stringHTML = `
  <div class="day-number">
    ${day.split('-')[0]}
  </div>
  <div class="calorie-data ${calorieBalance >= 0 ? "deficit" : "surplus"}">
      ${Math.abs(calorieBalance)}
  </div>`;

  targetDay.innerHTML = stringHTML;

}; 

const updateForm = () => {
  if(journalData.length !== 0) {
    for(let i = 0; i < journalData.length; i++) {
      if(journalData[i].id.split('-')[1] == month){
        console.log("why");
        insertCalorieData(journalData[i].id, journalData[i].balance);
      }
    }

    for(let i = 0; i < journalData.length; i++) {
      if(journalData[i].id === currentDate) {
        console.log(journalData[i], i);
        clearForm();

        budgetNumberInput.value = journalData[i].budget;
        for(let j = 0; j < journalData[i].calories.length; j++) {
          addEntryFromInput(journalData[i].calories[j]);
        }
        break;
      } else {
        clearForm();
      }
    }
  }
};

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", () => {
  deleteDay(currentDate);
  clearForm();
});
deleteStorageButton.addEventListener("click", () => {
  localStorage.clear();
})

updateForm();*/
