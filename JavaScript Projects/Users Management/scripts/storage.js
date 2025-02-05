export class UserManager {
  constructor() {
      this.users = JSON.parse(localStorage.getItem('users')) || [];
  }

  saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers() {
      return this.users;
  }

  addUser(user) {
      this.users.push(user);
      this.saveUsers();
  }

  deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
      this.saveUsers();
  }

  loginUser(userId) {
      const user = this.users.find((user) => user.id === userId);
      if (user) {
          user.loggedIn = true;
          this.saveUsers();
      }
  }

  disconnectUser(userId) {
      const user = this.users.find((user) => user.id === userId);
      if (user) {
          user.loggedIn = false;
          this.saveUsers();
      }
  }
}
