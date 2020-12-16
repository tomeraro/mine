import { Component, OnInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { CartService } from './cart.service';
import { Pokemon } from '../pokemon-types';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClearCartDialogComponent } from './clear-cart-dialog/clear-cart-dialog.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChildren("pokemonItem", {read: ElementRef}) pokemonItems: QueryList<ElementRef>;
  public cartItems$: Observable<Map<string, Pokemon>>;
  public isDeleted: boolean;
  constructor(
    private cartService: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartData;
  }

  public deletePokemonFromCart(pokemon: Pokemon): void {
    const arrayItems = this.pokemonItems.toArray();
    const elementToHide = arrayItems.find(element => element.nativeElement.id === `cart-item-${pokemon.name}`);
    if (elementToHide) {
      elementToHide.nativeElement.classList.add('animateOut');
      setTimeout(() => this.cartService.deleteFromCart(pokemon.name), 500);
    }
  }

  public clearCart(): void {
    const dialogRef = this.dialog.open(ClearCartDialogComponent, {
      panelClass: 'cart__clear-dialog'
    });
    dialogRef.afterClosed().pipe(first()).subscribe(() => console.log(`dialog closed`));
  }
}
