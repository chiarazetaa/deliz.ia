import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartItem } from '../_models/cart-item.model';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cartList: CartItem[];
  private subscription: Subscription;

  constructor(
    private cartService: CartService,
    private modalService: NgbModal
  ) {
    //this.cartService.updateCartContent();
    this.subscription = this.cartService.cartListChanged.subscribe(
      (cartList: CartItem[]) => {
        this.cartList = cartList;
      }
    );
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartList();
    this.subscription = this.cartService.cartListChanged.subscribe(
      (cartList: CartItem[]) => {
        this.cartList = cartList;
      }
    );
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  // order modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Ok') {
        this.onRemoveAllCartItems();
      } 
    });
  }



  

}
