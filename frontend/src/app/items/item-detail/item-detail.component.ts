import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../utilities/models/item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../utilities/services/cart.service';
import { Cart } from '../../utilities/models/cart.model';
import { ApiService } from '../../utilities/services/api.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  item?: Item;
  _id: string = '';
  cartItemQuantity: number = 0;
  // private cartItemSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute, 
    private router: Router, 
    private modalService: NgbModal,
    private cartService: CartService
  ) { 
    // subscription to cart list
    // this.cartItemSubscription = this.cartService.cartListChanged.subscribe(
    //   (cartList: Cart[]) => {
    //     let itemExistsInCart = cartList.find(el => el.item._id === this.item._id);
    //     this.cartItemQuantity = (itemExistsInCart && itemExistsInCart.quantity) ? itemExistsInCart.quantity : 0;
    //   }
    // );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = params['id'];
      this.apiService.getItemById(params['id']).subscribe({
        next: (data) => {
          this.item = data.item;
        },
        error: (error) => {
          console.error('Error fetching the item:', error);
        }
      });
      // if (!this.item) {
      //   this.router.navigate(['/items']);
      // }
      // this.cartItemQuantity = this.cartService.getCartItem(this.item);
      //   // subscription to cart list
      //   this.cartItemSubscription = this.cartService.cartListChanged.subscribe(
      //     (cartList: Cart[]) => {
      //       let itemExistsInCart = cartList.find(el => el.item._id === this.item._id);
      //       this.cartItemQuantity = (itemExistsInCart && itemExistsInCart.quantity) ? itemExistsInCart.quantity : 0;
      //     }
      //   );
    });
  }

  onEditItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRemoveItem() {
    this.apiService.removeItem(this._id).subscribe({
      next: () => {
        this.router.navigate(['/items']);
      },
      error: (error) => {
        console.error('Error deleting the item:', error);
      }
    });
  }

  // delete item modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Elimina') {
        this.onRemoveItem();
      } 
    });
  }

  onAddItemToCart() {
    // this.cartService.addItemToCart(this.item);
  }

  ngOnDestroy(): void {
    // this.cartItemSubscription.unsubscribe();
  }

}
