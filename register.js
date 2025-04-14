import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDGNl1qDTgmeloZRaMlNIqADYF99JAsveg",
  authDomain: "notes-app-42c4f.firebaseapp.com",
  projectId: "notes-app-42c4f",
  storageBucket: "notes-app-42c4f.appspot.com",
  messagingSenderId: "423058349540",
  appId: "1:423058349540:web:942108589731326aa03bf1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Register Button Click
document.getElementById("registerBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!email || !password) {
    errorMsg.textContent = "Please enter both email and password.";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ✅ Registration Success → Go to login or main screen
      window.location.href = "index.html"; // Redirect to login
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
    });
});
