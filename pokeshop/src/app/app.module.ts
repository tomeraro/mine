import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatList, MatListModule } from '@angular/material/list';
import { CartComponent } from './cart/cart.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { ClearCartDialogComponent } from './cart/clear-cart-dialog/clear-cart-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CartComponent,
    PokemonItemComponent,
    ClearCartDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ClearCartDialogComponent,
  ]
})
export class AppModule { }
