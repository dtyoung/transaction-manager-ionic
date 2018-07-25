import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

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

  categories: string[];
  database: firebase.database.Database
  test: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryProvider) {
    // this.database = firebase.database();
    this.test = this.categoryService.load();
    console.log(this.test);
    // this.test = firebase.database().ref('/defaultCategories').once('value')
    //   .then((snapshot) => {console.log(snapshot.val())})
    //   .catch((error) => console.log(error))
    // this.categories = [
    //   'Rent',
    //   'Groceries',
    //   'Power',
    //   'Wifi'
    // ]
  
  }

  

}
