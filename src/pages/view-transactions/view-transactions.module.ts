import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTransactionsPage } from './view-transactions';

@NgModule({
  declarations: [
    ViewTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTransactionsPage),
  ],
})
export class ViewTransactionsPageModule {}
