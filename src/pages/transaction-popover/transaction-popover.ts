import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, App, AlertController } from 'ionic-angular';
import { EditTransactionPage } from '../../pages';
import { TransactionProvider } from '../../providers';
import { Category, Transaction } from '../../types/types';
/**
 * Generated class for the TransactionPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-popover',
  templateUrl: 'transaction-popover.html',
})

/**
 * Requires a few navParams to be passed to function
 * data - either a category or a transaction
 * editPage - the Page that should be pushed to editing
 * deleteHandler - a function that is used to delete the data
 * deleteSubtitle - the message to be displayed when deleting the data
 */
export class TransactionPopoverPage {

  data: Transaction | Category;

  constructor(public viewCtrl: ViewController, public appCtrl: App, public navParams: NavParams, public alertCtrl: AlertController, public transactionService: TransactionProvider) {
    this.data = this.navParams.get('data'); 
  }

  edit() {
    this.viewCtrl.dismiss();
    const data = this.data;
    const page = this.navParams.get('editPage')
    this.appCtrl.getRootNav().push(page, { data });
  }

  delete() {
    this.viewCtrl.dismiss();
    const deleteSubtitle = this.navParams.get('deleteSubtitle');
    const deleteHandler = this.navParams.get('deleteHandler')
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      subTitle: deleteSubtitle,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'Delete',
        handler: () => {
          deleteHandler(this.data);
          this.appCtrl.getRootNav().pop();
        }
      }]
    });
    alert.present();
  }

}
