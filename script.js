// LOGIN FUNCTION
function login() {
  let name = document.getElementById("name").value;
  let roll = document.getElementById("roll").value;
  let dept = document.getElementById("class").value;
  let rollError = document.getElementById("rollError");
  let generalError = document.getElementById("generalError");

  // Clear previous errors
  rollError.innerText = "";
  generalError.innerText = "";

  if (!name || !roll || !dept) {
    generalError.innerText = "Fill all fields";
    return;
  }

  if (!roll.includes("170")) {
    rollError.innerText = "Invalid Roll Number ";
    return;
  }

  // Check for admin
  if (name === "pixelcoder" && roll === "231702005" && dept === "CSD") {
    localStorage.setItem("isAdmin", "true");
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let existingUser = users.find(u => u.roll === roll);

  if (!existingUser) {
    users.push({
      name: name,
      roll: roll,
      loginTime: new Date().toLocaleString()
    });
  }

  localStorage.setItem("users", JSON.stringify(users));

  // Save current user
  localStorage.setItem("currentUser", JSON.stringify({ name, roll }));

  window.location.href = "home.html";
}


// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
}


// NAVIGATION
function goToAdmin() {
  window.location.href = "admin.html";
}


// RESOURCE SECTION
function openSection(type) {
  let content = document.getElementById("content");

  if (type === "unreal") {
    if (content.innerHTML.includes("Unreal Engine")) {
      content.innerHTML = "";
      document.getElementById("unrealBtn").style.display = "inline-block";
      document.getElementById("mayaBtn").style.display = "inline-block";
      document.getElementById("backBtn").style.display = "none";
    } else {
      content.innerHTML = `
        <div class="resource-box">
          <h2>Unreal Engine</h2>
          <a class="resource-link" href="https://drive.google.com/drive/folders/1a0174zZVI0owZWBYMMFj37weXU_og9N7" target="_blank">Unreal Tutorial </a>
          <a class="resource-link" href="https://drive.google.com/drive/folders/1CmA7HeVepBp4aRlOjNfcZ_iEQhtOO_jW" target="_blank">Unreal Source File</a>
        </div>
      `;
      document.getElementById("unrealBtn").style.display = "none";
      document.getElementById("mayaBtn").style.display = "none";
      document.getElementById("backBtn").style.display = "inline-block";
    }
  }

  if (type === "maya") {
    if (content.innerHTML.includes("Maya")) {
      content.innerHTML = "";
      document.getElementById("unrealBtn").style.display = "inline-block";
      document.getElementById("mayaBtn").style.display = "inline-block";
      document.getElementById("backBtn").style.display = "none";
    } else {
      content.innerHTML = `
        <div class="resource-box">
          <h2>Maya</h2>
          <a class="resource-link" href="https://drive.google.com/drive/folders/1I5iD0L6DrvHOnulhwU9QU3d6DNEo9_lK" target="_blank">Maya Tutorial</a>
          <a class="resource-link" href="https://drive.google.com/drive/folders/1ZSQWTUtYLhbvHpOvpMydpGrAcBl0wEnq" target="_blank">Maya Source File</a>
        </div>
      `;
      document.getElementById("unrealBtn").style.display = "none";
      document.getElementById("mayaBtn").style.display = "none";
      document.getElementById("backBtn").style.display = "inline-block";
    }
  }
}

// GO BACK FUNCTION
function goBack() {
  document.getElementById("content").innerHTML = "";
  document.getElementById("unrealBtn").style.display = "inline-block";
  document.getElementById("mayaBtn").style.display = "inline-block";
  document.getElementById("backBtn").style.display = "none";
}


// DISPLAY USERS (ADMIN)
function displayUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let list = document.getElementById("userList");

  if (!list) return;

  list.innerHTML = "";

  users.forEach((user, index) => {
    list.innerHTML += `
      <li>
        ${index + 1}. ${user.name} (${user.roll}) - ${user.loginTime}
      </li>
    `;
  });

  let totalUsersEl = document.getElementById("totalUsers");
  if (totalUsersEl) {
    totalUsersEl.innerText = users.length;
  }
}


// CLEAR USERS
function clearUsers() {
  localStorage.removeItem("users");
  displayUsers();
}


// TRACK VISITS
function trackVisit() {
  let visits = JSON.parse(localStorage.getItem("visits")) || {};
  let today = new Date().toLocaleDateString();

  visits[today] = (visits[today] || 0) + 1;

  localStorage.setItem("visits", JSON.stringify(visits));
}


// CLEAR ERRORS ON INPUT
function clearErrors() {
  document.getElementById("rollError").innerText = "";
  document.getElementById("generalError").innerText = "";
}

// RUN ON LOAD
window.onload = function () {
  trackVisit();
  displayUsers();
  
  // Add event listener to clear errors when user starts typing in name field
  document.getElementById("name").addEventListener("input", clearErrors);
};