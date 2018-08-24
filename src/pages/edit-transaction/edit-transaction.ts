import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectCategoryPage } from '../../pages';
import { TransactionProvider, CategoryProvider } from '../../providers';
import { Category, Transaction } from '../../types/types';
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

  category: Category;

  transaction: Transaction = {
    transactionId: '',
    value: null,
    date: '',
    categoryId: '',
    notes: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionProvider, public categoryService: CategoryProvider) {
    
  }

  ionViewDidLoad() {
    this.transaction = this.navParams.get('data');
    this.category = this.categoryService.getCategoryFromId(this.transaction.categoryId);
  }

  ionViewWillEnter() {
    const category = this.navParams.get('category') || null;
    if (category) {
      this.category = category;
    }
  }

  selectCategory() {
    this.navCtrl.push(SelectCategoryPage, { "parentPage": this, canSelect: true });
  }

  getCategoryText(): String {
    return this.category ? this.category.name : 'Select Category';
  }

  getCategoryIcon(): String {
    return this.category ? this.category.icon : this.categoryService.getDefaultCategoryIcon();
  }

  saveTransaction() {
    const update: Transaction = {
      transactionId: this.transaction.transactionId,
      categoryId: this.category.key,
      date: this.transaction.date,
      notes: this.transaction.notes,
      value: this.transaction.value
    };
    this.transactionService.updateTransaction(update);
    this.navCtrl.getPrevious().data.transaction = update;
    this.navCtrl.pop();
  }

}
