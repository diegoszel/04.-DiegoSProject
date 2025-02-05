export default class DomService {
  static renderUsers(users, userManager) {
    const userTableBody = document.querySelector("#userTable tbody");
    userTableBody.innerHTML = ""; // Clear existing rows

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.dataset.id = user.id; // Store user ID in a data attribute
      row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.loggedIn ? "מחובר/ת" : "מנותק/ת"}</td>
            <td>
                <button class="edit">עריכה</button>
                <button class="delete">מחיקה</button>
                ${
                  user.loggedIn ? `<button class="disconnect">נתק</button>` : ""
                }
            </td>
        `;
      userTableBody.appendChild(row);
    });

    // Add event delegation for buttons
    userTableBody.addEventListener("click", (event) => {
      const target = event.target;

      if (target.tagName === "BUTTON") {
        const row = target.closest("tr");
        const userId = parseInt(row.dataset.id, 10);

        if (target.classList.contains("edit")) {
          const user = userManager
            .getUsers()
            .find((user) => user.id === userId);
          if (user) {
            DomService.showEditForm(user, userManager);
          }
        } else if (target.classList.contains("delete")) {
          userManager.deleteUser(userId);
          DomService.renderUsers(userManager.getUsers(), userManager);
          alert("המשתמש נמחק בהצלחה!");
          event.stopImmediatePropagation();
        } else if (target.classList.contains("disconnect")) {
          userManager.disconnectUser(userId);
          DomService.renderUsers(userManager.getUsers(), userManager);
          alert("המשתמש נותק בהצלחה!");
          event.stopImmediatePropagation();
        }
      }
    });
  }

  // Method to show the edit form
  static showEditForm(user, userManager) {
    const editFormContainer = document.getElementById("editFormContainer");
    const editForm = document.getElementById("editForm");
    const { firstName, lastName, email } = user;

    // Populate form with user data
    editForm.querySelector("#editFirstName").value = firstName;
    editForm.querySelector("#editLastName").value = lastName;
    editForm.querySelector("#editEmail").value = email;
    editForm.querySelector("#editPassword").value = user.password;
    

    // Show the edit form
    editFormContainer.style.display = "block";

    // Handle form submission
    editForm.onsubmit = (e) => {
      e.preventDefault();

      // Get updated data
      const updatedFirstName = editForm
        .querySelector("#editFirstName")
        .value.trim();
      const updatedLastName = editForm
        .querySelector("#editLastName")
        .value.trim();
      const updatedEmail = editForm.querySelector("#editEmail").value.trim();
      const updatedPassword = editForm
        .querySelector("#editPassword")
        .value.trim();

      // Update user data
      user.firstName = updatedFirstName;
      user.lastName = updatedLastName;
      user.email = updatedEmail;
      user.password = updatedPassword;

      userManager.saveUsers(); // Save changes to storage
      DomService.renderUsers(userManager.getUsers(), userManager); // Re-render table

      // Hide the edit form
      editFormContainer.style.display = "none";
      alert("המשתמש עודכן בהצלחה!");
    };
  }
}
