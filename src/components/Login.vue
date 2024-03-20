<template>
    <h3>This is a Login Page</h3> 
    <p></p>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="handleLogin">Login</button>
    <p></p>
    <button @click="redirectToRegister">Not registered? Register here</button>

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

    