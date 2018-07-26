
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  constructor() {
    console.log('Hello TransactionProvider Provider');
  }

  addTransaction(value: Number, category: String, date: String, notes: String){
    const database = firebase.database();
    database.ref('/user/transactions').push({
      value, category, date, notes
    });
  }
}
