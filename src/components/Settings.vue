<template>
    <div class="settings-container">
      <h1 class="settings-title">Settings</h1>
      <div class="settings-item">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="userEmail" :readonly="!isChangingEmail" :class="[isChangingEmail ? 'input-field-greyed-out' : 'input-field']"/>
        <button v-if="!isChangingEmail" @click="startChangeEmail" class="change-button">Change</button>
        <button v-if="isChangingEmail" @click="endChangeEmail" class="change-button">Cancel</button>
        <div v-if="isChangingEmail" class="change-email-div">
          <p>Enter new email: </p>
          <input type="text" id="new-email" v-model="newUserEmail" placeholder="New email" class="input-field" />
          <p>Confirm with password:</p>
          <input type="password" placeholder="Password" v-model="currentUserPassword" class="input-field" />
          <p></p>
          <button @click="reauthenticateAndChangeEmail" class="verify-button">Save</button>
        </div>
        <div>
          <button v-if="!isChangingPassword" class="change-button" @click="startChangePassword">Change my password</button>
          <button v-if="isChangingPassword" class="change-button" @click="endChangePassword">Cancel</button>
          <div v-if="isChangingPassword" class="change-email-div">
            <p>Enter current password: </p>
            <input type="password" placeholder="Password" v-model="currentUserPassword" class="input-field" />
            <p>Enter new password: </p>
            <input type="password" v-model="newUserPassword" placeholder="New Password" class="input-field" />
            <p>Re-type password:</p>
            <input type="password" placeholder="Re-enter Password" v-model="retypeUserPassword" class="input-field" />
            <p></p>
            <button @click="updatePassword" class="verify-button">Save</button>
        </div>

        </div>
      </div>
      <!-- <div v-if="isChangingEmail" class="settings-item new-email">
        <label for="new-email">New Email:</label>
        <input type="text" id="new-email" v-model="newUserEmail" class="input-field" />
      </div>
      <div class="settings-item">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="userPassword" readonly class="input-field" />
        <button @click="changePassword" class="change-button">Change</button>
      </div> -->
    </div>
  </template>
  
  <script>
import { onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword } from "firebase/auth";
import { auth } from '../../scripts/firebase.js';

export default {
  name: 'Settings',
  data() {
    return {
      userEmail: '',
      newUserEmail: '',
      currentUserPassword: '', // For re-authentication before email update
      newUserPassword: '',
      retypeUserPassword: '',
      isChangingEmail: false,
      isChangingPassword: false,
    };
  },
  methods: {
    startChangeEmail() {
      this.isChangingEmail = true;
    },
    endChangeEmail() {
      this.isChangingEmail = false;
    },
    startChangePassword() {
      this.isChangingPassword = true;
    },
    endChangePassword() {
      this.isChangingPassword = false;
    },
    async reauthenticateAndChangeEmail() {
      console.log("reauth")
      if (!this.newUserEmail || !this.currentUserPassword) {
        alert('Please enter your new email and current password.');
        return;
      }

      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email, // The user's current email
        this.currentUserPassword // The password entered by the user
      );

      try {
        // Reauthenticate the user
        await reauthenticateWithCredential(user, credential);

        // Proceed with updating the email
        await updateEmail(user, this.newUserEmail);

        console.log('Email updated')
        
        this.userEmail = this.newUserEmail; // Update local state
        this.isChangingEmail = false;
        alert('Email updated')
      } catch (error) {
        console.error('Error reauthenticating and updating email:', error);
        alert(error.message);
      }
    },
    async updatePassword() {
      console.log("change pw");
      if (!this.newUserPassword || !this.retypeUserPassword) {
        alert('Please enter your new password and re-type new password.');
        return;
      } else if (this.newUserPassword !== this.retypeUserPassword) {
        alert('Passwords do not match.');
        return;
      } else {
        const user = auth.currentUser;
        // Ensure you're using this.currentPassword, which should be obtained from an input field
        const credential = EmailAuthProvider.credential(user.email, this.currentUserPassword);

        try {
          // Re-authenticate the user with the current password
          await reauthenticateWithCredential(user, credential);

          // Make sure to use this.newUserPassword, as that's what you've verified above
          await updatePassword(user, this.newUserPassword);
          alert('Password successfully updated.');
          this.isChangingPassword = false;
        } catch (error) {
          console.error('Error updating password:', error);
          alert('Failed to update password. Please try again.');
        }
      }
    },

  },
  // mounted() hook listens for changes to the Firebase authentication state with onAuthStateChanged
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // If a user is signed in, set userEmail to the user's email
        this.userEmail = user.email;
      } else {
        // Handle case where no user is signed in, if necessary
        console.log('No user is currently signed in.');
        // Possible redirect to login screen or display message
      }
    });
  }
};
</script>
  
  <style scoped>

  .change-email-div {
    margin-top: 20px;
  }

  .settings-container {
    padding: 2rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #F0E7C4; /* Adjust to match your cream background color */
    margin-top: 10px;
  }

  .settings-container input[type="text"],
  .settings-container input[type="password"] {
    padding: 1rem;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;

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

  .input-field-greyed-out {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    font-size: 1rem;
    opacity: 60%;
  }
  
  .change-button {
    padding: 0.75rem 1.5rem;
    margin-top: 20px;
    background-color: #FFC0CB; /* Light pink color */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .change-button:hover {
    background-color: #FFB6C1; /* Slightly darker pink on hover */
  }

  /* Add styles for the save button */
.verify-button {
  /* Similar styles to change-button */
  padding: 0.75rem 1.5rem;
  background-color: #90EE90; /* Light green color */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #32CD32; /* Darker green on hover */
}

/* Style for new email input */
.new-email {
  margin-top: -1.5rem; /* Adjust spacing as needed */
  margin-bottom: 2rem;
}
  </style>