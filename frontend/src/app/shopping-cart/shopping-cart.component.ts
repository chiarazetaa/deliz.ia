import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartItem } from '../_models/cart-item.model';
import { Item } from '../_models/item.model';
import { CartService } from '../_services/cart.service';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cartList: CartItem[];
  private cartListSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private itemService: ItemService,
    private modalService: NgbModal
  ) {
    this.cartListSubscription = this.cartService.cartListChanged.subscribe(
      (cartList: CartItem[]) => {
        this.cartList = cartList;
      }
    );
    this.updateCartList(this.itemService.getItems());
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartList();
    this.cartListSubscription = this.cartService.cartListChanged.subscribe(
      (cartList: CartItem[]) => {
        this.cartList = cartList;
      }
    );
    this.updateCartList(this.itemService.getItems());
  }

  getCartList() {
    return this.cartService.getCartList();
  }

  getSubtotal(price, quantity) {
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

  changeQuantity(cartItem: CartItem, action: string) {
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
