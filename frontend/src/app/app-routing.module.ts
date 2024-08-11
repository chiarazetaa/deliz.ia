import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemStartComponent } from './items/item-start/item-start.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent, children: [
    { path: '', component: ItemStartComponent },
    { path: 'new', component: ItemEditComponent },
    { path: ':id', component: ItemDetailComponent },
    { path: ':id/edit', component: ItemEditComponent },
  ] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
