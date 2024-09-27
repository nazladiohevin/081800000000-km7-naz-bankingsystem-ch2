const { BankAccount, NotAcceptableValue } = require("./bank_account.js");

async function main() {
  const atm = new BankAccount("Nazla Dio Hevin", "Univ Amikom Yogyakarta");
  
  console.log(`Halo ${atm.name} dari ${atm.university}, Selamat datang!!`);

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
        console.log(error.message)
      }
    }
    
    
    console.log("\n");
  }    
  

  atm.closeQuestion();
}

main();

