import { Injectable } from "@angular/core";
import { CartItem } from "../_models/cart-item.model";
import { ItemService } from "./item.service";

@Injectable({ providedIn: 'root' })
export class CartService {
    cartList: CartItem[] = [];

    constructor(private itemService: ItemService) { 
        this.cartList = JSON.parse(localStorage.getItem('shopping-cart'));
    }

    getCartList() {
        return this.cartList;
    }

}