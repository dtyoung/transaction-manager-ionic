import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectIconPage } from '../../pages'
/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {

  name: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
  }

  selectCategoryIcon() {
    this.navCtrl.push(SelectIconPage, { "parentPage": this });
  }

  addCategory() {
    console.log('Clicked addCategory()');
    console.log('Name:', this.name)
  }

}
