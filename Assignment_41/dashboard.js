import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"

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

// Check authentication on page load
document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication()
  loadStudentData()

  // Logout functionality
  document.getElementById("logoutBtn").addEventListener("click", logout)
})

function checkAuthentication() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  const userRole = sessionStorage.getItem("userRole")

  if (!isLoggedIn || userRole !== "student") {
    alert("Access denied. Please login first.")
    window.location.href = "login.html"
    return
  }
}

async function loadStudentData() {
  const userEmail = sessionStorage.getItem("userEmail")

  if (!userEmail) {
    console.error("No user email found in session")
    return
  }

  try {
    const q = query(collection(db, "formfill"), where("email", "==", userEmail))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const studentData = querySnapshot.docs[0].data()
      displayStudentInfo(studentData)
    } else {
      console.log("No student data found")
    }
  } catch (error) {
    console.error("Error loading student data:", error)
  }
}

function displayStudentInfo(data) {
  document.getElementById("studentName").textContent = data.name || "Student"
  document.getElementById("displayName").textContent = data.name || "-"
  document.getElementById("displayFatherName").textContent = data.fathername || "-"
  document.getElementById("displayEmail").textContent = data.email || "-"
  document.getElementById("displayPhone").textContent = data.phonenumber || "-"
  document.getElementById("displayGender").textContent = data.gender || "-"
  document.getElementById("displayDob").textContent = data.dob || "-"
  document.getElementById("displayCourse").textContent = data.course || "-"
  document.getElementById("displayProficiency").textContent = data.proficiency || "-"
  document.getElementById("displayCountry").textContent = data.country || "-"
  document.getElementById("displayCity").textContent = data.city || "-"
  document.getElementById("displayAddress").textContent = data.address || "-"
}

async function logout() {
  try {
    await signOut(auth)
    sessionStorage.clear()
    window.location.href = "login.html"
  } catch (error) {
    console.error("Logout error:", error)
  }
}
