import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Item;
  id: number;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.item = this.itemService.getItem(this.id);
      }
    );
  }

  onEditItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRemoveItem() {
    this.itemService.removeItem(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Elimina') {
        this.onRemoveItem();
      } 
    });
  }

}
