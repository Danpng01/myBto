<template>
  <div class="dashboard-container">
    <div class="header">
      <h1 class="title">My Dashboard</h1>
      <v-btn icon class="notification-button" @click="goToWebsite">
          <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </div>
    <div class="checkbox-labels">
        <span class="checkbox-label">Completed</span>
        <span class="checkbox-label inProgress-label">In Progress</span>
    </div>
    <div class="tasks">
      <ul>
        <li v-for="(task, index) in tasks" :key="task.id" class="task-item">
          <span class="task-index">{{ index + 1 }}.</span>
          <span :class="{ 'task-name': true, 'completed': task.completed, 'clickable': task.link === '' }" @click="task.link === '' ? redirectToComponent(task) : null">
            <router-link v-if="task.link === ''" :to="{ name: task.routeName }">{{ task.name }}</router-link>
            <a v-else :href="task.link" target="_blank">{{ task.name }}</a>
          </span>
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
import { VCheckbox, VBadge, VBtn, VIcon } from 'vuetify/components'

export default {
  name: 'Dashboard',
  components: {
    VCheckbox,
    VBadge,
    VBtn,
    VIcon
  },
  props: {
    tasks: Array
  },
  methods: {
    updateTask(taskIndex) {
      // Emit an event with the updated task
      this.$emit('task-updated', this.tasks[taskIndex]);
    },
    goToWebsite() {
      window.open('https://homes.hdb.gov.sg/home/landing', '_blank');
    },
    redirectToComponent(task) {
      // Here you need to define where to redirect when the link is empty
      // For example, if you have a route named 'CheckEligibility' for task 1:
      if (task.id === 1) {
        this.$router.push({ name: 'CheckEligibility' });
      }
      // Add more conditions if there are other tasks with different routes
    },
  }
};
</script>

<style scoped>
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
  position: absolute; /* Absolute positioning relative to the closest positioned ancestor */
  top: 150px; /* Adjust as needed */
  right: 150px; /* Adjust as needed */
  background-color: transparent; /* Remove any background */
  min-width: 0; /* Remove any minimum width requirements */
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
  justify-content: space-between; /* This will space out the items */
  margin-bottom: 25px;
}

.task-index {
  font-weight: bold;
  margin-right: 5px;
}

.task-name {
  flex-grow: 1;
  margin-right: 150px; 
}

.task-name a {
  text-decoration: underline;
  color: black; 
}

.task-name.completed {
  text-decoration: line-through;
  color: grey;
}

.task-checkbox { 
  margin-right: 105px; /* Adjust spacing as needed */
}

.checkbox-labels {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 80px;
  margin-bottom: 5px;
}

.checkbox-label.inProgress-label {
  margin-left: 60px; /* Adjust as needed */
}

.checkbox-label,
.checkbox-label.inProgress-label {
  font-weight: bold; /* This will make the text bold */
}
</style>