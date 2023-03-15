import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  id: number;
  editMode = false;

  item: Item;
  itemPicture = '';
  itemName = '';
  itemDescription = '';
  itemPrice = 1;
  itemNotes = [];

  constructor(private route: ActivatedRoute, private itemService: ItemService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = (params['id']) ? true : false;
      }
    )

    if (this.editMode) {
      this.item = this.itemService.getItem(this.id);
      this.itemPicture = this.item.picture;
      this.itemName = this.item.name;
      this.itemDescription = this.item.description;
      this.itemPrice = this.item.price;
      this.itemNotes = this.item.notes;
    }
  }

  onSaveItem() {

  }

}
