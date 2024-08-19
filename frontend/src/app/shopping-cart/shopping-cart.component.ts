import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../utilities/models/cart.model';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../utilities/services/api.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: Cart = { _id: '', list: [] };
  private cartSubscription: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // fetch the cart whenever the component is initialized
    this.apiService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (error) => {
        console.error('Error fetching the cart:', error);
      }
    });

    // subscribe to the cartChanged Subject to get notified of changes
    this.cartSubscription = this.apiService.cartChanged.subscribe((cart) => {
      this.cart = cart;
    });
  }

  getSubtotal(price: number, quantity: number) {
    let subtotal = price * quantity;
    return subtotal;
  }

  getTotal() {
    let total = 0;
    for (let cartItem of this.cart.list) {
      total += this.getSubtotal(cartItem['item']['price'], cartItem['quantity']);
    }
    return total;
  }

  changeQuantity(cart: Cart, cartItem: object, action: string) {
    this.apiService.changeQuantity(cart, cartItem, action).subscribe();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }

  //*** MODALS ***/

  onRemoveAllCartItems() {
    this.apiService.removeAllCartItems(this.cart._id).subscribe();
  }

  // delete order modal
  openDeleteOrderModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'Elimina') {
        this.onRemoveAllCartItems();
      }
    });
  }

  // order modal
  openOrderModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'Ordina') {
        this.onRemoveAllCartItems();
      }
    });
  }
}
