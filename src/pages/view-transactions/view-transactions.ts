import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
/**
 * Generated class for the ViewTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-transactions',
  templateUrl: 'view-transactions.html',
})
export class ViewTransactionsPage {

  transactions: Object[][] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionProvider) {
    // Load transactions into this.transactions
    const data = this.transactionService.getTransactions();
    var bucket = -1;
    var prevDate = "";
    for(const transaction of Object.keys(data)) {
      if(data[transaction].date !== prevDate) {
        bucket ++;
        prevDate = data[transaction].date;
      }
      this.transactions[bucket].push(data[transaction]);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTransactionsPage');
  }



}
