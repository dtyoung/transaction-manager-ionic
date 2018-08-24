import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../types/types';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  private categories: Category[];
  private categoriesObservable: Observable<Category[]>;
  private categoriesObserver;

  constructor(public http: Http) {
    this.categoriesObservable = Observable.create(observer => {
      this.categoriesObserver = observer;
      this.loadCategories();
    })
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesObservable;
  }

  private loadCategories() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/categories`).on('value', snapshot => {
      const tempCategories = [];
      snapshot.forEach(childSnapshot => {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        const category: Category = {
          key: key,
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

  getIconFromCategoryName(categoryName: String) {
    const category = this.categories.find((element) => {
      return element.name === categoryName;
    });

    return category && category.icon ? category.icon : 'md-help';
  }

  addCategory(name: String, icon: String) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    database.ref(`/users/${currentUser.uid}/categories`).push({
      name, icon
    });
  }

  getCategoryFromId(id: String): Category {
    if(!this.categories || !id) {
      return undefined;
    }

    const found = this.categories.find((element) => {
      return id === element.key;
    })

    return found;
  }

  getIconFromCategoryId(id: String): String {

    if(!this.categories || !id) {
      return this.getDefaultCategoryIcon();
    }

    const found = this.categories.find((element) => {
      return id === element.key;
    })

    if(found) {return found.icon}
    
    return this.getDefaultCategoryIcon();

  }

  getNameFromCategoryId(id: String): String {
    if(!this.categories || !id) {
      return this.getDefaultCategoryName();
    }

    const found = this.categories.find((element) => {
      return id === element.key;
    })

    if(found) { return found.name };

    return this.getDefaultCategoryName();
  }

  updateCategory(category: Category) {
    var update = {};
    const { currentUser } = firebase.auth();
    const categoryUpdate = {
      name: category.name,
      icon: category.icon
    };

    update[`/users/${currentUser.uid}/transactions/`+ category.key] = categoryUpdate;
    return firebase.database().ref().update(update);
  }

  deleteCategory(category: Category) {
    var update = {};
    const { currentUser } = firebase.auth();
    update[`/users/${currentUser.uid}/categories/`+ category.key] = null;
  
    return firebase.database().ref().update(update)
  }
}