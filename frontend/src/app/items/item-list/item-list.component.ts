import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../utilities/models/item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../../utilities/services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private itemsSubscription: Subscription;

  constructor(
    private itemService: ItemsService, 
    private router: Router,
    private route: ActivatedRoute,
  ) { 
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
