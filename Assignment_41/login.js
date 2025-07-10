import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDj88p4sHuC_XIKLmFo31shP6IyOOa-j04",
  authDomain: "smit-form-hh.firebaseapp.com",
  projectId: "smit-form-hh",
  storageBucket: "smit-form-hh.firebasestorage.app",
  messagingSenderId: "136724606743",
  appId: "1:136724606743:web:0a6e276ec1b1e0f9419152",
  measurementId: "G-DR6608QR5J",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("username").value
    const password = document.getElementById("password").value

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      console.log("User signed in:", user.email, "UID:", user.uid)

      // Store session information
      sessionStorage.setItem("userEmail", user.email)
      sessionStorage.setItem("userUID", user.uid)
      sessionStorage.setItem("isLoggedIn", "true")

      // Check if admin
      if (email === "admin@gmail.com") {
        sessionStorage.setItem("userRole", "admin")
        window.location.href = "admin.html"
      } else {
        sessionStorage.setItem("userRole", "student")
        window.location.href = "dashboard.html"
      }
    } catch (error) {
      console.error("Login error:", error.code, error.message)
      alert(`Login failed: ${error.message}`)
    }
  })
})
