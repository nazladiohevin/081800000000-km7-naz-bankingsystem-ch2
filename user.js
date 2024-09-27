class User {
  constructor(name, university) {
    this.name = name;
    this.university = university;
  }

  greet() {
    console.log(`Nama : ${this.name}\nUniversitas : ${this.university}`);
  }
}

module.exports = User;