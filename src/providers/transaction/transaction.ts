
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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
    const database = firebase.database();
    database.ref('/user/transactions').push({
      value, category, date, notes, icon
    });
  }

  transactionUpdatesByDate(): Observable<Object[][]> {
    // this.updatedSinceLastRead = false;

    return this.transactionsObservable;
    // return this.transactions;
  }

  private loadTransactionsByDate() {
    firebase.database().ref('/user/transactions').orderByChild('date').on('value', (snapshot => {
      const tempTransactions = [];

      var prevDate = "";
      snapshot.forEach(childSnapshot => {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        const transaction = { key: childData }

        if (childData.date !== prevDate) {
          prevDate = childData.date;
          tempTransactions.unshift([]);
        }
        tempTransactions[0].unshift(transaction);
      });
      this.transactions = tempTransactions;
      console.log(this.transactions);
      this.transactionsObserver.next(this.transactions)
    }));
  }

}
