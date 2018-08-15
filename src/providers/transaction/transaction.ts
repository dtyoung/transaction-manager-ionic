
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

var moment = require('moment');

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  private transactions: Object[][];
  private transactionsObservable: Observable<Object[][]>;
  private transactionsObserver;

  constructor() {
    this.transactionsObservable = Observable.create(observer => {
      this.transactionsObserver = observer;
      this.loadTransactionsByDate();
    })
  }

  addTransaction(value: Number, category: String, date: String, notes: String, icon: String) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    database.ref(`/users/${currentUser.uid}/transactions`).push({
      value, category, date, notes, icon
    });
  }

  transactionUpdatesByDate(): Observable<Object[][]> {
    return this.transactionsObservable;
  }

  private loadTransactionsByDate() {

    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/transactions`).orderByChild('date').on('value', (snapshot => {
      const tempTransactions = [];

      var prevDate = "";
      snapshot.forEach(childSnapshot => {
        var key = childSnapshot.key;
        
        var childData = childSnapshot.val();
        childData.id = key;
        const transaction = childData;

        if (childData.date !== prevDate) {
          prevDate = childData.date;
          tempTransactions.unshift([]);
        }
        tempTransactions[0].unshift(transaction);
      });
      this.transactions = tempTransactions;
      this.transactionsObserver.next(this.transactions);
    }));
  }

  updateTransaction(key: String, transaction: any) {
    var update = {};
    const { currentUser } = firebase.auth();
    update[`/users/${currentUser.uid}/transactions/`+ key] = transaction;

    return firebase.database().ref().update(update)
  }

  deleteTransaction(key: String) {
    var update = {};
    const { currentUser } = firebase.auth();
    update[`/users/${currentUser.uid}/transactions/`+ key] = null;

    return firebase.database().ref().update(update)
  }
}

