import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import firebase from 'firebase';

import { ConfirmPasswordValidator } from '../../validators/confirmPassword'
import { PasswordValidator } from '../../validators/password';
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

  createAccountForm: FormGroup;

  account: { email: string, password: string, confirmPassword: string } = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private alertCtrl: AlertController) {
    
    this.createAccountForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([PasswordValidator.isValid, Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required, ConfirmPasswordValidator.isValid])]
    });
    
  }

  registerAccount() {
    if(this.createAccountForm.valid) {
      firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password)
        .then(() => {
          this.createAccountForm.reset();
          this.presentAlert();
        })
        .catch((error) => {
          // Inform the user that the email is taken
          console.log(error);
        });
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Account has been created.',
      subTitle: 'Please go back to the login screen to sign in',
      buttons: [{
        text: 'Back to login screen',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();

  }
}