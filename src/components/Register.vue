<template>
    <div class="registration-page">
      <div class="logo-container">          
        <img src="@/assets/hdb logo.png" alt="HDB Logo" class="logo">
      </div>
        <div class="registration-images">
            <!-- <img src="@/assets/top_image.jpeg" alt="Top Image" class="top-image">
            <img src="@/assets/bottom_image.jpeg" alt="Bottom Image" class="bottom-image"> -->
            <img src="@/assets/bto pic.jpg" alt="HBD image" class="side-image">
        </div>
      <div class="registration-container">
        <div class="grey-container">
          <div class="registration-header">
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
                Already have an account? <button @click="redirectToLogin">Log in</button>
              </div>
            </form>
          </div>
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
          const password = ref('');
  
          const handleRegister = async () => {
              console.log(`Email input: ${email.value}`); // Debug email value
              console.log(`Password input: ${password2.value}`);
  
              if (!validateEmail(email.value)) {
                  alert("Please enter a valid email address.");
                  return;
              }
              console.log(`New Password: '${password.value}'`);
              console.log(`Retype Password: '${password2.value}'`);

              if (password.value !== password2.value) {
                alert('Passwords do not match.');
                return;
              }
              else {
                try {
                    const userCredential = await register(email.value, password2.value);
                    console.log("Registration successful", userCredential);
                    // Proceed to Home for successful registration
                    router.push({ name: 'Dashboard' });
                    alert('Registration successful');
                } catch (error) {
                    console.error("Registration failed:", error.message);
                    // Display an error message or handle the registration failure
                }
              } 
          };

        const redirectToLogin = () => {
          router.push({ name: 'Login' });
        };
  
          return {
              email,
              password,
              password2,
              handleRegister,
              redirectToLogin,
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

.registration-page {
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
}

.registration-images {
  position: relative; /* Ensure that your image is positioned relative to this container */
  width: 50vw; /* Keep the original width */
  height: 100vh; /* Set the height to cover the viewport */
  overflow: hidden; /* This will crop the image */
}


.registration-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  object-fit: contain;
}

/* .top-image,
.bottom-image {
  width: 50vw; 
  height: 45vh; 
  margin-right: 10px;
} */

.side-image {
  height: 100%; /* Stretch the image to the height of the container */
  object-fit: cover; /* Cover the area without stretching the image */
  width: 100%; /* Take the full width to avoid repeating */
  filter: blur(2px); /* Apply a slight blur effect */
  border: 1px solid black;
}

/* .registration-container {
  justify-content: center; 
  align-items: center;
  padding: 1rem; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 87vh;
} */
 
.registration-header img.logo {
  margin-bottom: 20px;
  width: 300px; 
}

.registration-header h1 {
  color: #f0919f; 
  text-align: center;
  margin-bottom: 20px;
}

.registration-form form {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 500px;
  height: auto;
  margin-bottom: 20px;
}

.registration-form input[type="email"],
.registration-form input[type="password"] {
  padding: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
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
  font-weight: bold;
}

.login-link button {
  background-color: transparent; /* Remove the background */
  color: #f0919f; /* Set the text color to pink */
  border: none;
  cursor: pointer;
  padding: 0; /* Remove padding if you don't want space around the text */
  margin-bottom: 1rem;
  font-weight: bold;
}

.login-link button:hover {
  color: #000; /* Change text color to black on hover */
  background-color: transparent;
  text-shadow: 2px 2px 8px #888888; /* Add a shadow to the text on hover */
}

</style>


