<template>
  <div class="header">
    <div class="logo">
      <h1>myBTO</h1>
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
      <button class="settings" title = "Settings">
        <img src = "/Users/emmanueltan/Desktop/BT3103/test/test/src/assets/settings.png" alt = "Settings">
      </button>
      <button class="logout" title = "Logout">
        <img src = "/Users/emmanueltan/Desktop/BT3103/test/test/src/assets/logout.png" alt = "Logout">
      </button>
      <button class="account" title = "Account Details">
        <img src = "/Users/emmanueltan/Desktop/BT3103/test/test/src/assets/account.png" alt = "Account">
      </button>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "Header",
  props: {
    progressPercentage: Number,
    completedTasks: Number, 
    totalTasks: Number
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
  