<template>
  <div class = "calendar-heading">
    <h1>My Calendar</h1>
  </div>
  <div class="container">
    <div class="left">
      <div class="calendar">
        <div class="month">
          <head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
              integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />
          </head>
          <i class="fas fa-angle-left prev" @click="prevMonth"></i>
          <div class="date">{{ monthYear }}</div>
          <i class="fas fa-angle-right next" @click="nextMonth"></i>
        </div>
        <div class="weekdays">
          <div v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
        </div>
        <div class="days">
          <div
            v-for="(day, index) in daysOfMonth"
            :key="index"
            :class="['day', day.class, { event: day.hasEvent }]"
            @click="selectDay(day)"
          >
            <span>{{ day.date }}</span>
            <!-- <span v-if="day.hasEvent" class="event-dot"></span> -->
          </div>
        </div>
        <div class="goto-today">
          <div class="goto">
            <input type="text" placeholder="mm/yyyy" class="date-input" v-model="inputDate" @keyup="formatInputDate" />
            <button class="goto-btn" @click="gotoDate">Go</button>
          </div>
          <button class="today-btn" @click="goToToday">Today</button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="today-date">
        <div class="event-day">{{ selectedDayString }}</div>
        <div class="event-date">{{ selectedDateString }}</div>
      </div>
      <div class="events">
        <div v-for="(event, index) in eventsOfSelectedDay" :key="event.id" class="event" @click="deleteEvent(event.id)">
          <button @click.stop="editEvent(event, index)" class = "edit-event-btn">Edit</button>
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">{{ event.title }}</h3>
          </div>
          <div class="event-time">
            <span class="event-time">{{ event.startTime }} to {{ event.endTime }}</span>
          </div>
        </div>

        <div v-if="editingEvent" class="event-form-wrapper active">
          <div class="event-form-header">
            <div class="title">Edit Event</div>
            <i class="fas fa-times close" @click="closeEditForm"></i>
          </div>
          <div class="event-form-body">
            <div class="event-form-input">
              <input type="text" placeholder="Event Name" class="event-name" v-model="editingEvent.title" />
            </div>
            <div class="event-form-input">
              <input
                type="text"
                placeholder="Event Time From"
                class="event-time-from"
                v-model="editingEvent.startTime"
                @blur="validateTimes"
              />
            </div>
            <div class="event-form-input">
              <input
                type="text"
                placeholder="Event Time To"
                class="event-time-to"
                v-model="editingEvent.endTime"
                @blur="validateTimes"
              />
            </div>
          </div>
          <div class="event-form-footer">
            <button class="save-event-btn" @click="saveEvent">Save Changes</button>
          </div>
        </div>

        <div v-if="eventsOfSelectedDay.length === 0" class="no-event">
          <h3>No Events</h3>
        </div>
      </div>
      <button class="add-event" @click="toggleAddEvent">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div v-if="showAddEvent" class="add-event-wrapper active">
      <div class="add-event-header">
        <div class="title">Add Event</div>
        <i class="fas fa-times close" @click="toggleAddEvent"></i>
      </div>
      <div class="add-event-body">
        <div class="add-event-input">
          <input type="text" placeholder="Event Name" class="event-name" v-model="newEvent.title" />
        </div>
        <div class="add-event-input">
          <input
            type="text"
            placeholder="Event Time From"
            class="event-time-from"
            v-model="newEvent.startTime"
            @blur="validateTimes"
          />
        </div>
        <div class="add-event-input">
          <input
            type="text"
            placeholder="Event Time To"
            class="event-time-to"
            v-model="newEvent.endTime"
            @blur="validateTimes"
          />
        </div>
      </div>
      <div class="add-event-footer">
        <button class="add-event-btn" @click="addEvent">Add Event</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../scripts/firebase.js'; // Import the auth instance
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions

