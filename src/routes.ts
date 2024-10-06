import { Express } from 'express';
import authorize from "./authorization"
import { paymentService } from './service/payment.service';
import axios from 'axios';

export const initPresentationLayer = (app: Express) => {
    app.get('/payment/:id', authorize, async (req, res) => {
      let id = Number(req.params.id);
      const transaction = await paymentService.getTransaction(id);
      if(!transaction){
        return res.sendStatus(404);
        
      }

      return res.send(transaction);
    })

    app.post('/payment', authorize, async (req, res) => {
      const { amount, pixKey } = req.body;
      const apiURL = process.env.API_URL;

      const accountInfo = await axios.get(`${apiURL}/pixKey/?pixKey=${pixKey}`);
      if(!accountInfo){
        return res.status(404).send('Account not found')
      }

      const payment = {amount, pixKey, bank: accountInfo.data[pixKey].bank, account: accountInfo.data[pixKey].account};
      paymentService.createTransaction(payment)
        .then((response) => {
          return res.send(response)
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    })  
  }