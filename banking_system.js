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

  // deposit => pembayaran di awal
  async deposit(amount){    
    if (amount < 0 || amount === 0 || isNaN(amount)) {
      throw new NotAcceptableValue("Nilai tidak diterima!!");
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

async function main() {
  const atm = new BankAccount();
  
  console.log("Halo Hevin, Selamat datang!!");

  let action = 0;

  while(action != 4) {
    console.log("Silahkan pilih aksi:");
    console.log("1. Deposit");
    console.log("2. Setor Tunai");
    console.log("3. Tarik Tunai");
    console.log("4. Exit");
    console.log(`Saldo anda: Rp ${atm.getSaldo()}`);

    action = await atm.askQuestion("aksi: ");

    let amount;
    try {
      switch (parseInt(action)) {
        case 1:        
          amount = parseInt(await atm.askQuestion("Deposit berapa? : "));
  
          console.log("memproses...");
          await atm.deposit(amount);        
          console.log(`Saldo : ${atm.getSaldo()}`);            
          break;
        case 2:
          amount = parseInt(await atm.askQuestion("Setor tunai berapa? : "));
  
          console.log("memproses...");
          await atm.add(amount);
          console.log(`Saldo : ${atm.getSaldo()}`);            
          break;
        case 3:
          amount = parseInt(await atm.askQuestion("Tarik tunai berapa? : "));
  
          console.log("memproses...");
          await atm.withdraw(amount);        
          console.log(`Saldo : ${atm.getSaldo()}`);            
          break;
        case 4:
          console.log("Terimakasih dan semoga harimu menyenangkan")
          break;
        default:      
          console.log("Silahkan pilih sesuai action yang diberikan!")
          break;
      }
    } catch(error){
      if (error instanceof NotAcceptableValue) {
        console.log(error.message);
      } else {
        console.log("Cek kembali")
      }
    }
    
    
    console.log("\n");
  }    
  

  atm.closeQuestion();
}

main();

