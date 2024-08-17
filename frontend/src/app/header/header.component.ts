import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiService } from '../utilities/services/api.service';
import { Cart } from '../utilities/models/cart.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  cart: Cart = { _id: '', list: [] };
  cartItemsQuantity: number = 0;
  private cartSubscription: Subscription | undefined;

  currentUser: any;
  currentPath: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPath = event.url;
    });
  }

  ngOnInit(): void {
    // subscribe to the cartChanged Subject to get notified of changes
    this.cartSubscription = this.apiService.cartChanged.subscribe((cart) => {
      this.cart = cart;
      if (cart.list && cart.list?.length > 0) {
        this.cartItemsQuantity = 0;
        for (let item of cart.list) {
          this.cartItemsQuantity += item['quantity'];
        }
      } else {
        this.cartItemsQuantity = cart.list?.length || 0;
      }
    });

    // fetch the initial cart
    this.refreshCart();
  }

  refreshCart(): void {
    this.apiService.getCart().subscribe();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
