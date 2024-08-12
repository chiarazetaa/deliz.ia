import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../utilities/models/item.model';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../utilities/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private itemsSubscription: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // subscribe to the itemsChanged Subject to get notified of changes
    this.itemsSubscription = this.apiService.itemsChanged.subscribe((items) => {
      this.items = items;
    });

    // fetch the initial list of items
    this.refreshItems();
  }

  refreshItems(): void {
    this.apiService.getItems().subscribe();
  }

  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) this.itemsSubscription.unsubscribe();
  }
}
