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

  private categories: Object[];
  private categoriesObservable: Observable<Object[]>;
  private categoriesObserver;

  constructor(public http: Http) {
    this.categoriesObservable = Observable.create(observer => {
      this.categoriesObserver = observer;
      this.loadCategories();
    })
  }

  getCategories(): Observable<Object[]> {

    return this.categoriesObservable;
  }
    
  // loadCategories(): any {

  //   if (this.categories) {
  //     return new Promise((resolve, reject) => {
  //       resolve(this.categories);
  //     });
  //   } else {
  //     return new Promise((resolve, reject) => {
  //       firebase.database().ref('user/categories').once('value')
  //         .then(snapshot => {
  //           this.categories = snapshot.val()
  //           resolve(this.categories);
  //         })
  //         .catch(error => {
  //           reject(error);
  //         });
  //     });
  //   }
  // }

  private loadCategories() {
    firebase.database().ref('/user/categories').on('value', snapshot => {
      console.log(snapshot);
      const tempCategories = [];
      snapshot.forEach(childSnapshot => {
        console.log(childSnapshot.val())
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        const category = { 
          icon: childData.icon,
          name: childData.name
        }
        tempCategories.push(category);
      })

      this.categories = tempCategories;
      this.categoriesObserver.next(this.categories);
    });
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