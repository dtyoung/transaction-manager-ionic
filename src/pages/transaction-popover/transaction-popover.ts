import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, App, AlertController } from 'ionic-angular';
import { EditTransactionPage } from '../../pages';
import { TransactionProvider } from '../../providers';
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
export class TransactionPopoverPage {

  transaction;

  constructor(public viewCtrl: ViewController, public appCtrl: App, public navParams: NavParams, public alertCtrl: AlertController, public transactionService: TransactionProvider) {
    this.transaction = this.navParams.get('transaction'); 
  }

  edit() {
    this.viewCtrl.dismiss();
    const transaction = this.transaction;
    this.appCtrl.getRootNav().push(EditTransactionPage, { transaction });
  }

  delete() {
    this.viewCtrl.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      subTitle: 'Are you sure you want to delete this transaction?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'Delete',
        handler: () => {
          this.transactionService.deleteTransaction(this.transaction.id);
          this.appCtrl.getRootNav().pop();
        }
      }]
    });
    alert.present();
  }

}
