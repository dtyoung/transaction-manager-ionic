
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Transaction } from '../../types/types';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  private transactions: Transaction[][];
  private transactionsObservable: Observable<Transaction[][]>;
  private transactionsObserver;

  constructor() {
    this.transactionsObservable = Observable.create(observer => {
      this.transactionsObserver = observer;
      this.loadTransactionsByDate();
    })
  }

  isInitializing(): Boolean {
    return this.transactions === undefined;
  }

  addTransaction(transaction: Transaction) {
    const { currentUser } = firebase.auth();
    const transactionToAdd = {
      value: transaction.value,
      notes: transaction.notes,
      date: transaction.date,
      categoryId: transaction.categoryId
    }
    firebase.database().ref(`/users/${currentUser.uid}/transactions`).push(transactionToAdd);
  }

  transactionUpdatesByDate(): Observable<Transaction[][]> {
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
        const transaction: Transaction = childData;
        transaction.transactionId = key;

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

  updateTransaction(transaction: Transaction) {
    var update = {};
    const { currentUser } = firebase.auth();
    const transactionUpdate = {
      categoryId: transaction.categoryId,
      date: transaction.date,
      notes: transaction.notes,
      value: transaction.value
    };
    update[`/users/${currentUser.uid}/transactions/`+ transaction.transactionId] = transactionUpdate;

    return firebase.database().ref().update(update)
  }

  deleteTransaction(transaction: Transaction) {
    var update = {};
    const { currentUser } = firebase.auth();
    update[`/users/${currentUser.uid}/transactions/`+ transaction.transactionId] = null;

    return firebase.database().ref().update(update)
  }
}

