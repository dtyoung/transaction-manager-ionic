import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TransactionProvider, CategoryProvider } from '../../providers';

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

  transactions: any
  transactionsByCategory;
  totalsByCategory;
  categories;
  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionProvider, public categoryService: CategoryProvider) { 
    this.endDate = moment().format('YYYY-MM-DD');
    this.startDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
  }

  ionViewDidLoad() {
    this.transactionService.transactionUpdatesByDate().subscribe(data => this.transactions = data);

    

    this.totalsByCategory = this.getTotalByCategory(this.startDate, this.endDate);
    const labels = this.totalsByCategory.map((transaction) => transaction.category);
    const data = this.totalsByCategory.map((transaction) => transaction.total);
    this.pieChart = new Chart(this.doughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: data,
              backgroundColor: [
                  'rgb(255, 99, 132)',
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
    this.totalsByCategory = this.getTotalByCategory(this.startDate, this.endDate);
    const labels = this.totalsByCategory.map((transaction) => transaction.category);
    const data = this.totalsByCategory.map((transaction) => transaction.total);
    
    this.pieChart.data.datasets[0].data = data;
    this.pieChart.data.labels = labels;

    this.pieChart.update();
  }

  getTotalByCategory(startDate: String, endDate: String) {
    // Get all the transactions between the start and end dates
    const momentStartDate = moment(startDate, "YYYY-MM-DD");
    const momentEndDate = moment(endDate, "YYYY-MM-DD");
    this.transactionsByCategory = this.transactions.filter(transactionBucket => {
      const momentCurrentDate = moment(transactionBucket[0].key.date, "YYYY-MM-DD");

      return momentCurrentDate.isSameOrAfter(momentStartDate) && momentCurrentDate.isSameOrBefore(momentEndDate);

    });


    // Create an array mapping the category to total amount spent
    const flatTransactions = ([].concat.apply([], this.transactionsByCategory)).map(transaction => transaction.key)

    const totalsByCategory = group(flatTransactions).by('category')
    .reduce((category, entries) => {
      return {
        category: category,
        total: entries.map(this.getValue).reduce(this.sumTotal),
        icon: this.categoryService.getIconFromCategoryName(category)
      }
    })

    return totalsByCategory;
  }

  private getValue(entry) {
    return +entry.value;
  }

  private sumTotal(a, b) {
    return a + b;
  }

}