import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectCategoryPage } from '../../pages/select-category/select-category'
import { TransactionProvider } from '../../providers/transaction/transaction';
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

  category: { name: String, icon: String } = null;
  value: Number = 0.00;
  date: String = new Date().toISOString().substring(0, 10);
  notes: String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactions: TransactionProvider) {
  }

  ionViewWillEnter() {
    this.category = this.navParams.get('category') || null;
  }

  selectCategory() {
    this.navCtrl.push(SelectCategoryPage, { "parentPage": this });
  }

  getCategoryText(): String {
    return this.category ? this.category.name : 'Select Category';
  }

  getCategoryIcon(): String {
    return this.category ? this.category.icon : 'md-help';
  }

  submitTransaction() {
    this.transactions.addTransaction(this.value, this.category.name, this.date, this.notes)
  }
}
