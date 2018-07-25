import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

  load(): any {
    if(this.categories) {
      return Observable.of(this.categories);
    } else {
      return this.http.get('assests/data/categories.json')
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      }
    }
  }

  processCategories(categories: any) {
    this.categories = categories.json;
  }

}
