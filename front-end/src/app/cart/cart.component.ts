import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = [];
  constructor() {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    if (this.cart == null) {
      this.cart = []
    }
    
  }

  ngOnInit(): void {
  }

}
