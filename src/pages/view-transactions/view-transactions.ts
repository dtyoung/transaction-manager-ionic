import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionProvider, CategoryProvider } from '../../providers';
import { AddTransactionPage, TransactionDetailPage } from '../../pages';
import { Transaction } from '../../types/types';
var moment = require('moment')

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

  dataLoading: Boolean = true;

  transactions: Transaction[][] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionProvider, public categoryService: CategoryProvider) {
  }

  ionViewDidLoad() {
    this.dataLoading = this.transactionService.isInitializing();
    this.transactionService.transactionUpdatesByDate().subscribe(data => {
      this.transactions = data;
      this.dataLoading = false;
      console.log('length', this.transactions.length);
    });
  }

  addTransaction() {
    this.navCtrl.push(AddTransactionPage);
  }

  moreDetailTransaction(transaction: Transaction) {
    this.navCtrl.push(TransactionDetailPage, { transaction })
  }

  formatDate(date: String): String {
    return moment(date, 'YYYY-MM-DD').format('dddd Do MMMM');
  }

  getIconFromCategoryId(id: String): String {
    return this.categoryService.getIconFromCategoryId(id);
  }

  getNameFromCategoryId(id: String): String {
    return this.categoryService.getNameFromCategoryId(id);
  }

}
