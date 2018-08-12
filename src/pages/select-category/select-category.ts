import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoryProvider } from '../../providers/category/category';
import { AddCategoryPage } from '../../pages/add-category/add-category';

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

  categories: Object[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryProvider) { 
  }

  ionViewDidLoad() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    })
  }

  selectCategory(category: Object[]) {
    this.navCtrl.getPrevious().data.category = category;
    this.navCtrl.pop();
  }

  addNewCategory() {
    this.navCtrl.push(AddCategoryPage);
  }
}