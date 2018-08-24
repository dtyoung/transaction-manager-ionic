import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { CategoryProvider, TransactionProvider } from '../../providers';
import { EditTransactionPage, EditDeletePopoverPage } from '../../pages';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoryService: CategoryProvider, 
    public transactionService: TransactionProvider,
    private popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
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

  presentPopover(ev) {
    const transaction = this.transaction;
    let popover = this.popoverCtrl.create(EditDeletePopoverPage, {
      data: transaction,
      editPage: EditTransactionPage,
      deleteHandler: this.transactionService.deleteTransaction,
      deleteSubtitle: 'Are you sure you want to delete this transaction?'
    });
    
    popover.present({ ev: ev });
  }

}
