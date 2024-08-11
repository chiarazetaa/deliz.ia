import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../../_models/item.model';
import { ItemService } from '../../_services/item.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  currentUser: any;
  item: Item;

  constructor(
    private itemService: ItemService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.item = this.itemService.getItemById(+params['id']);
        if (!this.item) {
          this.router.navigate(['/items']);
        }
      }
    );
  }

  onEditItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRemoveItem() {
    this.itemService.removeItem(this.item.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddItemToCart() {
    this.cartService.addItemToCart(this.item);
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
