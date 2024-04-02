<template>
    <div class="login-page">
      <div class="logo-container">
        <img src="@/assets/hdb logo.png" alt="HDB Logo" class="logo">
      </div>
      <div class="login-images">
          <!-- <img src="@/assets/top_image.jpeg" alt="Top Image" class="top-image">
          <img src="@/assets/bottom_image.jpeg" alt="Bottom Image" class="bottom-image"> -->
          <img src="@/assets/bto pic.jpg" alt="HBD image" class="side-image">
      </div>
      <div class="login-container">
        <div class="grey-container">
          <div class="login-header">
            <h1>myBTO</h1>
          </div>
          <div class="login-form">
            <form @submit.prevent="submitLogin">
              <input type="email" v-model="email" placeholder="Email">
              <input type="password" v-model="password" placeholder="Password">
              <button type="submit" @click="handleLogin">Sign in</button>
              <div class="register-link">
                Not registered? <button @click="redirectToRegister">Create an account</button>
              </div>
            </form>
          </div>
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

.logo {
  width: 200px; /* Adjust the width as needed */
  height: auto; /* This will maintain the aspect ratio of the logo */
  /* If the logo is still not the right size, you can fine-tune the width property. */
}

.logo-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px; /* Adjust the padding to control the distance from the top and right edges */
}

.grey-container {
  background-color: #EDECEC;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content; 
  margin: auto; 
  font-weight: bold;
}

.login-page {
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
}

/* .login-images, */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  object-fit: contain;
}

.login-images {
  position: relative; /* Ensure that your image is positioned relative to this container */
  width: 50vw; /* Keep the original width */
  height: 100vh; /* Set the height to cover the viewport */
  overflow: hidden; /* This will crop the image */
}

/* .top-image,
.bottom-image {
    width: 50vw; 
    height: 60vh; 
    margin-right: 10px;
} */

.side-image {
  height: 100%; /* Stretch the image to the height of the container */
  object-fit: cover; /* Cover the area without stretching the image */
  width: 100%; /* Take the full width to avoid repeating */
  filter: blur(2px); /* Apply a slight blur effect */
  border: 1px solid black;
}

/* .login-container {
  justify-content: center;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
} */
  
.login-header img.logo {
  margin-bottom: 20px;
  width: 300px; 
}

.login-header h1 {
  color: #f0919f; 
  text-align: center;
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 500px;
  height: auto;
  margin-bottom: 20px;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  padding: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
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
  font-weight: bold;
}

.register-link button {
  background-color: transparent; /* Remove the background */
  color: #f0919f; /* Set the text color to pink */
  border: none;
  cursor: pointer;
  padding: 0; /* Remove padding if you don't want space around the text */
  margin-bottom: 1rem;
  font-weight: bold;
}

.register-link button:hover {
  color: #000; /* Change text color to black on hover */
  background-color: transparent;
  text-shadow: 2px 2px 8px #888888; /* Add a shadow to the text on hover */
}

.navigation-link {
  text-align: center;
}

.navigation-link a:hover {
  background-color: #4a90e2;
  color: white;
}

.navigation-link a {
  color: #4a90e2;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid #4a90e2;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}
</style>
    