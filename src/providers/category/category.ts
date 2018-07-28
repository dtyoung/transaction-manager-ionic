import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  categories: any;

  constructor(public http: Http) {
    
  }

  loadCategories(): any {
    // return this.http.get('assets/data/categories.json')
    // .map(res => res.json());
    const database = firebase.database();
    return database.ref('user/categories').once('value')

    if(this.categories) {
      return this.categories;
    } else {
      const database = firebase.database();
      return database.ref('user/categories').once('value')
    }
  }

  getDefaultCategoryName(): String {
    return "No Category";
  }

  getDefaultIcon(): String {
    return "md-help";
  }

  loadIcons(): any {
    return this.http.get('assets/data/icons.json')
    .map(res => res.json());
  }

  addCategory(name: String, icon: String){
    const database = firebase.database();
    database.ref('/user/categories').push({
      name, icon
    });
  }
}