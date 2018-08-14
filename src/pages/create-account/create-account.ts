import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import firebase from 'firebase';

import { ConfirmPasswordValidator, PasswordValidator } from '../../validators';
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
  errorMessage: String = '';
  error: Boolean = false;
  loading:Boolean = false;

  account: { email: string, password: string, confirmPassword: string } = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private alertCtrl: AlertController, public menu: MenuController) {
    this.createAccountForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([PasswordValidator.isValid, Validators.required])],
      confirmPassword: ['', Validators.compose([ConfirmPasswordValidator.isValid, Validators.required])]
    });
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  validateInformation() {
    this.error = false;
    this.errorMessage = '';
    if(this.account.email === '' || this.account.password === '') {
      this.error = true;
      this.errorMessage = 'Please enter an email and password';
    } else if (this.createAccountForm.controls.email.errors) {
      this.error = true;
      this.errorMessage = 'Please enter a valid email';
    } else if (
      this.createAccountForm.controls.password.errors && 
      this.createAccountForm.controls.password.errors.notLongEnough &&
      this.createAccountForm.controls.password.dirty) {
        this.error = true;
        this.errorMessage = 'Password not long enough';
    } else if (this.account.confirmPassword === '') {
      this.error = true;
      this.errorMessage = 'Please confirm your password';
    } else if(this.createAccountForm.controls.confirmPassword.errors && this.createAccountForm.controls.confirmPassword.errors.passwordsDontMatch && this.createAccountForm.controls.confirmPassword.dirty) {
      this.error = true;
      this.errorMessage = "Passwords do not match";
    } else if (this.createAccountForm.valid){
      this.loading = true;
      firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password)
        .then(() => {
          this.loading = false;
          this.createAccountForm.reset();
          this.presentAlert();
        })
        .catch((error) => {
          // Inform the user that the email is taken
          this.loading = false;
          this.error = true;
          this.errorMessage = 'This email is already in use.'
          this.account.password = '';
          this.account.confirmPassword = '';
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