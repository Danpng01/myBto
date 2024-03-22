<template>
    <div class="registration-page">
        <div class="registration-images">
            <img src="@/assets/top_image.jpeg" alt="Top Image" class="top-image">
            <img src="@/assets/bottom_image.jpeg" alt="Bottom Image" class="bottom-image">
        </div>
      <div class="registration-container">
        <div class="registration-header">
          <img src="@/assets/logo.png" alt="HDB Logo" class="logo">
          <h1>myBTO</h1>
        </div>
        <div class="registration-form">
          <form @submit.prevent="submitRegistration">
            <div v-if="passwordMismatch" class="alert alert-danger">Passwords do not match! Please retry.</div>
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <input type="password" v-model="password2" placeholder="Re-enter Password">
            <button type="register" :disabled="passwordMismatch" @click="handleRegister">Register</button> 
            <div class="login-link">
              Already have an account? <a href="/">Log in</a>
            </div>
          </form>
        </div>
      </div>
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
          const password2 = ref('');
  
          const handleRegister = async () => {
              console.log(`Email input: ${email.value}`); // Debug email value
              console.log(`Password input: ${password2.value}`);
  
              if (!validateEmail(email.value)) {
                  alert("Please enter a valid email address.");
                  return;
              }
              try {
                  const userCredential = await register(email.value, password2.value);
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
              password2,
              handleRegister,
          };
      },
  };
  </script>


<style scoped>
.registration-page {
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
}

.registration-images {
  display: flex;
  flex-direction: column;
}

.registration-images,
.registration-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1; /* Each child will take up an equal amount of space */
  object-fit: contain;
}

.top-image,
.bottom-image {
  width: 50vw; 
  height: 45vh; 
  margin-right: 10px;
}

.registration-container {
  justify-content: center; 
  align-items: center;
  padding: 1rem; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 87vh;
}
 
.registration-header img.logo {
  width: 200px; 
}

.registration-header h1 {
  color: #333; 
  text-align: center;
  margin-bottom: 20px;
}

.registration-form form {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
  height: 300%; /* Adjusted for potentially more fields */
}

.registration-form input[type="text"],
.registration-form input[type="password"] {
  padding: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.registration-form button {
  padding: 1rem;
  background-color: #f0919f; 
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
}

.registration-form button:hover {
  background-color: #e0878b; 
}

.login-link {
  text-align: center;
  color: #333; 
}

</style>


