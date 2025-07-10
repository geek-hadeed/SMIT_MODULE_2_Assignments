import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"

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
const db = getFirestore(app)
const auth = getAuth(app)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".registration-form")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#dc3545"
        isValid = false
      } else {
        field.style.borderColor = "#90EE90"
      }
    })

    if (!isValid) {
      alert("Please fill in all required fields.")
      return
    }

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Prepare data to store in Firestore
      const userData = {
        uid: user.uid,
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        gender: document.getElementById("gender").value,
        course: document.getElementById("course").value,
        proficiency: document.getElementById("proficiency").value,
        name: document.getElementById("fullname").value,
        fathername: document.getElementById("fathername").value,
        email: document.getElementById("email").value,
        phonenumber: document.getElementById("phone").value,
        cnicnumber: document.getElementById("cnic").value,
        fathercnic: document.getElementById("father-cnic").value,
        dob: document.getElementById("dob").value,
        address: document.getElementById("address").value,
        role: "student",
        createdAt: new Date().toISOString(),
      }

      // Store user data in formfill collection
      await addDoc(collection(db, "formfill"), userData)

      // Store user role in users collection for authentication
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: "student",
        name: userData.name,
      })

      console.log("User registered successfully with ID: ", user.uid)
      alert("Registration submitted successfully! You can now login.")
      form.reset()

      // Redirect to login page
      window.location.href = "login.html"
    } catch (e) {
      console.error("Error during registration: ", e)
      alert("Registration failed: " + e.message)
    }
  })

  // Form validation on blur
  const inputs = form.querySelectorAll(".form-input, .form-select")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#dc3545"
      } else {
        this.style.borderColor = "#90EE90"
      }
    })
  })
})
