import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectIconPage } from '../'
import { CategoryProvider } from '../../providers';
import { Category } from '../../types/types';
/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
/**
 * Takes the following navParams:
 * data - The category that is going to be edit
 */
export class EditCategoryPage {

  category: Category = {
    name: '',
    icon: '',
    key: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryProvider
  ) {}

  ionViewDidLoad() {
    this.category = this.navParams.get('data');
  }

  ionViewWillEnter() {
    this.category.icon = this.navParams.get('icon') ? this.navParams.get('icon') : this.category.icon;
  }

  selectCategoryIcon() {
    this.navCtrl.push(SelectIconPage);
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category);
    this.navCtrl.pop();
  }

}
