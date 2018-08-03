import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { ENV } from '@app/env';

import { LoginPage } from '../pages/login/login';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';
import { SelectCategoryPage } from '../pages/select-category/select-category';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { SelectIconPage } from '../pages/select-icon/select-icon';
import { ViewTransactionsPage } from '../pages/view-transactions/view-transactions';

import { TransactionProvider } from '../providers/transaction/transaction';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    const config = {
      apiKey: ENV.FIREBASE_API_KEY,
      authDomain: ENV.FIREBASE_AUTH_DOMAIN,
      databaseURL: ENV.FIREBASE_DATABASE_URL,
      projectId: ENV.FIREBASE_PROJECT_ID,
      storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID
    };

    firebase.initializeApp(config);
  }

}