export default {
  name: "MyCalendar",
  data() {
    return {
      today: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDay: new Date().getDate(),
      events: [],
      showAddEvent: false,
      newEvent: { title: '', startTime: '', endTime: '' },
      inputDate: '',
      timeError: '',
      editingEvent: null,
    };
  },
  watch: {
    'newEvent.startTime'(newValue) {
      this.newEvent.startTime = this.formatTime(newValue);
    },
    'newEvent.endTime'(newValue) {
      this.newEvent.endTime = this.formatTime(newValue);
    },

  },
  computed: {
    monthYear() {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return `${months[this.currentMonth]} ${this.currentYear}`;
    },
    weekdays() {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    },
    daysOfMonth() {
      const days = [];
      const totalDaysOfPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
      const firstDayOfCurrentMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const totalDaysOfCurrentMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const daysOfNextMonthToShow = 7 - new Date(this.currentYear, this.currentMonth, totalDaysOfCurrentMonth).getDay() - 1;

      // Days from the previous month
      for (let i = firstDayOfCurrentMonth; i > 0; i--) {
        days.push({
          date: totalDaysOfPrevMonth - i + 1,
          class: "prev-date",
        });
      }

      // Days of the current month
      for (let i = 1; i <= totalDaysOfCurrentMonth; i++) {
        let hasEvent = this.hasEvent(i, this.currentMonth, this.currentYear); 
        days.push({
          date: i,
          class: this.selectedDay === i ? "active" : "",
          hasEvent, 
        });
      }

      // Days from the next month
      for (let i = 1; i <= daysOfNextMonthToShow; i++) {
        days.push({
          date: i,
          class: "next-date",
        });
      }

      this.events.forEach(event => {
        const eventDate = event.date.getDate();
        const eventMonth = event.date.getMonth();
        const eventYear = event.date.getFullYear();

        const foundDay = days.find(day => day.date === eventDate && day.month === eventMonth && day.year === eventYear);
        if (foundDay) {
          foundDay.hasEvent = true;
        }
      });

      return days;
    },
    selectedDayString() {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const date = new Date(this.currentYear, this.currentMonth, this.selectedDay);
      return dayNames[date.getDay()];
    },
    selectedDateString() {
      return `${this.selectedDay} ${this.monthYear}`;
    },
    eventsOfSelectedDay() {
      return this.events.filter(
        event =>
          event.date.getDate() === this.selectedDay &&
          event.date.getMonth() === this.currentMonth &&
          event.date.getFullYear() === this.currentYear
      );
    },
  },
  methods: {
    closeEditForm() {
      this.editingEvent = null; // This will close the edit form
    },
    editEvent(event, index) {
      // Set the editing event to the selected event
      this.editingEvent = { ...event, index };
      // Now, you can use editingEvent to bind to your form fields
    },
    saveEvent() {
      const eventRef = doc(db, 'events', this.editingEvent.id);
      updateDoc(eventRef, {
        title: this.editingEvent.title,
        startTime: this.editingEvent.startTime,
        endTime: this.editingEvent.endTime,
        // Any other properties you want to update
      }).then(() => {
        console.log('Event updated successfully');
        // Reload your events here or update the local state
        this.fetchEvents();
      }).catch(error => {
        console.error('Error updating event: ', error);
      });
    },
    convertTimeToDate(timeStr) {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date(this.currentYear, this.currentMonth, this.selectedDay, parseInt(hours), parseInt(minutes));
      return date;
    },
    validateTimes() {
      const startTime = this.convertTimeToDate(this.newEvent.startTime);
      const endTime = this.convertTimeToDate(this.newEvent.endTime);

      if (startTime >= endTime) {
        this.timeError = 'End time must be later than start time.';
      } else {
        this.timeError = ''; // Clear the error message if times are valid
      }
    },
    toggleAddEvent() {
      this.showAddEvent = !this.showAddEvent;
    },
    addEvent() {
      const startTime = this.convertTimeToDate(this.newEvent.startTime);
      const endTime = this.convertTimeToDate(this.newEvent.endTime);

      if (endTime <= startTime) {
        alert('The end time must be after the start time.');
        return; // Stop the method if times are not valid
      }
      try {
          // Check if user is authenticated
          const user = auth.currentUser;
          if (!user) {
              alert('Please log in to add events.');
              return;
          }

          // Validate event data
          if (!this.newEvent.title || !this.newEvent.startTime || !this.newEvent.endTime) {
              alert('Please fill in all fields.');
              return;
          }

          // Get a reference to the events collection
          const eventsRef = collection(db, 'events'); // Assuming 'events' is the name of your collection

          // Add a new document to the events collection with user's ID
          addDoc(eventsRef, {
              userId: user.uid,
              title: this.newEvent.title,
              startTime: this.newEvent.startTime,
              endTime: this.newEvent.endTime,
              date: new Date(this.currentYear, this.currentMonth, this.selectedDay), // Make sure this creates a Date object
              // Add other event data properties as needed
          });

          console.log('Event added successfully!');
          
          // Clear input fields and hide add event form
          this.newEvent = { title: '', startTime: '', endTime: '' };
          this.showAddEvent = false;
      } catch (error) {
          console.error('Error adding event: ', error);
      }
      this.fetchEvents();
    },
    async fetchEvents() {
      try {
        // Check if user is authenticated
        const user = auth.currentUser;
        if (!user) {
          alert('Please log in to fetch events.');
          return;
        }

        // Create a query to get events for the current user
        const q = query(collection(db, 'events'), where('userId', '==', user.uid));

        // Fetch events from Firestore
        const querySnapshot = await getDocs(q);

        // Update the events array with fetched events
        this.events = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate() // Convert timestamp to Date object
          }));
        console.log(this.events)
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
    },
    selectDay(day) {
      this.selectedDay = day.date;
      if (day.class.includes("prev-date")) {
        this.prevMonth();
      } else if (day.class.includes("next-date")) {
        this.nextMonth();
      }
    },
    goToToday() {
      this.currentMonth = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      this.selectedDay = new Date().getDate();
    },
    formatInputDate(event) {
      let rawInput = this.inputDate.replace(/[^0-9]/g, ""); // Strip all non-numeric characters
      let formatted = "";

      // Add a slash after the month (first two digits)
      if (rawInput.length > 2) {
        formatted = rawInput.substring(0, 2) + '/' + rawInput.substring(2);
      } else {
        formatted = rawInput;
      }

      // Prevent the formatted string from exceeding 7 characters (mm/yyyy)
      if (formatted.length > 7) {
        formatted = formatted.substring(0, 7);
      }

      // Allow deletion of the slash if backspacing
      if (event.keyCode === 8 && this.inputDate.endsWith('/')) {
        formatted = formatted.substring(0, formatted.length - 1);
      }

      // Only update if there's a change to reduce Vue reactivity overhead
      if (formatted !== this.inputDate) {
        this.inputDate = formatted;
      }
    },
    gotoDate() {
      const dateArr = this.inputDate.split("/");
      if (dateArr.length === 2) {
        const month = parseInt(dateArr[0], 10) - 1;
        const year = parseInt(dateArr[1], 10);
        if (month >= 0 && month < 12 && year.toString().length === 4) {
          this.currentMonth = month;
          this.currentYear = year;
          // Assuming initCalendar method updates the component based on currentMonth and currentYear
          // No need to call initCalendar() if you're using Vue's reactivity and computed properties correctly
          return;
        }
      }
      alert("Invalid Date");
    },
    async deleteEvent(eventId) {
      try {
        // Delete the event from Firestore
        console.log(eventId); // Log the id to ensure the correct id is passed
        // Delete the document from Firestore using its ID
        // Assuming 'events' is the name of your collection
        await deleteDoc(doc(db, 'events', eventId));

        // Fetch events again after deleting an event
        await this.fetchEvents();
      } catch (error) {
        console.error('Error deleting event: ', error);
      }
    },
    hasEvent(date, month, year) {
      return this.events.some(event => 
        event.date.getDate() === date && 
        event.date.getMonth() === month &&
        event.date.getFullYear() === year
      );
    },
    formatTime(value) {
      let numericValue = value.replace(/\D/g, '').substring(0, 4); // Remove non-digits and limit length
      let formattedValue = '';
      let hours = '';
      let minutes = '';

      // Determine the hours and minutes based on the length of numeric input
      if (numericValue.length > 2) {
        hours = numericValue.substring(0, 2);  // First two digits for hours
        minutes = numericValue.substring(2, 4); // Next two digits for minutes
      } else {
        hours = numericValue.substring(0, 2);  // All digits considered as hours if less than 2
      }

      // Pad hours if two digits are entered
      if (hours.length === 2) {
        let numericHours = parseInt(hours, 10);
        if (numericHours > 23) numericHours = 23; // Cap hours at 23
        hours = numericHours.toString().padStart(2, '0');
      }

      // Pad minutes if two digits are entered
      if (minutes.length === 2) {
        let numericMinutes = parseInt(minutes, 10);
        if (numericMinutes > 59) numericMinutes = 59; // Cap minutes at 59
        minutes = numericMinutes.toString().padStart(2, '0');
      }

      // Combine hours and minutes with colon
      if (hours.length === 2 && minutes) {
        formattedValue = `${hours}:${minutes}`;
      } else {
        formattedValue = hours;
        if (hours.length === 2 && numericValue.length >= 2) {
          formattedValue += ':'; // Append colon when two digits for hours are entered
        }
      }

      return formattedValue;
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>

<style scoped>
:root {
--primary-clr: #b38add;
}
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Poppins", sans-serif;
}
/* nice scroll bar */
::-webkit-scrollbar {
width: 5px;
}
::-webkit-scrollbar-track {
background: #f5f5f5;
border-radius: 50px;
}
::-webkit-scrollbar-thumb {
background: var(--primary-clr);
border-radius: 50px;
}

