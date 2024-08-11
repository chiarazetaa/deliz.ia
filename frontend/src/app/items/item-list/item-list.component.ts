import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Item } from '../../_models/item.model';
import { ItemService } from '../../_services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  currentUser: any;
  items: Item[];
  private itemsSubscription: Subscription;

  constructor(
    private itemService: ItemService, 
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.itemsSubscription = this.itemService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.itemsSubscription = this.itemService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  onNewItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }
}
