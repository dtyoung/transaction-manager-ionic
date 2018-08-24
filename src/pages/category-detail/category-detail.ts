import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Category } from '../../types/types';
import { EditDeletePopoverPage, EditCategoryPage } from '../../pages';
import { CategoryProvider } from '../../providers';
/**
 * Generated class for the CategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

  category: Category = {
    key: '',
    name: '',
    icon: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    public categoryService: CategoryProvider) {
  }

  ionViewWillEnter() {
    this.category = this.navParams.get('category');
  }

  presentPopover(ev) {
    const category = this.category;
    let popover = this.popoverCtrl.create(EditDeletePopoverPage, {
      data: category,
      editPage: EditCategoryPage,
      deleteHandler: this.categoryService.deleteCategory,
      deleteSubtitle: "Are you sure you want to delete this category? This could affect any transaction with this category."
    });
    
    popover.present({ ev: ev });
  }
}
