import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { CategoryProvider } from '../../providers';
import { EditTransactionPage, TransactionPopoverPage } from '../../pages';
import { Transaction } from '../../types/types';
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

  transaction: Transaction

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryProvider, private popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    console.log(this.navParams.get('transaction'))
    this.transaction = this.navParams.get('transaction');
  }

  getValue(): Number {
    return this.transaction ? this.transaction.value : null;
  }

  getCategoryIcon(): String {
    return this.transaction ? this.categoryService.getIconFromCategoryId(this.transaction.categoryId) : '';
  }

  getCategoryText(): String {
    return this.transaction ? this.categoryService.getNameFromCategoryId(this.transaction.categoryId) : '';
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

  editTransaction() {
    const transaction = this.transaction;
    this.navCtrl.push(EditTransactionPage, { "parentPage": this, transaction })
  }

  presentPopover(ev) {
    const transaction = this.transaction;
    let popover = this.popoverCtrl.create(TransactionPopoverPage, {transaction});
    
    popover.present({ ev: ev });
  }

}
