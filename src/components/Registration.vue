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
            <input type="text" v-model="username" placeholder="Username / email">
            <input type="password" v-model="password" placeholder="Password">
            <input type="password" v-model="confirmPassword" placeholder="Re-enter Password">
            <button type="register" :disabled="passwordMismatch">Register</button> 
            <div class="login-link">
              Already have an account? <a href="/login">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
  name: 'RegistrationPage',
  data() {
    return {
      password: '',
      confirmPassword: '',
      passwordsMatch: true,
    }
  },
  computed: {
    passwordMismatch() {
      return !this.passwordsMatch;
    }
  },

  methods: {
    submitRegistration() {
    if (this.password !== this.confirmPassword) {
      this.passwordsMatch = false; // Trigger password mismatch alert warning
      return; // Prevent form submission
    }
    // Successful registration logic
  },
  }
}
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