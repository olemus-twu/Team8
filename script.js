let currentDate = new Date(); // get date
let currentMonth = currentDate.getMonth(); // get month
let currentYear = currentDate.getFullYear(); // get year

const calendarMonthElement = document.getElementById('calendar-month');
const calendarGridElement = document.getElementById('calendar-grid');
const eventsListElement = document.getElementById('events-list');

// generate the calendar for the given month/year
function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay(); // get the starting day of the month
    
    // update the month/year header
    calendarMonthElement.innerHTML = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

    // clear previous grid
    calendarGridElement.innerHTML = '';

    // empty cells for the days before first day
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGridElement.appendChild(emptyCell);
    }

    // generate days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.innerText = day;

        // check if there's an event
        const event = getEventForDay(day);
        if (event) {
            dayElement.style.backgroundColor = event.color;
        }

        calendarGridElement.appendChild(dayElement);
    }

    // display upcoming events
    displayUpcomingEvents();
}

// change the month when navigating
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

// store event details
function saveEvent(eventDate, eventName, eventColor) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ date: eventDate, name: eventName, color: eventColor });
    localStorage.setItem('events', JSON.stringify(events));
}

// retrieve events
function getEventForDay(day) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    return events.find(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });
}

// display upcoming events in the events list
function displayUpcomingEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    eventsListElement.innerHTML = ''; // clear previous list

    events.forEach(event => {
        const eventDate = new Date(event.date);
        const eventItem = document.createElement('li');
        eventItem.innerText = `${eventDate.toLocaleDateString()} - ${event.name}`;
        eventsListElement.appendChild(eventItem);
    });
}

// initial calendar load
generateCalendar(currentMonth, currentYear);
