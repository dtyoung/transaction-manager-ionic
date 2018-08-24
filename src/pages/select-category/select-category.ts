import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoryProvider } from '../../providers/category/category';
import { AddCategoryPage, CategoryDetailPage } from '../';
import { Category } from '../../types/types';
/**
 * Generated class for the SelectCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategoryPage {

  canSelect: Boolean = false;
  categories: Category[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryProvider) { 
  }

  ionViewDidLoad() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    })
    this.canSelect = this.navParams.get('canSelect');
  }

  selectCategory(category: Category) {
    if(this.canSelect) {
    this.navCtrl.getPrevious().data.category = category;
    this.navCtrl.pop({});
    } else {
      this.navCtrl.push(CategoryDetailPage, { category })
    }
  }

  addNewCategory() {
    this.navCtrl.push(AddCategoryPage);
  }
}