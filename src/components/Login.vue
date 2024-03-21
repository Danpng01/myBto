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
              router.push({ name: 'Home' });
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
}
  
.login-header img.logo {
  width: 200px; 
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
  width: 100%;
  height: 200%;
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
  
</style>
    

<!-- <script>
  export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitLogin() {
      // Login logic here
      console.log(`Login attempt with username: ${this.username} and password: ${this.password}`);
      // Add your axios call or other methods to connect to your backend here
    }
  }
}
</script> -->


<!-- <template>
  <h3>This is a Login Page</h3> 
  <p></p>
  <input type="email" v-model="email" placeholder="Email">
  <input type="password" v-model="password" placeholder="Password">
  <button @click="handleLogin">Login</button>
  <p></p>
  <button @click="redirectToRegister">Not registered? Register here</button>

</template> -->