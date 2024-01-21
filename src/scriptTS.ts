//hide insturctions
document.querySelector(".instructions")?.classList.add("hide");
//hide instructions

let year = new Date().getFullYear();
let month = new Date().getMonth();
let today = new Date().getDate();

const calendar = document.querySelector<HTMLElement>(".calendar-body");
const currentMonth = document.querySelector<HTMLElement>(".current-month");
const currentYear = document.querySelector<HTMLElement>(".current-year");
const navButtons = document.querySelectorAll<HTMLElement>(".calendar-navigation span");
const currentFullDate = document.querySelector<HTMLElement>(".current-full-date");

const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const day_classes = {
    today: "today",
    weekend: "weekend",
    workday: "workday"
}

const dateDate = `${today}-${month}-${year}`;
let currentDate = `${today}-${month}-${year}`;

currentMonth ? currentMonth.textContent = months[month] : 'undefined';
currentYear  ? currentYear.textContent = year.toString() : 'undefined';
currentFullDate ? currentFullDate.textContent = `${days[new Date(year, month, today).getDay()]} ${today} ${months[month]} ${year}` 
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
        addClickEvent();
    }

    console.log(calendar);
};
    
const addClickEvent = () => {
      const daysToClick = document.querySelectorAll(".day");
      
      for(let i = 0; i < daysToClick.length; i++) {
        daysToClick[i].addEventListener("click", () => {
          if(document.querySelector(".today")) {
            document.querySelector(".today")?.classList.remove("today");
          }
          daysToClick[i].classList.add("today");
    
          currentDate = daysToClick[i].querySelector(".day-number") ? `${daysToClick[i].querySelector(".day-number")?.textContent}-${month}-${year}` : `${daysToClick[i].textContent}-${month}-${year}`;
    
          const currentDatearray = currentDate.split('-');
          currentFullDate ? currentFullDate.textContent = `${days[new Date(+currentDatearray[2], +currentDatearray[1], +currentDatearray[0]).getDay()]}  ${currentDatearray[0]} ${months[+currentDatearray[1]]} ${currentDatearray[2]}`
           : `undefined`;
    
          //updateForm();
        });
      }
    
};

generateCalendar();

/*const calendar = document.querySelector<HTMLElement>(".calendar-body");
const currentMonth = document.querySelector<HTMLElement>(".current-month");
const currentYear = document.querySelector<HTMLElement>(".current-year");
const currentFullDate = document.querySelector<HTMLElement>(".current-full-date");

const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];

const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DAY_CLASSES = {
  TODAY: "today",
  WEEKEND: "weekend",
  WORKDAY: "workday",
};

let selectedDate: string;

currentMonth?.textContent = months[new Date().getMonth()];
currentYear?.textContent = new Date().getFullYear().toString();
currentFullDate?.textContent = getFormattedFullDate(new Date());

const generateCalendar = () => {
  if (calendar) {
    const dateLast_MonthPrev = new Date(year, month, 0).getDate();
    const dateLast = new Date(year, month + 1, 0).getDate();
    const dayFirst = new Date(year, month, 1).getDay();
    const dayLast = new Date(year, month, dateLast).getDay();

    for (let i = 1; i <= dateLast; i++) {
      const day = new Date(year, month, i).getDay();

      if (i === 1 && day !== 1) {
        // ... (previous code)
      }

      const dayClass = day === 0 || day === 6 ? DAY_CLASSES.WEEKEND : DAY_CLASSES.WORKDAY;

      // ... (previous code)
    }

    if (dayLast !== 0) {
      for (let i = dayLast + 1; i <= 7; i++) {
        // ... (previous code)
      }
    }
    addClickEvent();
  }
  console.log(calendar);
};

const addClickEvent = () => {
  const calendarContainer = document.querySelector<HTMLElement>(".calendar-body");

  calendarContainer?.addEventListener("click", (event) => {
    const clickedDay = (event.target as HTMLElement).closest(".day");
    if (clickedDay) {
      const daysToClick = document.querySelectorAll<HTMLElement>(".day");
      daysToClick.forEach(day => day.classList.remove(DAY_CLASSES.TODAY));

      clickedDay.classList.add(DAY_CLASSES.TODAY);

      selectedDate = clickedDay.textContent
        ? `${clickedDay.textContent}-${month}-${year}`
        : `${clickedDay.querySelector<HTMLElement>(".day-number")?.textContent}-${month}-${year}`;

      const currentDateArray = selectedDate.split('-');
      currentFullDate?.textContent = `${days[new Date(+currentDateArray[2], +currentDateArray[1], +currentDateArray[0]).getDay()]}  ${currentDateArray[0]} ${months[+currentDateArray[1]]} ${currentDateArray[2]}`;
      //updateForm();
    }
  });
};

const getFormattedFullDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${days[date.getDay()]} ${day} ${months[month]} ${year}`;
};

generateCalendar();*/
