import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Item } from '../models/item.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // subject to notify about changes in the items list
  itemsChanged = new Subject<Item[]>();
  cartChanged = new Subject<Cart>();

  constructor(private http: HttpClient) { }

  /*** ITEMS ***/

  getItems(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/items`).pipe(
      // emit fetched items
      tap(items => this.itemsChanged.next(items))
    );
  }

  getItemById(_id: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/items/${_id}`);
  }

  addItem(newItem: Item): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/api/items`, newItem).pipe(
      // emit updated items
      tap(updatedItems => this.itemsChanged.next(updatedItems))
    );
  }

  removeItem(_id: string): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/api/items/${_id}`).pipe(
      // emit updated items
      tap(updatedItems => this.itemsChanged.next(updatedItems))
    );
  }

  updateItem(_id: string, itemInfo: Item): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/api/items/${_id}`, itemInfo).pipe(
      // emit updated items
      tap(updatedItems => this.itemsChanged.next(updatedItems))
    );
  }

  /*** CART ***/

  getCart(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/carts`).pipe(
      // emit fetched cart
      tap(cart => this.cartChanged.next(cart))
    );
  }

  addItemToCart(cart: Cart, itemId: string): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/api/carts`, {cart: cart, itemId: itemId}).pipe(
      // emit updated cart
      tap(updatedCart => this.cartChanged.next(updatedCart))
    );
  }
}