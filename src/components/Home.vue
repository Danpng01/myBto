<template>
  <div>
    <h1>Congrats! You are logged in!</h1>
    <button @click="handleSignout">Sign out</button>
  </div>
</template>

<script>
import { logOut } from '../../scripts/auth.js'; 
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();

    // Wrapper async function for handling sign out
    const handleSignout = async () => {
      try {
        // Directly await the logOut() promise without wrapping it in a new Promise
        await logOut();
        console.log("User signed out.");
        // Go to login after logging out
        router.push({ name: 'Login' });
      } catch (error) {
        console.error("Error signing out:", error.message);
      }
    };

    return {
      handleSignout,
    };
  },
};
</script>