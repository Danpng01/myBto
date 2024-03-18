// Assuming firebase.js exports the initialized app and possibly other Firebase services
import { auth, app } from './firebase.js'; // Import the auth instance
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(`Logged in as: ${userCredential.user.email}`);
        // Additional logic upon successful login
    } catch (error) {
        console.error("Error signing in:", error.message);
        // Handle errors, such as displaying a message to the user
    }
}

export function logOut() {
    signOut(auth).then(() => {
        console.log("User signed out.");
        // Additional logic upon successful logout
    }).catch((error) => {
        console.error("Error signing out:", error.message);
        // Handle errors, such as displaying a message to the user
    });
}

export async function register(email, password) {

    // Define the password validation function
    function isValidPassword(password) {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
    
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
    }
    // Email validation function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Check if email is valid
    if (!isValidEmail(email)) {
        alert("The email address is not valid.");
        return; // Stop the function execution if the email is invalid
    }

    // Check if the password is valid
    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters long, include uppercase letters, lowercase letters and numbers!");
        return; // Stop the function execution if the password is invalid
    }

    // Attempt to create a new user with the provided email and password
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(`User created: ${userCredential.user.email}`);
        // Here, you might want to automatically sign the user in, 
        // redirect them to another page, or show a success message
    } catch (error) {
        console.error("Error creating user:", error.message);
        // Here, you might want to show an alert for different types of errors
        alert(`Error creating user: ${error.message}`);
    }
}

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, perform actions based on that
        console.log("User is signed in");
    } else {
        // User is signed out, perform actions based on that
        console.log("User is signed out");
    }
});