body {
position: relative;
min-height: 100vh;
display: flex;
align-items: center;
justify-content: flex-start;
flex-direction: column;
padding-bottom: 30px;
background-color: #e2e1dc;
}
.calendar-heading {
  display: flex;
  width: 0%;
  margin-bottom: 20px;
  margin-top: 30px; /* Spacing between the header and the calendar */
  margin-left: 20px;
}
.calendar-heading h1 {
  font-size: 10px;
  white-space: nowrap; /* Prevents the text from wrapping */
}

@media screen and (max-width: 768px) { /* Adjust as needed */
  .calendar-heading h1 {
    font-size: smaller; /* or any specific size */
  }
}

.calendar-heading h1 {
  font-size: 2.5rem;
  color: var(--primary-clr);
}
.container {
position: relative;
width: 1200px;
margin-right: auto;
margin-left: 0;
min-height: 850px;
padding: 5px;
color: #fff;
display: flex;
border-radius: 10px;
background-color: #373c4f;
margin-bottom: 30%;
transform: scale(0.9);
margin-top: 5%;
}
.left {
width: 60%;
padding: 20px;
}
.calendar {
position: relative;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: space-between;
color: #878895;
border-radius: 5px;
background-color: #fff;
}
/* set after behind the main element */
.calendar::before,
.calendar::after {
content: "";
position: absolute;
top: 50%;
left: 100%;
width: 12px;
height: 97%;
border-radius: 0 5px 5px 0;
background-color: #d3d4d6d7;
transform: translateY(-50%);
}
.calendar::before {
height: 94%;
left: calc(100% + 12px);
background-color: rgb(153, 153, 153);
}
.calendar .month {
width: 100%;
height: 150px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 50px;
font-size: 1.2rem;
font-weight: 500;
text-transform: capitalize;
}
.calendar .month .prev,
.calendar .month .next {
cursor: pointer;
}
.calendar .month .prev:hover,
.calendar .month .next:hover {
color: var(--primary-clr);
}
.calendar .weekdays {
width: 100%;
height: 100px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 20px;
font-size: 1rem;
font-weight: 500;
text-transform: capitalize;
}
.weekdays div {
width: 14.28%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
}
.calendar .days {
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
padding: 0 20px;
font-size: 1rem;
font-weight: 500;
margin-bottom: 20px;
}
.calendar .days .day {
width: 14.28%;
height: 90px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: var(--primary-clr);
border: 1px solid #f5f5f5;
}
.calendar .days .day:nth-child(7n + 1) {
border-left: 2px solid #f5f5f5;
}
.calendar .days .day:nth-child(7n) {
border-right: 2px solid #f5f5f5;
}
.calendar .days .day:nth-child(-n + 7) {
border-top: 2px solid #f5f5f5;
}
.calendar .days .day:nth-child(n + 29) {
border-bottom: 2px solid #f5f5f5;
}

