import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../../_models/item.model';
import { ItemService } from '../../_services/item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  id: number;
  editMode = false;

  item: Item;
  itemName = '';
  itemDescription = '';
  itemPrice = null;
  itemPicture = '';
  itemNotes = [];

  constructor(
    private route: ActivatedRoute, 
    private itemService: ItemService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = (params['id']) ? true : false;
      }
    )

    if (this.editMode) {
      this.item = this.itemService.getItemById(this.id);
      this.itemName = this.item.name;
      this.itemDescription = this.item.description;
      this.itemPrice = this.item.price;
      this.itemPicture = this.item.picture;
      this.itemNotes = this.item.notes;
    }
  }

  onSaveItem() {
    this.itemService.saveItem(this.item.id, { id: this.item.id, name: this.itemName, description: this.itemDescription, price: this.itemPrice, picture: this.itemPicture, notes: this.itemNotes });
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddItem() {
    this.itemService.addItem({ id: null, name: this.itemName, description: this.itemDescription, price: this.itemPrice, picture: this.itemPicture, notes: this.itemNotes });
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  disabledButton() {
    if (!this.itemName || !this.itemDescription || !this.itemPrice) {
      return true;
    }
    return false;
  }

}
