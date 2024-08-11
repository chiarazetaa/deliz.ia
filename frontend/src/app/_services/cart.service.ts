import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { first, Subject } from "rxjs";
import { CartItem } from "../_models/cart-item.model";
import { Item } from "../_models/item.model";
import { ItemService } from "./item.service";

@Injectable({ providedIn: 'root' })
export class CartService {

    cartList: CartItem[] = [];
    cartListChanged = new Subject<CartItem[]>();

    constructor(private itemService: ItemService) { 
        this.cartList = JSON.parse(localStorage.getItem('shopping-cart'));
    }

    getCartList() {
        return (this.cartList) ? this.cartList : [];
    }

    addItemToCart(item: Item) {
        let currentCartList = this.getCartList();
        // check if item is already in the cart
        let itemExistsInCart = currentCartList.find(el => el.item.id === item.id);
    
        if (itemExistsInCart) {
            itemExistsInCart.quantity++;
        } else {
            currentCartList.push(new CartItem(item, 1));
        }

        // update cart list
        localStorage.setItem('shopping-cart', JSON.stringify(currentCartList));
        this.cartListChanged.next(currentCartList);
    }

    changeQuantity(cartItem: CartItem, action: string) {
        let currentCartList = this.getCartList();
        let itemFound = currentCartList.find(el => el.item.id === cartItem.item.id);

        if (itemFound) {
            if (action === 'increase') {
                itemFound.quantity++;
            } else if (action === 'decrease') {
                itemFound.quantity--;
                currentCartList = currentCartList.filter(item => item.quantity > 0);
            }
            // update cart list
            localStorage.setItem('shopping-cart', JSON.stringify(currentCartList));
            this.cartListChanged.next(currentCartList);
        }
    }

    removeAllCartItems() {
        localStorage.setItem('shopping-cart', JSON.stringify([]));
        this.cartListChanged.next([]);
    }

    
}