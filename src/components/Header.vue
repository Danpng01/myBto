<template>
  <div class="header">
    <div class="logo">
      <button class="my-bto-button" @click="redirectToDashboard">myBTO</button>
    </div>
    <div class="progress-section">
      <h2 class="progress-title">My Progress</h2>
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <span class="task-completion">{{ completedTasks }} / {{ totalTasks }} done</span>
      </div>
    </div>
    <div class="icons-container">
      <button class="settings" title = "Settings" @click="redirectToSettings">
        <img src = "../assets/settings.png" alt = "Settings">
      </button>
      <button class="logout" title = "Logout" @click="handleSignout">
        <img src = "../assets/logout.png" alt = "Logout">
      </button>
      <button class="account" title = "Account Details">
        <img src = "../assets/account.png" alt = "Account">
      </button>
    </div>
  </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { logOut } from '../../scripts/auth.js';
export default {
  name: "Header",
  props: {
    progressPercentage: Number,
    completedTasks: Number, 
    totalTasks: Number
  },
  setup() {
    const router = useRouter();

    const handleSignout = async () => {
      try {
        await logOut(); // Call the logOut function from auth.js
        console.log("User signed out");
        router.push('/'); // Redirect to the login page
      } catch (error) {
        console.error("Error signing out:", error.message);
        // Optionally, handle the error, e.g., show a notification
      }
    };

    const redirectToSettings = () => {
          router.push({ name: 'Settings' });
    };

    const redirectToDashboard = () => {
          router.push({ name: 'Dashboard' });
    };

    return {
        handleSignout,
        redirectToSettings,
        redirectToDashboard,
    };
  }
} 

</script>
  

<style scoped>
.header {
  display: flex;
  height: 100px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #EDECEC;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 0px 3px #ADABA5;
}

.my-bto-button {
  color: #E69B9B; /* Text color */
  background-color: #EDECEC;
  border: none; /* No border */
  padding: 10px 20px; /* Padding inside the button */
  font-family: Arial, sans-serif; /* Font family */
  font-size: 40px; /* Text size */
  font-weight: bold; /* Bold text */
  border-radius: 20px; /* Rounded corners */
  cursor: pointer; /* Hand cursor on hover */
  outline: none; /* Remove outline for clicked state */
}

.logo {
  padding-left: 80px;
  color: #E69B9B;
}

.progress-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.progress-title {
  text-align: center;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.progress-bar {
  width: 200px; /* Adjust width as needed */
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  margin: 10px 0;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
}

.task-completion {
  margin-left: 10px;
}

.settings, .logout, .account {
  background: none;
  border: none;
  cursor: pointer;
  margin: 25px;
}
</style>
  