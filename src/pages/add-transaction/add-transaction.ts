import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SelectCategoryPage } from '../../pages';
import { CategoryProvider, TransactionProvider } from '../../providers';
import { Category, Transaction } from '../../types/types';
/**
 * Generated class for the AddTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-transaction',
  templateUrl: 'add-transaction.html',
})
export class AddTransactionPage {

  category: Category = null;
  value: Number = 0.00;
  date: String = new Date().toISOString().substring(0, 10);
  notes: String = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public transactions: TransactionProvider,
    public categories: CategoryProvider
  ) { }

  ionViewWillEnter() {
    this.category = this.navParams.get('category') || null;
  }

  selectCategory() {
    this.navCtrl.push(SelectCategoryPage, { "parentPage": this, "canSelect": true });
  }

  getCategoryText(): String {
    return this.category ? this.category.name : 'Select Category';
  }

  getCategoryIcon(): String {
    return this.category ? this.category.icon : 'md-help';
  }

  submitTransaction() {
    const categoryId = this.category ? this.category.key : null;

    const transaction: Transaction = {
      value: this.value,
      categoryId: categoryId,
      date: this.date,
      notes: this.notes,
      transactionId: null
    }
    this.transactions.addTransaction(transaction)
    this.navCtrl.pop();
  }
}
