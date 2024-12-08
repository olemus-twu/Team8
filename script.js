// script.js
let currentDate = new Date();

// Persist events to localStorage
export function persistEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    localStorage.setItem("events", JSON.stringify(events)); // Persist daily
}

// Render calendar and include event updates
export function renderCalendar(monthOffset = 0) {
    currentDate.setMonth(currentDate.getMonth() + monthOffset);
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const grid = document.getElementById("calendar-grid");
    grid.innerHTML = "";

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    // Add the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayString = `${year}-${month + 1}-${day}`;
        const dayEvents = getEventsForDay(dayString);
        let eventHtml = "";

        dayEvents.forEach(event => {
            eventHtml += `<div class="event-dot" style="background-color: ${event.color};" title="${event.name}"></div>`;
        });

        grid.innerHTML += `
            <div class="calendar-day" data-day="${day}" data-date="${dayString}">
                ${day}
                ${eventHtml}
            </div>
        `;
    }

    // Add event listeners to day cells
    document.querySelectorAll(".calendar-day").forEach(cell => {
        cell.addEventListener("click", function () {
            const day = this.getAttribute("data-day");
            const date = this.getAttribute("data-date");
            displayDayEvents(day, date);
        });
    });

    displayUpcomingEvents();
    persistEvents(); // Ensure daily persistence
}

// Get events for a specific day
function getEventsForDay(date) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    return events.filter(event => event.date === date);
}

// Display day events in an alert
function displayDayEvents(day, date) {
    const dayEvents = getEventsForDay(date);
    if (dayEvents.length === 0) {
        alert(`No events for ${day}`);
    } else {
        let eventDetails = `Events on ${date}:\n`;
        dayEvents.forEach(event => {
            eventDetails += `${event.name} at ${event.time}: ${event.description}\n`;
        });
        alert(eventDetails);
    }
}

// Display upcoming events
function displayUpcomingEvents() {
    const upcomingEventsContainer = document.getElementById("upcoming-events");
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const upcomingEvents = events.filter(event => new Date(`${event.date}T${event.time}`) > new Date());

    upcomingEventsContainer.innerHTML = "<h3>Upcoming Events</h3>";

    if (upcomingEvents.length === 0) {
        upcomingEventsContainer.innerHTML += "<p>No upcoming events</p>";
    } else {
        upcomingEvents.forEach(event => {
            upcomingEventsContainer.innerHTML += `
                <p>${event.name} - ${event.date} at ${event.time} <span style="color: ${event.color};">●</span></p>
            `;
        });
    }
}

// Initialize calendar on load
renderCalendar();
