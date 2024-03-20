<template>
    <div>
      <h3>Registration Page</h3>
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button @click="handleRegister">Register</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { register } from '../../scripts/auth.js';
  import { useRouter } from 'vue-router';
  
  function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  
  export default {
      name: 'Register',
      setup() {
          const router = useRouter();
          const email = ref('');
          const password = ref('');
  
          const handleRegister = async () => {
              console.log(`Email input: ${email.value}`); // Debug email value
  
              if (!validateEmail(email.value)) {
                  alert("Please enter a valid email address.");
                  return;
              }
              try {
                  const userCredential = await register(email.value, password.value);
                  console.log("Registration successful", userCredential);
                  // Proceed to Home for successful registration
                  router.push({ name: 'Home' });
              } catch (error) {
                  console.error("Registration failed:", error.message);
                  // Display an error message or handle the registration failure
              }
          };
  
          return {
              email,
              password,
              handleRegister,
          };
      },
  };
  </script>