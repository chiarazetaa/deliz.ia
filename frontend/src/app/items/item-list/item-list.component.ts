import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Item[];
  private subscription: Subscription;

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.subscription = this.itemService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  onNewItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
