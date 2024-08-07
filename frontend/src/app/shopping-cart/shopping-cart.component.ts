import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../utilities/models/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from '../utilities/services/cart.service';
import { ItemsService } from '../utilities/services/items.service';
import { Item } from '../utilities/models/item.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartList: Cart[] = [];
  private cartListSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private itemService: ItemsService,
    private modalService: NgbModal
  ) {
    this.cartListSubscription = this.cartService.cartListChanged.subscribe(
      (cartList: Cart[]) => {
        this.cartList = cartList;
      }
    );
    this.updateCartList(this.itemService.getItems());
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartList();
    this.cartListSubscription = this.cartService.cartListChanged.subscribe(
      (cartList: Cart[]) => {
        this.cartList = cartList;
      }
    );
    this.updateCartList(this.itemService.getItems());
  }

  getCartList() {
    return this.cartService.getCartList();
  }

  getSubtotal(price: number, quantity: number) {
    let subtotal = price * quantity;
    return subtotal;
  }

  getTotal() {
    let total = 0;
    for (let cartItem of this.cartList) {
      total += this.getSubtotal(cartItem.item.price, cartItem.quantity);
    }
    return total;
  }

  changeQuantity(cartItem: Cart, action: string) {
    this.cartService.changeQuantity(cartItem, action);
  }

  onRemoveAllCartItems() {
    this.cartService.removeAllCartItems();
  }

  updateCartList(items: Item[]) {
    this.cartService.updateCartList(items);
  }

  ngOnDestroy(): void {
    this.cartListSubscription.unsubscribe();
  }

  // delete order modal
  openDeleteOrderModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Elimina') {
        this.onRemoveAllCartItems();
      } 
    });
  }

  // order modal
  openOrderModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Ok') {
        this.onRemoveAllCartItems();
      } 
    });
  }
}
