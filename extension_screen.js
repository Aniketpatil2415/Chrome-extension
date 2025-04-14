import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDGNl1qDTgmeloZRaMlNIqADYF99JAsveg",
  authDomain: "notes-app-42c4f.firebaseapp.com",
  projectId: "notes-app-42c4f",
  storageBucket: "notes-app-42c4f.appspot.com",
  messagingSenderId: "423058349540",
  appId: "1:423058349540:web:942108589731326aa03bf1"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Checking if user is logged in or not
auth.onAuthStateChanged(user => {
  const userInfoDiv = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const usernameDisplay = document.getElementById("usernameDisplay");

  if (user) {
    // If user is logged in, show user info
    usernameDisplay.innerText = user.displayName || 'User';
    userInfoDiv.innerHTML = `
      <p>Logged in as: ${user.email}</p>
    `;
    logoutBtn.style.display = "block";  // Show logout button
  } else {
    // If user is not logged in, redirect to login page
    window.location.href = "index.html"; // Go to login page
  }

  // Logout Button Click
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      // After sign-out, redirect to login page
      window.location.href = "index.html"; // Redirect to login
    }).catch((error) => {
      console.error("Logout Error: ", error.message);
    });
  });
});
