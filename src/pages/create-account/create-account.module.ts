import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAccountPage } from './create-account';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAccountPage),
    FormsModule
  ],
})
export class CreateAccountPageModule {}
