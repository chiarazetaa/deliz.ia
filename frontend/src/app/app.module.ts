import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { HeaderComponent } from './header/header.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemStartComponent } from './items/item-start/item-start.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './items/item-list/item/item.component';
import { ItemModalComponent } from './items/item-edit/item-modal/item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    HeaderComponent,
    ItemListComponent,
    ItemStartComponent,
    ItemEditComponent,
    ItemComponent,
    ItemModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
