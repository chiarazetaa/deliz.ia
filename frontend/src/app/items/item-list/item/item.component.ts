import { Component, Input } from '@angular/core';
import { Item } from '../../../utilities/models/item.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() item: Item = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    picture: '',
    notes: ['']
  };
  @Input() index: number = 0;
}
