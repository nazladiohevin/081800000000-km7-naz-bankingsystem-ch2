const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class NotAcceptableValue extends Error {
  constructor(message) {
    super(message);
    this.name = "Nilai tidak diterima";
  }
}

class BankAccount {

  #saldo = 0;

  constructor(name, university) {
    this.name = name;
    this.university = university;
  }

  // deposit => pembayaran di awal
  async deposit(amount){    
    if (amount < 0 || amount === 0 || isNaN(amount)) {
      throw new NotAcceptableValue("Nilai tidak diterima!!");
    }

    if (this.#saldo !== 0) {
      throw new Error("Deposit tak bisa dilakukan, karena kamu udah pernah melakukan deposit");
    }

    return new Promise(resolve => {
      const callback = () => {
        this.#saldo = amount;
        resolve();        
      }
      setTimeout(callback, 2000);
    });
  }

  // add saldo => setor tunai
  async add(amount) {
    if (amount < 0 || amount === 0 || isNaN(amount)) {
      throw new NotAcceptableValue("Nilai tidak diterima!!");
    }   
    
    return new Promise(resolve => {
      const callback = () => {
        this.#saldo += amount;    
        resolve();
      };  
      setTimeout(callback, 2000);
    });
  }

  // withdraw => tarik tunai
  async withdraw(amount) {
    if (amount < 0 || amount === 0 || isNaN(amount)) {
      throw new NotAcceptableValue("Nilai tidak diterima!!");
    }
    
    return new Promise(resolve => {
      const callback = () => {
        this.#saldo -= amount;      
        resolve();
      };
      setTimeout(callback, 2000);
    });
  }

  askQuestion(say) {
    return new Promise(resolve => rl.question(say, resolve));
  }

  getSaldo() {
    return this.#saldo;
  }

  closeQuestion(){
    rl.close();
  }

}

module.exports = {
  BankAccount,
  NotAcceptableValue
};