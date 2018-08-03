import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import { CreateAccountPage } from '../create-account/create-account';
import { AddTransactionPage } from '../add-transaction/add-transaction';
import { ViewTransactionsPage } from '../view-transactions/view-transactions';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  account: { email: string, password: string } = {
    email: 'test@test.com',
    password: 'password'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  doLogin() {
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then(() => {
        this.navCtrl.push(AddTransactionPage);
      }).catch((error) => {
        console.log("Not working" + error);
      });
  }

  goToCreateAccountPage() {
    this.navCtrl.push(CreateAccountPage);
  }
}
