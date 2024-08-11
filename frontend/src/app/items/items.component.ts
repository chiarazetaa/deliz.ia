import { Component, OnInit } from '@angular/core';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