.calendar .days .day:not(.prev-date, .next-date):hover {
color: purple;
background-color: var(--primary-clr);
}
.calendar .days .prev-date,
.calendar .days .next-date {
color: #b3b3b3;
}
.calendar .days .active {
position: relative;
font-size: 2rem;
color: purple;
background-color: var(--primary-clr);
}
.calendar .days .active::before {
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
box-shadow: 0 0 10px 2px black;
}
.calendar .days .today {
font-size: 2rem;
}
.calendar .days .event {
position: relative;
}
.calendar .days .event::after {
content: "";
position: absolute;
bottom: 10%;
left: 50%;
width: 75%;
height: 6px;
border-radius: 30px;
transform: translateX(-50%);
background-color: purple;
}
.calendar .days .day:hover.event::after {
background-color: purple;
}

.calendar .days .active.event::after {
background-color: purple;
bottom: 20%;
}
.calendar .days .active.event {
padding-bottom: 10px;
}
.calendar .goto-today {
width: 100%;
height: 50px;
display: flex;
align-items: center;
justify-content: space-between;
gap: 5px;
padding: 0 20px;
margin-bottom: 20px;
color: var(--primary-clr);
}
.calendar .goto-today .goto {
display: flex;
align-items: center;
border-radius: 5px;
overflow: hidden;
border: 1px solid var(--primary-clr);
}
.calendar .goto-today .goto .date-input {
  border: 1px solid black;
}
.calendar .goto-today .goto .goto-btn {
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px;
  margin-left: 2px;
}
.calendar .goto-today .goto input {
width: 100%;
height: 30px;
outline: none;
border: none;
border-radius: 5px;
padding: 0 20px;
color: var(--primary-clr);
border-radius: 5px;
}
.calendar .goto-today button {
padding: 5px 10px;
border: 1px solid var(--primary-clr);
border-radius: 5px;
background-color: transparent;
cursor: pointer;
color: var(--primary-clr);
}
.calendar .goto-today button:hover {
color: red;
background-color: var(--primary-clr);
}
.calendar .goto-today .goto button {
border: none;
border-left: 1px solid var(--primary-clr);
border-radius: 0;
}
.container .right {
position: relative;
width: 40%;
min-height: 100%;
padding: 20px 0;
}

