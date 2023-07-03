import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item/item.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
  searchTerm: string = '';

  sortValues: string[] = ['name_item', 'unit', 'description', 'volume']
  direction = 'asc';
  items: any;
  filteredItems:any;
  billedItems:[];

  constructor(public itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe(data => {
      this.items = data.rows;
    });
  }

  onSearch() {
    // Perform the filtering in real-time
    this.filteredItems = this.searchTerm
      ? this.items.filter(item => {
          // Customize the condition based on your search requirements
          return (
            item.name_item.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.price.toString().includes(this.searchTerm) ||
            item.unit.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.volume.toString().includes(this.searchTerm)
          );
        })
      : this.items;
      console.log(this.filteredItems);
  }
  
  // Method to clear the search term
  clearSearch() {
    this.searchTerm = '';
    this.filteredItems = [];
  }

}
