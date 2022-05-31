import { Component, OnInit } from '@angular/core';
import { WarehouseLoad } from '../models/warehouseLoad';
import { PopularItemsRequestDto } from '../models/popularItemRequest';
import { DashboardService } from './service/dashboard.service';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { EndingItems } from '../models/endingItems';
import { PopularItems } from '../models/popularItems';
import { WarehousePremiumList } from '../models/warehousePremiumList';
import { Page } from '../models/page';
import { DatePipe } from '@angular/common';


interface State {
  page: number;
  pageSize: number;
  collectionSize: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, NgbProgressbarConfig]
})
export class DashboardComponent implements OnInit {
  today: any = new Date();
  monthBeforeToday: any = new Date();

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.monthBeforeToday = this.monthBeforeToday.setMonth(this.monthBeforeToday.getMonth() - 1);
    this.monthBeforeToday = this.datePipe.transform(this.monthBeforeToday, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getRevenueCurrentMonth();

  }

  getRevenueCurrentMonth() {
    this.dashboardService.getRevenueCurrentMonth(this.today, this.monthBeforeToday)
      .subscribe(data => {
        console.log(data);
      });
  }
}
