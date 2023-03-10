import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { HeaderComponent } from './header/header.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemStartComponent } from './items/item-start/item-start.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    HeaderComponent,
    ItemListComponent,
    ItemStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
