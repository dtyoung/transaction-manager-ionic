import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  categories: Object;

  constructor(public http: Http) {
    console.log('category initialized');
  }

  loadCategories(): any {

    if (this.categories) {
      return new Promise((resolve, reject) => {
        resolve(this.categories);
      });
    } else {
      return new Promise((resolve, reject) => {
        firebase.database().ref('user/categories').once('value')
          .then(snapshot => {
            this.categories = snapshot.val()
            resolve(this.categories);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }

  private async readCategories() {
    const snapshot = await firebase.database().ref('user/categories').once('value');
    console.log('2', snapshot.val())
    return snapshot.val();
  }

  getDefaultCategoryName(): String {
    return "No Category";
  }

  getDefaultCategoryIcon(): String {
    return "md-help";
  }

  loadIcons(): any {
    return this.http.get('assets/data/icons.json')
      .map(res => res.json());
  }

  addCategory(name: String, icon: String) {
    const database = firebase.database();
    database.ref('/user/categories').push({
      name, icon
    });
  }
}