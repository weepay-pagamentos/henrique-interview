import { Payment } from "../model/payment";
import { Transaction } from "../model/transaction";
import { paymentRepository } from "../repository/payment.repository";

export const paymentService = {
    async getTransaction(id: number): Promise<Transaction | null>{
        try{
            return paymentRepository.getTransaction(id)
        }catch(error){
            console.log("error: ", error)
            return null
        }
    },

    async createTransaction(payment: Payment): Promise<Transaction | null>{
        return paymentRepository.createTransaction(payment)
            .then((res) => res)
            .catch((err) => {
                console.log(err)
                return err
            })
    }

}