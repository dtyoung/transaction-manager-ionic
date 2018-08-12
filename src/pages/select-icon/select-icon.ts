import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';

/**
 * Generated class for the SelectIconPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-icon',
  templateUrl: 'select-icon.html',
})
export class SelectIconPage {

  icons: String[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryProvider) {
    this.categoryService.loadIcons().subscribe(data => {
      for(const icon of Object.keys(data)) {
        this.icons.push(data[icon]);
      }
    });  
  }

  selectIcon(icon: String){
    this.navCtrl.getPrevious().data.icon = icon;
    this.navCtrl.pop();
  }

}
