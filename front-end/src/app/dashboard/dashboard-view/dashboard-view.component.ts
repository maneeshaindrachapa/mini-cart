import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today = new Date();
  today_ = "";
  monthBeforeToday = new Date(new Date().setMonth(new Date().getMonth() - 1));
  monthBeforeToday_ = "";
  month2BeforeToday = new Date(new Date().setMonth(new Date().getMonth() - 2));
  month2BeforeToday_ = "";
  revenue = 0;
  revenue2 = 0;
  transaction = 0;
  transaction2 = 0;
  totalRevenue = 0;
  revenueChart: any;
  month = new Date().getMonth();

  totalUser = 0;
  monthlyUsers = 0;


  searchTerm: string = '';

  sortValues: string[] = ['invoice_id', 'name_item', 'quantity','timestamp', 'price'];
  page = 0;
  size = 15;
  sortValue: string = this.sortValues[0];
  direction = 'asc';
  totalTransactions :any;
  ft:any;
  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public rbarChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(28, 182, 235,0.8)',
      borderColor: 'rgba(28, 182, 235,0.8)',
      pointBackgroundColor: 'rgba(28, 182, 235,0.8)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(28, 182, 235,0.8)'
    },
    {
      backgroundColor: 'rgba(10, 39, 122,0.2)',
      borderColor: 'rgba(10, 39, 122,0.2)',
      pointBackgroundColor: 'rgba(10, 39, 122,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(10, 39, 122,0.2)'
    }];
  public rbarChartLabels = [this.monthNames[this.month - 1], this.monthNames[this.month]];
  public rbarChartType = 'bar';
  public rbarChartLegend = true;
  public rbarChartData: any = [];
  public tbarChartData: any = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public revenueChartLabels = ['Total Revenue', 'Monthly Revenue'];
  public revenueChartData = [];
  public revenueChartType = 'pie';

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
    this.today_ = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.monthBeforeToday_ = this.datePipe.transform(this.monthBeforeToday, 'yyyy-MM-dd');
    this.month2BeforeToday_ = this.datePipe.transform(this.month2BeforeToday, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getRevenueCurrentMonth();
    this.getTotalRevenue();
    this.getUsersCurrentMonth();
    this.getTotalUsers();
    this.getRevenuePreviousMonth();
    this.sort();
  }

  ngAfterViewInit(): void {

  }

  getRevenueCurrentMonth() {
    this.dashboardService.getRevenueCurrentMonth(this.today_, this.monthBeforeToday_)
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.transaction += 1;
          this.revenue += data[i].price * data[i].quantity;
        }
      });
  }

  getRevenuePreviousMonth() {
    this.dashboardService.getRevenueCurrentMonth(this.monthBeforeToday_, this.month2BeforeToday_)
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.transaction2 += 1;
          this.revenue2 += data[i].price * data[i].quantity;
        }
        this.generateRevenue2Chart();
        this.generateTransactionChart();
      });
  }

  getTotalRevenue() {
    this.dashboardService.getTotalRevenue()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.totalRevenue += data[i].total_price;
        }
        this.generateRevenueChart();
      });
  }

  generateRevenueChart() {
    this.revenueChartData = [this.totalRevenue, this.revenue];
  }

  generateRevenue2Chart() {
    this.rbarChartData = [{ data: [this.revenue2, this.revenue], label: 'Monthly Revenue' }];
  }

  generateTransactionChart() {
    this.tbarChartData = [{ data: [this.transaction2, this.transaction], label: 'Monthly Transactions' }];
  }

  getUsersCurrentMonth() {
    this.dashboardService.getUsersCurrentMonth(this.today_, this.monthBeforeToday_)
      .subscribe(data => {
        this.monthlyUsers = data[0].monthly_users;
      });
  }

  getTotalUsers() {
    this.dashboardService.getTotalUsers()
      .subscribe(data => {
        this.totalUser = data[0].total_users;
      });
  }

  onSort(sort: { value: string, direction: string }) {
    this.sortValue = sort.value;
    this.direction = sort.direction;
    this.sort();
  }

  onPaginate() { this.sort(); }

  sort() {
    this.dashboardService.getTotalTransactions(this.page, this.size, this.sortValue, this.direction).subscribe(data => {
      this.totalTransactions = data.rows;
      this.ft = this.totalTransactions;
      console.log(this.ft);
    });
  }

  onSearch() {
    // Perform the filtering in real-time
    this.ft = this.searchTerm
      ? this.totalTransactions.filter(item_ => {
        return (
          item_.invoice_id.toString().includes(this.searchTerm) ||
          ((item_.name_item.toLowerCase()).toString()).includes(this.searchTerm.toLowerCase())
        );
      })
      : this.totalTransactions;
  }

  // Method to clear the search term
  clearSearch() {
    this.searchTerm = '';
  }
}
