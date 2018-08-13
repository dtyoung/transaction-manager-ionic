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

  loggingIn: Boolean;
  error: Boolean;
  errorMessage: String;

  account: { email: string, password: string } = {
    email: 'test@test.com',
    password: 'password' 
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loggingIn = false;
  }

  doLogin() {
    this.loggingIn = true;
    this.error = false;
    this.errorMessage = '';
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then(() => {
        this.navCtrl.setRoot(ViewTransactionsPage);
        this.loggingIn = false;
      }).catch((error) => {
        this.loggingIn = false;
        this.error = true;
        if(this.account.email === '' || this.account.password === '') {
          this.errorMessage = 'Please enter an email and password'
        } else {
          this.errorMessage = 'Incorrect email or password'
        }
      });
  }

  goToCreateAccountPage() {
    this.navCtrl.push(CreateAccountPage);
  }
}
