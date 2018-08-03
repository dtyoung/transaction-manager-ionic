import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
/**
 * Generated class for the TransactionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html',
})
export class TransactionDetailPage {

  transaction: {
    category: String,
    date: String,
    icon: String,
    notes: String,
    value: String
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionDetailPage');
    console.log(this.navParams.get('transaction'));
    this.transaction = this.navParams.get('transaction');
    console.log('test', this.transaction.value);
  }

  getValue(): String {
    return this.transaction ? this.transaction.value : '';
  }

  getCategoryIcon(): String {
    return this.transaction ? this.transaction.icon : this.categoryService.getDefaultCategoryIcon();
  }

  getCategoryText(): String {
    return this.transaction ? this.transaction.category : '';
  }

  getDate(): String {
    return this.transaction ? this.transaction.date : '';
  }

  getNotes(): String {
    if (this.transaction) {
      return this.transaction.notes ? this.transaction.notes : 'No Notes'
    }
    return '';
  }

}
