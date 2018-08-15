import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionPopoverPage } from './transaction-popover';

@NgModule({
  declarations: [
    TransactionPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionPopoverPage),
  ],
})
export class TransactionPopoverPageModule {}
