<template>
    <div class="settings-container">
      <h1 class="settings-title">Settings</h1>
      <div class="settings-item">
        <label for="email">Email:</label>
        <div class="input-button-container">
          <input type="text" id="email" v-model="userEmail" readonly class="input-field" />
          <button @click="changeEmail" class="change-button">Change</button>
        </div>
      </div>
      <div class="settings-item">
        <label for="password">Password:</label>
        <div class="input-button-container">
          <input type="password" id="password" v-model="userPassword" readonly class="input-field" />
          <button @click="changePassword" class="change-button">Change</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Settings',
    data() {
      return {
        userEmail: 'marcuskim03@gmail.com',
        userPassword: '**********', // You'd typically not display the real password
      };
    },
    methods: {
      changeEmail() {
        // Logic to change email
      },
      changePassword() {
        // Logic to change password
      },
    },
  };
  </script>
  
  <style scoped>
  .settings-container {
    padding: 2rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #F0E7C4; /* Adjust to match your cream background color */
    margin-top: 10px;
  }
  
  .settings-title {
    margin-bottom: 2rem;
    color: #000000; /* Adjust to match your pink color */
  }
  
  .settings-item {
    margin-bottom: 2rem;
    width: 100%;
  }
  
  .settings-item label {
    font-size: 1.25rem;
  }
  
  .input-button-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .input-field {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .change-button {
    padding: 0.75rem 1.5rem;
    background-color: #FFC0CB; /* Light pink color */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .change-button:hover {
    background-color: #FFB6C1; /* Slightly darker pink on hover */
  }
  </style>