.right .today-date {
width: 100%;
height: 50px;
display: flex;
flex-wrap: wrap;
gap: 10px;
align-items: center;
justify-content: space-between;
padding: 0 40px;
padding-left: 70px;
margin-top: 50px;
margin-bottom: 20px;
text-transform: capitalize;
}
.right .today-date .event-day {
font-size: 2rem;
font-weight: 500;
}
.right .today-date .event-date {
font-size: 1rem;
font-weight: 400;
color: #878895;
}
.events {
width: 100%;
height: 100%;
max-height: 600px;
overflow-x: hidden;
overflow-y: auto;
display: flex;
flex-direction: column;
padding-left: 4px;
}
.events .event {
position: relative;
width: 95%;
min-height: 70px;
display: flex;
justify-content: center;
flex-direction: column;
gap: 5px;
padding: 0 20px;
padding-left: 50px;
color: #fff;
background: linear-gradient(90deg, #3f4458, transparent);
cursor: pointer;
}
/* even event */
.events .event:nth-child(even) {
background: transparent;
}
.events .event:hover {
background: linear-gradient(90deg, var(--primary-clr), transparent);
}
.events .event .title {
display: flex;
align-items: center;
pointer-events: none;
}
.events .event .title .event-title {
font-size: 1rem;
font-weight: 400;
margin-left: 20px;
}
.events .event i {
color: var(--primary-clr);
font-size: 0.5rem;
}
.events .event:hover i {
color: #fff;
}
.events .event .event-time {
font-size: 0.8rem;
font-weight: 400;
color: #878895;
margin-left: 15px;
pointer-events: none;
}
.events .event:hover .event-time{
color: #fff;
}
/* add tick in event after */
.events .event::after {
content: "✓";
position: absolute;
top: 50%;
right: 0;
font-size: 3rem;
line-height: 1;
display: none;
align-items: center;
justify-content: center;
opacity: 0.3;
color: var(--primary-clr);
transform: translateY(-50%);
}
.events .event:hover::after {
display: flex;
}

.add-event {
position: absolute;
bottom: 30px;
right: 30px;
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
font-size: 1rem;
color: #878895;
border: 2px solid #878895;
opacity: 0.5;
border-radius: 50%;
background-color: transparent;
cursor: pointer;
}
.add-event:hover {
opacity: 1;
}
.add-event i {
pointer-events: none;
}
.events .no-event {
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
font-weight: 500;
color: #878895;
}

.event-form-wrapper,
.add-event-wrapper {
position: absolute;
bottom: 100px;
left: 80%;
width: 30%;
max-height: 0;
overflow: hidden;
border-radius: 5px;
background-color: #fff;
transform: translateX(-50%);
transition: max-height 0.5s ease;
}
.event-form-wrapper {
  width: 70%;
  transform: translateX(-90%);
}
.event-form-wrapper.active,
.add-event-wrapper.active {
max-height: 300px;
}

.event-form-header,
.add-event-header {
width: 100%;
height: 50px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 20px;
color: #373c4f;
border-bottom: 1px solid #f5f5f5;
}
.event-form-header.close,
.add-event-header .close {
font-size: 1.5rem;
cursor: pointer;
}

.event-form-header .close:hover,
.add-event-header .close:hover {
color: var(--primary-clr);
}

.event-form-header .title,
.add-event-header .title {
font-size: 1.2rem;
font-weight: 500;
}
.event-form-body,
.add-event-body {
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
gap: 5px;
padding: 20px;
}
.event-form-body .event-form-input,
.add-event-body .add-event-input {
width: 100%;
height: 40px;
display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
}

.event-form-body .event-form-input input,
.add-event-body .add-event-input input {
width: 100%;
height: 100%;
outline: none;
border: none;
border-bottom: 1px solid #f5f5f5;
padding: 0 10px;
font-size: 1rem;
font-weight: 400;
color: #373c4f;
}
.event-form-body .event-form-input input::placeholder,
.add-event-body .add-event-input input::placeholder {
color: #a5a5a5;
}
.event-form-body .event-form-input input:focus,
.add-event-body .add-event-input input:focus {
border-bottom: 1px solid var(--primary-clr);
}
.event-form-body .event-form-input input:focus::placeholder,
.add-event-body .add-event-input input:focus::placeholder {
color: var(--primary-clr);
}
.event-form-footer,
.add-event-footer {
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
}
.event-form-footer .save-event-btn,
.add-event-footer .add-event-btn {
height: 40px;
font-size: 1rem;
font-weight: 500;
outline: none;
border: none;
color: purple;
background-color: var(--primary-clr);
border-radius: 5px;
cursor: pointer;
padding: 5px 10px;
border: 1px solid grey;
}
.event-form-footer .save-event-btn:hover,
.add-event-footer .add-event-btn:hover {
background-color: transparent;
color: purple;
box-shadow: 0 0 10px 2px grey;
}

.edit-event-btn {
  position: absolute; /* Position the button absolutely within the .event div which should be relative */
  left: 250px; /* Distance from the right edge of the .event div */
  top: 20px; /* Distance from the top edge of the .event div */
  padding: 5px 10px; /* Padding inside the button */
  background-color: #f5f5f5; /* Light grey background */
  color: #373c4f; /* Dark grey text color */
  border: none; /* No border */
  border-radius: 5px; /* Slightly rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 0.8rem; /* Smaller font size */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Slight shadow for a 3D effect */
}


/* media queries */

@media screen and (max-width: 1000px) {
body {
  align-items: flex-start;
  justify-content: flex-start;
}
.container {
  min-height: 100vh;
  flex-direction: column;
  border-radius: 0;
}
.container .left {
  width: 100%;
  height: 100%;
  padding: 20px 0;
}
.container .right {
  width: 100%;
  height: 100%;
  padding: 20px 0;
}
.calendar::before,
.calendar::after {
  top: 100%;
  left: 50%;
  width: 97%;
  height: 12px;
  border-radius: 0 0 5px 5px;
  transform: translateX(-50%);
}
.calendar::before {
  width: 94%;
  top: calc(100% + 12px);
}
.events {
  padding-bottom: 340px;
}
.add-event-wrapper {
  bottom: 100px;
}
}
@media screen and (max-width: 500px) {
.calendar .month {
  height: 75px;
}
.calendar .weekdays {
  height: 50px;
}
.calendar .days .day {
  height: 40px;
  font-size: 0.8rem;
}
.calendar .days .day.active,
.calendar .days .day.today {
  font-size: 1rem;
}
.right .today-date {
  padding: 20px;
}
}

.credits {
position: absolute;
bottom: 0;
left: 0;
right: 0;
text-align: center;
padding: 10px;
font-size: 12px;
color: #fff;
background-color: #b38add;
}
.credits a {
color: #fff;
text-decoration: none;
font-weight: 600;
}
.credits a:hover {
text-decoration: underline;
}
.event-dot {
  width: 10px; /* Adjust the width */
  height: 10px; /* Adjust the height */
  background-color: red; /* Or any color you prefer */
  border-radius: 50%; /* Ensures it's a circle */
  display: inline-block; /* Allows it to be placed inline with the date */
  margin-left: 5px; /* Adjust the spacing between the date and the dot */
}
</style>




<!-- <template>
    <div class = "title">
        <h1>Calendar</h1>
    </div>

</template>

<script>
export default {
    name: "Calendar",
};
</script>

<style scoped>
.title {
    margin: 30px 0px 0px 40px;
}
</style> -->