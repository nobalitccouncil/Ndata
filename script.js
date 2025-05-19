const API_URL = "https://bb-k19r.onrender.com";

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const student = {
    name: document.getElementById("name").value,
    course: document.getElementById("course").value,
    center: document.getElementById("center").value,
    feesPaid: document.getElementById("feesPaid").value,
    date: document.getElementById("date").value,
  };
  await fetch(API_URL + "/add-student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  loadStudents();
});

async function loadStudents() {
  const res = await fetch(API_URL + "/students");
  const students = await res.json();
  const list = document.getElementById("studentList");
  list.innerHTML = "";
  students.forEach((s) => {
    list.innerHTML += `<div>${s.name} - ${s.course} - ₹${s.feesPaid} 
      <button onclick="deleteStudent('${s._id}')">Delete</button></div>`;
  });
}

async function deleteStudent(id) {
  await fetch(API_URL + "/student/" + id, { method: "DELETE" });
  loadStudents();
}

loadStudents();
