<template>
<div class="entire-container">
    <div class="header">
      <Header v-if="showHeaderAndSidebar" :progress-percentage="progressPercentage" :completed-tasks="completedTasks" :total-tasks="totalTasks" />
    </div>
  <div class="content-container">
    <Sidebar v-if="showHeaderAndSidebar" />
    <!-- Your content here -->
    <router-view :tasks="tasks" />
  </div>
</div>
</template>

<script>
import Cookies from 'js-cookie';
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Calendar from "./components/Calendar.vue";
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    Calendar,
    Header,
    Sidebar,
  },
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.loadTasksFromCookies();

  },
  methods: {
    loadTasksFromCookies() {
      const tasksFromCookies = Cookies.get('tasks');
      if (tasksFromCookies) {
        this.tasks = JSON.parse(tasksFromCookies);
      } else {
        this.tasks = [
          { id: 1, name: 'Check eligibility', completed: false, link: 'https://example.com/check-eligibility' },
          { id: 2, name: 'Financial Planning', completed: false, link: 'https://example.com/financial-planning' },
          { id: 3, name: 'Attend a BTO Launch Briefing', completed: false, link: '' },
          // Additional tasks as needed...
        ];
      }
    },
    handleTaskUpdate(task) {
      const taskToUpdate = this.tasks.find(t => t.id === task.id);
      if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;
        Cookies.set('tasks', JSON.stringify(this.tasks), { expires: 7 }); // Set cookie expiration to 7 days
      }
    }
  },
  computed: {
    progressPercentage() {
      const completedTasks = this.tasks.filter(task => task.completed).length;
      return (completedTasks / this.tasks.length) * 100;
    },
    completedTasks() {
      return this.tasks.filter(task => task.completed).length;
    },
    totalTasks() {
      return this.tasks.length;
    },
    showHeaderAndSidebar() {
      // List of paths where the Header and Sidebar should not be shown
      const noHeaderSidebarPaths = ['/', '/register'];
      // Use `this.$route.path` to access the current route's path
      return !noHeaderSidebarPaths.includes(this.$route.path);
    },
  },
};
</script>


<style>
.entire-container {
  background-color: #F0E7C4;
}

.content-container {
  display: flex;
}

</style>
