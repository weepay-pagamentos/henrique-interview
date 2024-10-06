import { Payment } from "../model/payment";
import { Transaction } from "../model/transaction";

let idCounter = 0;
const database: { [key: number]: Transaction } = {}; 


export const paymentRepository = {
  createTransaction(payment: Payment): Promise<Transaction> {
    return new Promise((resolve, _) => {
      const transaction = { id: idCounter++, ...payment };
      database[transaction.id] = transaction;
      resolve(transaction)
    })
  },

  getTransaction(id: number): Promise<Transaction> {
    return new Promise((resolve, _) => {
      let transaction = database[id];
      resolve(transaction)
    })
  }
}