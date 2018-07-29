
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  private transactions: Object = {};
  private updatedSinceLastRead: Boolean = false;

  constructor() {
    console.log('Hello TransactionProvider Provider');
    this.loadTransactions();
  }

  addTransaction(value: Number, category: String, date: String, notes: String){
    const database = firebase.database();
    database.ref('/user/transactions').push({
      value, category, date, notes
    });
  }

  getTransactions(): Object {
    this.updatedSinceLastRead = false;
    return this.transactions;
  }

  hasBeenUpdated(): Boolean {
    return this.updatedSinceLastRead;
  }

  private loadTransactions() {
    firebase.database().ref('/user/transactions').on("value", (snapshot => {
      this.transactions = snapshot.val();
      this.updatedSinceLastRead = true;
    }))
  }

}
