import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectCategoryPage } from '../../pages';
import { TransactionProvider } from '../../providers';

/**
 * Generated class for the EditTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-transaction',
  templateUrl: 'edit-transaction.html',
})
export class EditTransactionPage {

  category: { name: String, icon: String };

  transaction: {
    id: String,
    category: String,
    date: String,
    icon: String,
    notes: String,
    value: String
  } = {
    id: '',
    category: '',
    date: '',
    icon: '',
    notes: '',
    value: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionProvider) {
    
  }

  ionViewDidLoad() {
    this.transaction = this.navParams.get('transaction');
    console.log(this.transaction);
  }

  ionViewWillEnter() {
    const category = this.navParams.get('category') || null;
    if (category) {
      this.transaction.category = category.name;
      this.transaction.icon = category.icon;
    }
  }

  selectCategory() {
    this.navCtrl.push(SelectCategoryPage, { "parentPage": this });
  }

  getCategoryText(): String {
    return this.transaction.category ? this.transaction.category : 'Select Category';
  }

  getCategoryIcon(): String {
    return this.transaction.icon ? this.transaction.icon : 'md-help';
  }

  saveTransaction() {
    const update = { 
      category: this.transaction.category,
      date: this.transaction.date,
      icon: this.transaction.icon,
      notes: this.transaction.notes,
      value: this.transaction.value
    };
    this.transactionService.updateTransaction(this.transaction.id, update);
    this.navCtrl.pop();
  }

}
