import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
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

let currentEditId = null
let studentsData = []

document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuthentication()
  loadStudentsData()

  // Event listeners
  document.getElementById("adminLogoutBtn").addEventListener("click", logout)
  document.querySelector(".close").addEventListener("click", closeModal)
  document.getElementById("cancelEdit").addEventListener("click", closeModal)
  document.getElementById("editForm").addEventListener("submit", saveEdit)

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("editModal")
    if (event.target === modal) {
      closeModal()
    }
  })
})

function checkAdminAuthentication() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  const userRole = sessionStorage.getItem("userRole")
  const userEmail = sessionStorage.getItem("userEmail")

  if (!isLoggedIn || userRole !== "admin" || userEmail !== "admin@gmail.com") {
    alert("Access denied. Admin privileges required.")
    window.location.href = "login.html"
    return
  }
}

async function loadStudentsData() {
  const studentTableBody = document.getElementById("studentTableBody")
  const noDataMessage = document.getElementById("noDataMessage")
  const totalStudentsElement = document.getElementById("totalStudents")

  try {
    const querySnapshot = await getDocs(collection(db, "formfill"))
    studentsData = []

    if (querySnapshot.empty) {
      noDataMessage.style.display = "block"
      totalStudentsElement.textContent = "0"
      return
    }

    // Clear existing table data
    studentTableBody.innerHTML = ""

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const studentInfo = { id: doc.id, ...data }
      studentsData.push(studentInfo)

      const row = studentTableBody.insertRow()
      row.innerHTML = `
        <td>${data.name || "N/A"}</td>
        <td>${data.email || "N/A"}</td>
        <td>${data.phonenumber || "N/A"}</td>
        <td>${data.course || "N/A"}</td>
        <td>${data.city || "N/A"}</td>
        <td>${data.country || "N/A"}</td>
        <td>${data.gender || "N/A"}</td>
        <td class="action-buttons">
          <button class="btn-edit" onclick="editStudent('${doc.id}')">Edit</button>
          <button class="btn-delete" onclick="deleteStudent('${doc.id}')">Delete</button>
        </td>
      `
    })

    totalStudentsElement.textContent = studentsData.length
  } catch (e) {
    console.error("Error fetching documents: ", e)
    alert("Error loading student data.")
    noDataMessage.textContent = "Error loading student data."
    noDataMessage.style.display = "block"
  }
}

// Make functions global so they can be called from onclick
window.editStudent = (studentId) => {
  const student = studentsData.find((s) => s.id === studentId)
  if (!student) return

  currentEditId = studentId

  // Populate form fields
  document.getElementById("editName").value = student.name || ""
  document.getElementById("editEmail").value = student.email || ""
  document.getElementById("editPhone").value = student.phonenumber || ""
  document.getElementById("editCourse").value = student.course || ""
  document.getElementById("editCity").value = student.city || ""
  document.getElementById("editCountry").value = student.country || ""

  // Show modal
  document.getElementById("editModal").style.display = "block"
}

window.deleteStudent = async (studentId) => {
  if (!confirm("Are you sure you want to delete this student?")) {
    return
  }

  try {
    await deleteDoc(doc(db, "formfill", studentId))
    alert("Student deleted successfully!")
    loadStudentsData() // Reload the table
  } catch (error) {
    console.error("Error deleting student:", error)
    alert("Error deleting student: " + error.message)
  }
}

async function saveEdit(e) {
  e.preventDefault()

  if (!currentEditId) return

  const updatedData = {
    name: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phonenumber: document.getElementById("editPhone").value,
    course: document.getElementById("editCourse").value,
    city: document.getElementById("editCity").value,
    country: document.getElementById("editCountry").value,
    updatedAt: new Date().toISOString(),
  }

  try {
    await updateDoc(doc(db, "formfill", currentEditId), updatedData)
    alert("Student updated successfully!")
    closeModal()
    loadStudentsData() // Reload the table
  } catch (error) {
    console.error("Error updating student:", error)
    alert("Error updating student: " + error.message)
  }
}

function closeModal() {
  document.getElementById("editModal").style.display = "none"
  currentEditId = null
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
