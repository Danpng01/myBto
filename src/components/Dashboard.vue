<template>
  <div class="dashboard-container">
    <div class="header">
      <h1 class="title">My Dashboard</h1>
      <v-btn icon class="notification-button" @click="toggleNotifications">
        <v-badge
          color="red"
          :content="upcomingEventCount"
          overlap
          offset-x="-5"
          offset-y="-5"
          v-if="upcomingEventCount > 0"
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
        <v-icon v-else>mdi-bell-outline</v-icon>
      </v-btn>
      <div v-if="showNotifications" class="notifications-container">
        <div v-if="loadingEvents" class="notification-title">Fetching events...</div>
        <template v-else>
        <!-- We use a template tag here so that it does not render an actual DOM element -->
        <div v-if="events.length > 0">
          <h2 class="notification-title">{{ eventTitle }}</h2>
          <div v-for="event in events" :key="event.id" class="notification-item">
            {{ event.title }} - {{ event.date }}
          </div>
        </div>
          <h2 class="notification-title" v-else> -- No events -- </h2>
        </template>

        <hr>

        <div v-if="loadingNotifications" class="notification-title">Fetching notes...</div>
        <div v-else>
          <h2 class="notification-title">{{ notificationTitle }}</h2>
          <div v-for="notification in notifications" :key="notification.id" class="notification-item">
            {{ notification.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="checkbox-labels">
        <span class="checkbox-label">Completed</span>
        <span class="checkbox-label inProgress-label">In Progress</span>
    </div>
    <div class="tasks">
      <ul>
        <li v-for="(task, index) in tasks" :key="task.id" class="task-item">
          <span class="task-index">{{ index + 1 }}.</span>
          <router-link :to="{ name: getRouteName(task.id) }" class="task-name" v-bind:class="{ 'completed': task.completed }">
            {{ task.name }}
          </router-link>
          <v-checkbox v-model="task.completed" :id="'task-' + task.id" class="task-checkbox"
            color="success"
            base-color="green"
            hide-details
            @change="updateTask(index)"
          ></v-checkbox>
          <v-checkbox v-model="task.inProgress" :id="'inProgress-' + task.id" class="task-checkbox inProgress-checkbox"
            color="#E69B9B"
            base-color="pink"
            hide-details
            @change="updateTask(index)"
          ></v-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../scripts/firebase'; // Adjust the path as necessary to point to your firebase.js file
import { collection, query, where, getDocs } from 'firebase/firestore';
import { VCheckbox, VBadge, VBtn, VIcon } from 'vuetify/components'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  components: {
    VCheckbox,
    // eslint-disable-next-line vue/no-unused-components
    VBadge,
    VBtn,
    VIcon
  },
  props: {
    tasks: Array
  },
  data() {
    return {
      showNotifications: false,
      notifications: [],
      events: [],
      loadingNotifications: false,
      loadingEvents: false,
      notificationTitle: "Recent Press Release notes:",
      eventTitle: "Upcoming Events:"
    };
  },
  computed: {
      upcomingEventCount() {
        return this.events.length; // This will return the count of the events currently held in the state
      },
  },
  mounted() {
    this.fetchEvents(); // Fetch events as soon as the component mounts
  },
  methods: {
    updateTask(taskIndex) {
      this.$emit('task-updated', this.tasks[taskIndex]);
    },
    goToWebsite() {
      window.open('https://www.hdb.gov.sg/about-us/news-and-publications/press-releases', '_blank');
    },
    getRouteName(taskId) {
      const taskRouteMap = {
        1: 'CheckEligibility',
        2: 'FinancialPlanning',
        3: 'SalesLaunches',
        4: 'Application',
        5: 'ApplicationOutcome',
        6: 'BookFlat',
        7: 'Lease',
        8: 'Keys',
      };

      return taskRouteMap[taskId] || '';
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      console.log(this.showNotifications)
      if (this.showNotifications) {
        this.fetchNotifications();
        this.fetchEvents();
      }
    },
    async fetchNotifications() {
      if (this.notifications.length > 0) {
        return;
      }
      try {
        this.loadingNotifications = true;
        const response = await fetch('/api/notifications');
        if (!response.ok) throw new Error('Network response was not ok');
        this.notifications = await response.json();
        console.log('Notifications fetched:', this.notifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        this.loadingNotifications = false;
      }
    },
    async fetchEvents() {
      if (this.events.length > 0) {
        return;
      }
      try {
        this.loadingEvents = true;
        // Fetch events from Firestore
        await this.fetchEventsFromFirestore();
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        this.loadingEvents = false;
      }
    },
    async fetchEventsFromFirestore() {
      const userId = auth.currentUser.uid;
      // console.log(userId)
      const today = new Date();
      const oneWeekLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
      
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('userId', '==', userId));
      
      const snapshot = await getDocs(q);

      const events = [];
      snapshot.forEach(doc => {
        const event = doc.data();
        // console.log(event)
        const eventDate = event.date.toDate();
        // console.log(eventDate)
        if (eventDate >= today && eventDate <= oneWeekLater) {
          const formattedDate = eventDate.toLocaleDateString('en-US');
          events.push({ ...event, id: doc.id, date: formattedDate });
        }
      });
      this.events = events;
    },

  }
};
</script>

<style scoped>

/* Custom scrollbar styles */
.notifications-container::-webkit-scrollbar {
  width: 8px; /* width of the entire scrollbar */
}

.notifications-container::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
}

.notifications-container::-webkit-scrollbar-thumb {
  background-color: #bfbfbf; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid transparent; /* creates padding around scroll thumb */
}


.notification-title {
  font-size: 17px;
  font-weight: bold;
}

.notifications-container {
  position: absolute;
  padding: 10px;
  top: 220px; /* Adjust this value to position the container below the bell icon */
  right: 70px;  /* Align to the right edge of the .header container */
  background-color: #D9D9D9;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  width: 300px; /* Adjust as needed */
  z-index: 100; /* Ensure this is below the z-index of the notification button if overlapping occurs */
  display: block; /* This makes the container visible when showNotifications is true */
  max-height: 300px; /* Set a fixed maximum height to show only three items at a time */
  overflow-y: auto; /* Enable vertical scrolling */
}

.notification-item {
  padding: 5px;
  border-bottom: 1px solid #eee;
  background: #F9F9F9; /* Light gray background */
  margin-bottom: 10px; /* Spacing between items */
  border-radius: 8px; /* Rounded corners like in the example */
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle box shadow */
  font-size: 14px;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.notification-button {
  position: absolute;
  top: 150px;
  right: 70px;
  background-color: transparent;
  min-width: 0;
}

.tasks {
  font-size: 20px;
}

.tasks ul {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.task-index {
  font-weight: bold;
  margin-right: 5px;
}

.task-name {
  text-decoration: underline;
  color: black;
  cursor: pointer;
  flex-grow: 1;
  margin-right: 150px; 
}

.task-name.completed {
  text-decoration: line-through;
  color: grey;
}

.task-checkbox { 
  margin-right: 105px;
}

.checkbox-labels {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 80px;
  margin-bottom: 5px;
}

.checkbox-label.inProgress-label {
  margin-left: 60px;
}

.checkbox-label,
.checkbox-label.inProgress-label {
  font-weight: bold;
}
</style>
