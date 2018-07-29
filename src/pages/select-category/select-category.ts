import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoryProvider } from '../../providers/category/category';
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
    this.categoryService.loadCategories().then((data) => {
      for(const category of Object.keys(data)) {
        this.categories.push(data[category]);
      }
    }).catch(error => console.log(error));
  }

  selectCategory(category: Object[]) {
    this.navCtrl.getPrevious().data.category = category;
    this.navCtrl.pop();
  }
}