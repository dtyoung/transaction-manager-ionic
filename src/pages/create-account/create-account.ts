import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  account: { email: string, password: string, confirmPassword: string } = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  registerAccount() {
    firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password)
      .then(() => {
        // Pop up an alert saying the account was created and return the user back to login screen
      })
      .catch((error) => {
        // Inform the user that the email is taken
      });
  }

}
