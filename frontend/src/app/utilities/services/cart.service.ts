import { Injectable } from "@angular/core";
import { Cart } from "../models/cart.model";
import { Subject } from "rxjs";
import { ItemsService } from "./items.service";
import { Item } from "../models/item.model";

@Injectable({ providedIn: 'root' })
export class CartService {
    cartList: Cart[] = [];
    cartListChanged = new Subject<Cart[]>();

    constructor(private itemService: ItemsService) {
        const items = localStorage.getItem('shopping-cart');
        this.cartList = items ? JSON.parse(items) : [];
    }

    getCartList() {
        return (this.cartList) ? this.cartList : [];
    }

    getCartItem(item: Item) {
        let currentCartList = this.getCartList();
        let cartItem = currentCartList.find(el => el.item.id === item.id);
        return (cartItem && cartItem.quantity) ? cartItem.quantity : 0;
    }

    addItemToCart(item: Item) {
        let currentCartList = this.getCartList();
        // check if item is already in the cart
        let itemExistsInCart = currentCartList.find(el => el.item.id === item.id);

        if (itemExistsInCart) {
            itemExistsInCart.quantity++;
        } else {
            currentCartList.push(new Cart(item, 1));
        }

        // update cart list
        localStorage.setItem('shopping-cart', JSON.stringify(currentCartList));
        this.cartListChanged.next(currentCartList);
    }

    changeQuantity(cartItem: Cart, action: string) {
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

    updateCartList(items: Item[]) {
        let currentCartList = this.getCartList();
        let newCartList: Cart[] = [];
        for (let cartItem of currentCartList) {
            let itemFound = items.find(el => el.id === cartItem.item.id);
            if (itemFound) {
                cartItem.item = itemFound;
            } else {
                cartItem.quantity = 0;
            }
            newCartList.push(new Cart(cartItem.item, cartItem.quantity));
        }
        newCartList = newCartList.filter(item => item.quantity > 0);
        // update cart list
        localStorage.setItem('shopping-cart', JSON.stringify(newCartList));
        this.cartListChanged.next(newCartList);
    }
}