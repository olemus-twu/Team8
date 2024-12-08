// register.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCxr_m1VTAYUEdtKYGt1x0lvv1oyHIsKEs",
    authDomain: "final-project-b934f.firebaseapp.com",
    projectId: "final-project-b934f",
    storageBucket: "final-project-b934f.appspot.com",
    messagingSenderId: "307173343593",
    appId: "1:307173343593:web:b3ff005abfd8533668bdf8",
    measurementId: "G-Y245G8VYCC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signin-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Initialize events if empty for new login
            const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
            if (storedEvents.length === 0) {
                localStorage.setItem("events", JSON.stringify([])); // Start with zero events
            }

            alert("Sign in successful!");
            window.location.href = "calendar.html";
        } catch (error) {
            console.error("Sign in error:", error);
            alert(`Error: ${error.message}`);
        }
    });
});
