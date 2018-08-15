import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import firebase from 'firebase';

import { CreateAccountPage } from '../create-account/create-account';
import { AddTransactionPage } from '../add-transaction/add-transaction';
import { ViewTransactionsPage } from '../view-transactions/view-transactions';

import { CategoryProvider, TransactionProvider } from '../../providers';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public categoryService: CategoryProvider, public transactionService: TransactionProvider) {
    this.loggingIn = false;    
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  doLogin() {
    this.loggingIn = true;
    this.error = false;
    this.errorMessage = '';
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then(() => {
        // Initialize the providers by subscribing to them
        this.transactionService.transactionUpdatesByDate().subscribe();
        this.categoryService.getCategories().subscribe();
        
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
