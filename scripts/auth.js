// Assuming firebase.js exports the initialized app and possibly other Firebase services
import { auth, app } from './firebase.js'; // Import the auth instance
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getAuth, sendEmailVerification, updateEmail } from "firebase/auth";


export async function signIn(email, password) {
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
        throw new Error("The email address invalid.");; // Stop the function execution if the email is invalid
    }

    // Check if the password is valid
    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters long, include uppercase letters, lowercase letters and numbers!");
        throw new Error("Password invalid!"); // Stop the function execution if the password is invalid
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(`Logged in as: ${userCredential.user.email}`);
        return userCredential; // Return the userCredential on success
    } catch (error) {
        console.error("Error signing in:", error.message);
        alert("Invalid credentials");
        throw error; // Rethrow the error to handle it in the calling component
    }
}

export function logOut() {
    try {  
        return signOut(auth); // This returns a promise
    } catch (error) {
        console.error("Error signing out:", error.message);
        throw(error)
    }
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
        throw new Error("The email address invalid.");; // Stop the function execution if the email is invalid
    }

    // Check if the password is valid
    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters long, include uppercase letters, lowercase letters and numbers!");
        throw new Error("Password invalid!"); // Stop the function execution if the password is invalid
    }

    // Attempt to create a new user with the provided email and password
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(`User created: ${userCredential.user.email}`);
        return userCredential;

    } catch (error) {
        console.error("Error creating user:", error.message);
        // Here, you might want to show an alert for different types of errors
        throw(error);
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