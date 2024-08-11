import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemsComponent } from './items/items.component';
import { ItemStartComponent } from './items/item-start/item-start.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full' },
    { path: 'items', component: ItemsComponent, children: [
        { path: '', component: ItemStartComponent },
        { path: 'new', component: ItemEditComponent },
        { path: ':id', component: ItemDetailComponent },
        { path: ':id/edit', component: ItemEditComponent }
    ] },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/items' }
];
