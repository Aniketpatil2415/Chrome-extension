// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGN11qDTgmeloZRaM1NIqADYF99JAsveg",
    authDomain: "notes-app-42c4f.firebaseapp.com",
    projectId: "notes-app-42c4f",
    storageBucket: "notes-app-42c4f.firebasestorage.app",
    messagingSenderId: "423058349540",
    appId: "1:423058349540:web:942108589731326aa03bf1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// UI Elements
const emailLoginBtn = document.getElementById('emailLoginBtn');
const phoneLoginBtn = document.getElementById('phoneLoginBtn');
const emailForm = document.getElementById('emailForm');
const phoneForm = document.getElementById('phoneForm');
const otpInput = document.getElementById('otp');
const phoneNumberInput = document.getElementById('phoneNumber');

// Toggle Forms
emailLoginBtn.addEventListener('click', () => {
    emailForm.classList.remove('hidden');
    phoneForm.classList.add('hidden');
});
phoneLoginBtn.addEventListener('click', () => {
    phoneForm.classList.remove('hidden');
    emailForm.classList.add('hidden');
});

// Email Login
function loginWithEmail() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Login successful');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

// Phone OTP Login
let verificationId;
function sendOTP() {
    const phoneNumber = phoneNumberInput.value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('phoneForm', {
        size: 'invisible',
    });

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            verificationId = confirmationResult.verificationId;
            otpInput.classList.remove('hidden');
            document.querySelector("button[onclick='verifyOTP()']").classList.remove('hidden');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

function verifyOTP() {
    const otp = otpInput.value;
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);

    auth.signInWithCredential(credential)
        .then((userCredential) => {
            alert('Login successful');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}
