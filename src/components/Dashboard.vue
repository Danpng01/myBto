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
      this.$emit('task-updated', this.tasks[taskIndex]);
    },
    goToWebsite() {
      window.open('https://homes.hdb.gov.sg/home/landing', '_blank');
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
  position: absolute;
  top: 150px;
  right: 150px;
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
