<template>
    <div class="dashboard-container">
      <div class="title">
        <h1>My Dashboard</h1>
      </div>
      <div class="tasks">
        <ul>
          <li v-for="(task, index) in tasks" :key="task.id" class="task-item">
            <span class="task-index">{{ index + 1 }}.</span>
            <span :class="{ 'task-name': true, 'completed': task.completed }">
              <a v-if="task.link" :href="task.link" target="_blank">{{ task.name }}</a>
              <span v-else>{{ task.name }}</span>
            </span>
            <input type="checkbox" v-model="task.completed" :id="'task-' + task.id" class="task-checkbox" @click="updateTask(task)">
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    props: {
      tasks: Array
    },
    methods: {
      updateTask(task) {
        this.$emit('task-update', task);
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
  }
  
  .title {
    margin-top: 30px;
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
    margin-right: 30px; 
  }
  
  .task-name a {
    text-decoration: underline;
    color: black; 
  }
  
  .task-name.completed {
    text-decoration: line-through;
    color: grey;
  }
  </style>
  
