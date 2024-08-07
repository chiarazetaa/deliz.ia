import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../utilities/models/item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../../utilities/services/items.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../utilities/services/cart.service';
import { Cart } from '../../utilities/models/cart.model';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  item: Item = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    picture: '',
    notes: ['']
  };
  cartItemQuantity: number = 0;
  private cartItemSubscription: Subscription;

  constructor(
    private itemService: ItemsService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private modalService: NgbModal,
    private cartService: CartService
  ) { 
    // subscription to cart list
    this.cartItemSubscription = this.cartService.cartListChanged.subscribe(
      (cartList: Cart[]) => {
        let itemExistsInCart = cartList.find(el => el.item.id === this.item.id);
        this.cartItemQuantity = (itemExistsInCart && itemExistsInCart.quantity) ? itemExistsInCart.quantity : 0;
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const itemFound = this.itemService.getItemById(+params['id']);
        if (itemFound) this.item = itemFound;
        if (!this.item) {
          this.router.navigate(['/items']);
        }

        this.cartItemQuantity = this.cartService.getCartItem(this.item);
        // subscription to cart list
        this.cartItemSubscription = this.cartService.cartListChanged.subscribe(
          (cartList: Cart[]) => {
            let itemExistsInCart = cartList.find(el => el.item.id === this.item.id);
            this.cartItemQuantity = (itemExistsInCart && itemExistsInCart.quantity) ? itemExistsInCart.quantity : 0;
          }
        );
      }
    );
  }

  onEditItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRemoveItem() {
    this.itemService.removeItem(this.item.id);
    this.router.navigate(['/items']);
  }

  onAddItemToCart() {
    this.cartService.addItemToCart(this.item);
  }

  ngOnDestroy(): void {
    this.cartItemSubscription.unsubscribe();
  }

  // delete item modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Elimina') {
        this.onRemoveItem();
      } 
    });
  }

}
