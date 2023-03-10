import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ItemService]
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
