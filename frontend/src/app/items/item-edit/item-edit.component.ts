import { Component, OnInit } from '@angular/core';
import { Item } from '../../utilities/models/item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../utilities/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.scss'
})
export class ItemEditComponent implements OnInit {
  _id: string = '';
  editMode = false;

  itemId = '';
  itemName = '';
  itemDescription = '';
  itemPrice = 0;
  itemPicture = '';
  itemNotes = [''];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = params['id'];
      this.editMode = (params['id']) ? true : false;
    });

    if (this.editMode) {
      this.apiService.getItemById(this._id).subscribe({
        next: (data) => {
          this.itemName = data.item.name;
          this.itemDescription = data.item.description;
          this.itemPrice = data.item.price;
          this.itemPicture = data.item.picture;
          this.itemNotes = data.item.notes;
        },
        error: (error) => {
          console.error('Error fetching the item:', error);
        }
      });
    }
  }

  onUpdateItem() {
    this.apiService.updateItem(this._id, { _id: this._id, name: this.itemName, description: this.itemDescription, price: this.itemPrice, picture: this.itemPicture, notes: this.itemNotes }).subscribe({
      next: () => {
        this.router.navigate(['/items']);
      },
      error: (error) => {
        console.error('Error updating the item:', error);
      }
    });
  }

  onAddItem() {
    this.apiService.addItem({ _id: this.itemId, name: this.itemName, description: this.itemDescription, price: this.itemPrice, picture: this.itemPicture, notes: this.itemNotes }).subscribe({
      next: () => {
        this.router.navigate(['/items']);
      },
      error: (error) => {
        console.error('Error creating the item:', error);
      }
    });
  }

  disabledButton() {
    if (!this.itemName || !this.itemDescription || !this.itemPrice) {
      return true;
    }
    return false;
  }
}
