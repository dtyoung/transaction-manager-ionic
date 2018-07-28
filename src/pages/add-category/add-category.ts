import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectIconPage } from '../../pages'
import { CategoryProvider } from '../../providers';
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
  icon: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryProvider) {
  }

  ionViewWillEnter() {
    this.icon = this.navParams.get('icon') ? this.navParams.get('icon') : this.categoryService.getDefaultIcon();
  }

  selectCategoryIcon() {
    this.navCtrl.push(SelectIconPage);
  }

  addCategory() {
    console.log('Clicked addCategory()');
    console.log('Name:', this.name)
    this.categoryService.addCategory(this.name, this.icon)
  }

}
