import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TransactionProvider, CategoryProvider } from '../../providers';
import { Transaction } from '../../types/types';

var moment = require('moment');
var group = require('group-reduce');
/**
 * Generated class for the AnalyticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
})
export class AnalyticsPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  startDate: String;
  endDate: String;
  pieChart;

  transactions: Transaction[][]
  transactionsByCategory: Transaction[][] = [];
  totalsByCategoryGraph = [];
  totalsByCategory: { category: string, total: Number, icon: String }[] = [];
  categories;
  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionProvider, public categoryService: CategoryProvider) { 
    this.endDate = moment().format('YYYY-MM-DD');
    this.startDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
  }

  ionViewDidLoad() {
    this.transactionService.transactionUpdatesByDate().subscribe(data => this.transactions = data);

    this.setTransactionData();

    const labels = this.totalsByCategoryGraph.map((transaction) => transaction.category);
    const data = this.totalsByCategoryGraph.map((transaction) => transaction.total);
    this.pieChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: data,
              backgroundColor: [
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(153, 102, 255)',
                  'rgb(255, 159, 64)'
              ]
          }]
      }

  });
  }

  updateChart() {
    this.setTransactionData();

    const labels = this.totalsByCategoryGraph.map((transaction) => transaction.category);
    const data = this.totalsByCategoryGraph.map((transaction) => transaction.total);
    
    this.pieChart.data.datasets[0].data = data;
    this.pieChart.data.labels = labels;

    this.pieChart.update();
  }

  setTransactionData() {
    this.totalsByCategory = this.getTotalByCategory(this.startDate, this.endDate);
    // Show 'Other Categories in graph'
    if(this.totalsByCategory.length > 4) {
      const extraCategories = this.totalsByCategory.slice(4);
      const totalOfExtraCategories = Math.round(extraCategories.map(this.getTotal).reduce(this.sumTotal) * 100) / 100;
      this.totalsByCategoryGraph = this.totalsByCategory.slice(0, 4)
      
      this.totalsByCategoryGraph.push({ category: 'Other Categories', total: totalOfExtraCategories, icon: '' })
    } else {
      this.totalsByCategoryGraph = this.totalsByCategory; 
    }
  }

  getTotalByCategory(startDate: String, endDate: String) {
    // Get all the transactions between the start and end dates
    const momentStartDate = moment(startDate, "YYYY-MM-DD");
    const momentEndDate = moment(endDate, "YYYY-MM-DD");
    this.transactionsByCategory = this.transactions.filter(transactionBucket => {
      const momentCurrentDate = moment(transactionBucket[0].date, "YYYY-MM-DD");

      return momentCurrentDate.isSameOrAfter(momentStartDate) && momentCurrentDate.isSameOrBefore(momentEndDate);

    });


    // Create an array mapping from the category to total amount spent
    const flatTransactions = ([].concat.apply([], this.transactionsByCategory))
    const totalsByCategory = group(flatTransactions).by('categoryId')
    .reduce((category, entries) => {
      return {
        category: this.categoryService.getNameFromCategoryId(category),
        total: entries.map(this.getValue).reduce(this.sumTotal),
        icon: this.categoryService.getIconFromCategoryId(category)
      }
    })

    totalsByCategory.sort( (a, b) => {return b.total - a.total});

  (totalsByCategory)
    return totalsByCategory;
  }

  // Reduce and Map helpers
  private getValue(entry) {
    return +entry.value;
  }

  private getTotal(entry) {
    return +entry.total;
  }

  private sumTotal(a, b) {
    return a + b;
  }

}