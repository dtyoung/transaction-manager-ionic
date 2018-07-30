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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTransactionsPage');
    this.transactionService.transactionUpdatesByDate().subscribe(data => this.transactions = data);

  }


}
