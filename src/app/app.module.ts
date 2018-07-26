import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';
import { SelectCategoryPage } from '../pages/select-category/select-category';
import { CategoryProvider } from '../providers/category/category';
import { TransactionProvider } from '../providers/transaction/transaction';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreateAccountPage,
    AddTransactionPage,
    SelectCategoryPage
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
    SelectCategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    TransactionProvider,
  ]
})
export class AppModule {}
