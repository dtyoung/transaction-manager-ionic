import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    return this.http.get('assets/data/categories.json')
    .map(res => res.json());    
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

  addCategory(category: { name: String, icon: String }) {
    this.http.post('assets/data/categories.json', category)
    .subscribe(data => console.log(data));
  }
}