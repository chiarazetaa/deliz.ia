import { Component, OnInit } from '@angular/core';
import { Item } from '../../utilities/models/item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ItemsService } from '../../utilities/services/items.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.scss'
})
export class ItemEditComponent implements OnInit {
  id: number = 0;
  editMode = false;

  item: Item = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    picture: '',
    notes: ['']
  };
  itemId = 0;
  itemName = '';
  itemDescription = '';
  itemPrice = 0;
  itemPicture = '';
  itemNotes = [''];

  constructor(
    private route: ActivatedRoute, 
    private itemService: ItemsService, 
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
      const itemFound = this.itemService.getItemById(this.id);
      if (itemFound) this.item = itemFound;
      this.itemName = this.item.name;
      this.itemDescription = this.item.description;
      this.itemPrice = this.item.price;
      this.itemPicture = this.item.picture;
      this.itemNotes = this.item.notes;
    }
  }

  onSaveItem() {
    this.itemService.saveItem(this.item.id, { id: this.item.id, name: this.itemName, description: this.itemDescription, price: this.itemPrice, picture: this.itemPicture, notes: this.itemNotes });
    this.router.navigate(['/items']);
  }

  onAddItem() {
    this.itemId = this.itemService.generateId();
    this.itemService.addItem({ id: this.itemId, name: this.itemName, description: this.itemDescription, price: this.itemPrice, picture: this.itemPicture, notes: this.itemNotes });
    this.router.navigate(['/items']);
  }

  disabledButton() {
    if (!this.itemName || !this.itemDescription || !this.itemPrice) {
      return true;
    }
    return false;
  }
}
