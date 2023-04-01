import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemStartComponent } from './items/item-start/item-start.component';
import { ItemsComponent } from './items/items.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent, children: [
    { path: '', component: ItemStartComponent },
    { path: 'new', component: ItemEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: ItemDetailComponent },
    { path: ':id/edit', component: ItemEditComponent, canActivate: [AuthGuard] }
  ] },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/items' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
