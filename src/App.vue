<template>
<div class="entire-container">
    <div class="header">
      <Header v-if="showHeader" :progress-percentage="progressPercentage" :completed-tasks="completedTasks" :total-tasks="totalTasks" />
    </div>
  <div class="content-container">
    <Sidebar v-if="showSidebar" />
    <!-- Your content here -->
    <router-view :tasks="tasks" @task-updated="handleTaskUpdate"/>
  </div>
</div>
</template>
  
<script>
  import { db, auth } from '../scripts/firebase.js';
  import { setDoc, getDoc, updateDoc, onSnapshot, doc } from 'firebase/firestore';
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
        user: null,
        // Initialize all tasks, possibly from a local source or hardcoded
        allTasks: [
          { id: 1, name: 'Check Eligibility', completed: false, inProgress: false},
          { id: 2, name: 'Financial Planning', completed: false, inProgress: false},
          { id: 3, name: 'Look out for sales launches', completed: false, inProgress: false},
          { id: 4, name: 'Submit application', completed: false, inProgress: false},
          { id: 5, name: 'Receive application outcome', completed: false, inProgress: false},
          { id: 6, name: 'Book flat', completed: false, inProgress: false},
          { id: 7, name: 'Sign Agreement for Lease', completed: false, inProgress: false},
          { id: 8, name: 'Collect keys to flat', completed: false, inProgress: false},
        ],
      };
    },
    created() {
      this.authListener();
      },
    methods: {
      authListener() {
        auth.onAuthStateChanged(user => {
          if (user) {
            this.user = user;
            this.loadTasksFromFirestore();
          } else {
            this.allTasks = this.allTasks.map(task => ({ 
            id: task.id,
            name: task.name,
            completed: false,
            inProgress: false
          }));
            this.user = null;
          }
        });
      },
      loadTasksFromFirestore() {
        if (!this.user) {
          console.error('No user signed in to load tasks from Firestore.');
          return;
        }

        const userDocRef = doc(db, 'users', this.user.uid);
        onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const firestoreTasks = docSnapshot.data().tasks;
            firestoreTasks.forEach((firestoreTask) => {
              let localTask = this.allTasks.find(t => t.id === firestoreTask.id);
              if (localTask) {
                localTask.completed = firestoreTask.completed;
                localTask.inProgress = firestoreTask.inProgress; // Make sure to also update the inProgress status
              } else {
                this.allTasks.push({
                  ...firestoreTask,
                  inProgress: firestoreTask.inProgress ?? false // Set default inProgress if not present
                });
              }
            });
            this.$forceUpdate(); // This may help to ensure the reactivity of the Vue instance
          } else {
            console.log('No tasks found in Firestore for the user.');
          }
        });
      },
      async handleTaskUpdate(updatedTask) {
        if (!this.user) {
          console.error('No user signed in to update tasks in Firestore.');
          return;
        }

        const userDocRef = doc(db, 'users', this.user.uid);

        try {
          // Find the task in your local model and update it
          const taskIndex = this.allTasks.findIndex(task => task.id === updatedTask.id);
          if (taskIndex !== -1) {
            this.allTasks[taskIndex] = { ...this.allTasks[taskIndex], ...updatedTask };
          }

          // Sync the updated tasks array with Firestore, creating the document if it doesn't exist
          await setDoc(userDocRef, { tasks: this.allTasks }, { merge: true });

          console.log("Firestore updated with new task statuses.");
        } catch (error) {
          console.error("Error updating Firestore:", error);
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
      showHeader() {
      // List of paths where the Header should not be shown
      const noHeaderPaths = ['/', '/register'];
      // Use `this.$route.path` to access the current route's path
      return !noHeaderPaths.includes(this.$route.path);
      },
      showSidebar() {
        // List of paths where the Sidebar should not be shown
        const noSidebarPaths = ['/', '/register', '/settings'];
        // Use `this.$route.path` to access the current route's path
        return !noSidebarPaths.includes(this.$route.path);
      },
      tasks() {
        // If you want to separate out a computed property for tasks
        return this.allTasks;
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

  .entire-container {
    background-color: #F0E7C4;
  }

  .content-container {
    display: flex;
  }

</style>

