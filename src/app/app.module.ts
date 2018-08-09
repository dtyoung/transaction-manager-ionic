import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import {
  CategoryProvider,
  TransactionProvider
} from '../providers';

import {
  AddCategoryPage,
  AddTransactionPage,
  CreateAccountPage,
  LoginPage,
  SelectCategoryPage,
  SelectIconPage,
  ViewTransactionsPage,
  TransactionDetailPage,
  AnalyticsPage
} from '../pages';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreateAccountPage,
    AddTransactionPage,
    SelectCategoryPage,
    AddCategoryPage,
    SelectIconPage,
    ViewTransactionsPage,
    TransactionDetailPage,
    AnalyticsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CreateAccountPage,
    AddTransactionPage,
    SelectCategoryPage,
    AddCategoryPage,
    SelectIconPage,
    ViewTransactionsPage,
    TransactionDetailPage,
    AnalyticsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoryProvider,
    TransactionProvider,
  ]
})
export class AppModule { }
