import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../../models/item.model';
import { Page } from '../../models/page';
import { SavedItem } from '../../models/savedItem.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  role = '';
  sortValues: string[] = ['name_item', 'unit', 'description', 'volume'];
  page = 0;
  size = 15;
  sortValue: string = this.sortValues[0];
  direction = 'asc';
  items: any;
  savedItems: SavedItem[];

  cart = [];
  iCart = [];

  constructor(public itemService: ItemService, private router: Router, private route: ActivatedRoute) {
    this.role = sessionStorage.getItem("role");
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    this.iCart = JSON.parse(sessionStorage.getItem('icart'));
    if (this.cart == null) {
      this.cart = []
    }
    if (this.iCart == null) {
      this.iCart = []
    }
  }

  ngOnInit() {
    this.itemService.findSortedAndPaginatedItems(this.page, this.size, this.sortValue, this.direction).subscribe(data => {
      this.items = data.rows;
      console.log(data.rows);
    });

  }
  sort() {
    this.itemService.findSortedAndPaginatedItems(this.page - 1, this.size, this.sortValue, this.direction).subscribe(data => {
      this.items = data;
    });
  }

  addToCart(item) {
    this.cart.push(item);
    this.iCart.push(item.id);
    sessionStorage.setItem("icart", JSON.stringify(this.iCart));
    sessionStorage.setItem("cart", JSON.stringify(this.cart));
  }
}
