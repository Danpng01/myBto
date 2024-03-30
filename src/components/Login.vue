<template>
    <div class="login-page">
        <div class="login-images">
            <img src="@/assets/top_image.jpeg" alt="Top Image" class="top-image">
            <img src="@/assets/bottom_image.jpeg" alt="Bottom Image" class="bottom-image">
        </div>
      <div class="login-container">
        <div class="login-header">
          <img src="@/assets/logo.png" alt="HDB Logo" class="logo">
          <h1>myBTO</h1>
        </div>
        <div class="login-form">
          <form @submit.prevent="submitLogin">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit" @click="handleLogin">Sign in</button>
            <div class="register-link">
              Not registered? <button @click="redirectToRegister">Register Here</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { signIn } from '../../scripts/auth.js';
import { useRouter } from 'vue-router';


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default {
  name: 'Login',
  setup() {
      const router = useRouter();
      const email = ref('');
      const password = ref('');

      const handleLogin = async () => {
          console.log(`Email input: ${email.value}`); // Debug email value

          if (!validateEmail(email.value)) {
              alert("Please enter a valid email address.");
              return;
          }
          try {
              const userCredential = await signIn(email.value, password.value);
              console.log("Login successful", userCredential);
              // Proceed to home for successful login
              router.push({ name: 'Dashboard' });
          } catch (error) {
              console.error("Login failed:", error.message);
              // Display an error message or handle the login failure
          }
      };

      const redirectToRegister = () => {
          router.push({ name: 'Register' });
      };

      // Make sure to return everything that will be used in the template -  ensure that the template can access
      return {
          email,
          password,
          handleLogin,
          redirectToRegister,
      };
  },
};
</script>

  
<style scoped>
.login-page {
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
    
}

.login-images {
    display: flex;
    flex-direction: column;
}

.login-images,
.login-container {
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

.login-container {
  justify-content: center; 
  align-items: center;
  padding: 1rem; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 87vh;
  border-radius: 15px;
  overflow: hidden;
}
  
.login-header img.logo {
  margin-bottom: 300px;
  width: 300px; 
}

.login-header h1 {
  color: #333; 
  text-align: center;
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 500px;
  height: 200%;
  margin-bottom: 400px;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  padding: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.login-form button {
  padding: 1rem;
  background-color: #f0919f; 
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #e0878b; 
}

.register-link {
  text-align: center;
  color: #333; 
}

.navigation-link {
  text-align: center;
}

.navigation-link a:hover {
  background-color: #4a90e2; /* Changes background on hover */
  color: white; /* Changes text color on hover */
}

.navigation-link a {
  color: #4a90e2; /* A nice visible blue color for the link */
  text-decoration: none; /* Removes underline from links */
  padding: 0.5rem 1rem;
  border: 2px solid #4a90e2; /* Gives the link a border */
  border-radius: 4px; /* Rounds the corners of the border */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effects */
}
  
</style>
    