export class User {
  constructor(id, firstName, lastName, email, password, loggedIn = false) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.loggedIn = loggedIn;
  }
}
