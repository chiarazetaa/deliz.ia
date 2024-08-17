import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../utilities/models/item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../utilities/services/api.service';
import { Subscription } from 'rxjs';
import { Cart } from '../../utilities/models/cart.model';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  item?: Item;
  _id: string = '';
  cart: Cart = { _id: '', list: [] };
  private cartSubscription: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute, 
    private router: Router, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = params['id'];
      this.apiService.getItemById(params['id']).subscribe({
        next: (data) => {
          this.item = data.item;
        },
        error: (error) => {
          console.error('Error fetching the item:', error);
        }
      });
    });
    // subscribe to the cartChanged Subject to get notified of changes
    this.cartSubscription = this.apiService.cartChanged.subscribe((cart) => {
      this.cart = cart;
    });
  }

  onEditItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRemoveItem() {
    this.apiService.removeItem(this._id).subscribe({
      next: () => {
        this.router.navigate(['/items']);
      },
      error: (error) => {
        console.error('Error deleting the item:', error);
      }
    });
  }

  // delete item modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Elimina') {
        this.onRemoveItem();
      } 
    });
  }

  onAddItemToCart() {
    if (this.item && this.cart) {
      this.apiService.addItemToCart(this.cart, this.item._id).subscribe({
        next: () => {
          console.log('Item added to the cart');
        },
        error: (error) => {
          console.error('Error updating the item:', error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }

}
