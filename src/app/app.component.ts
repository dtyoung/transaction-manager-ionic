import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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
import { AnalyticsPage } from '../pages/analytics/analytics';
import { TransactionProvider } from '../providers/transaction/transaction';
import { CategoryProvider } from '../providers';

@Component({
  templateUrl: 'app.html',
  providers: [TransactionProvider, CategoryProvider]
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  
  rootPage: any = LoginPage;
  pages: Array<{title: String, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, transactionService: TransactionProvider, categoryService: CategoryProvider) {
    platform.ready().then(() => {
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

    this.pages = [
      { title: 'Transactions', component: ViewTransactionsPage },
      { title: 'Categories', component: SelectCategoryPage },
      { title: 'Analytics', component: AnalyticsPage }
    
    ]
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }


}

