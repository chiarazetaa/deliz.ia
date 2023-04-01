import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './items/item-list/item/item.component';
import { NgbModule}  from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { HeaderComponent } from './header/header.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemStartComponent } from './items/item-start/item-start.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { authenticationInterceptor } from './_helpers/authentication.interceptor';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    authenticationInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
