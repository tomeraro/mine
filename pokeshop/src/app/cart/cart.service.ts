import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isLoggedInUser: boolean = false;
  private cartItems: Map<string, Pokemon> = new Map<string, Pokemon>();
  private cart$: BehaviorSubject<Map<string, Pokemon>>;
  
  public cartData: Observable<Map<string, Pokemon>>;

  constructor(
    private logger: LoggerService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
    this.cart$ = new BehaviorSubject<Map<string, Pokemon>>(this.cartItems);
    this.cartData = this.cart$.asObservable();
    this.authService.isLoggedIn$.subscribe((res: boolean) => {
      this.isLoggedInUser = res;
      if (this.isLoggedInUser) {
        this.onUserLoggedIn();
      }
    }, (err) => this.logger.debug('listening to logged in user failed ' + err));
  }

  public addToCart(pokemon: Pokemon): void {
    this.logger.debug(`pokemon: ${pokemon.name} was added to the cart`);
    this.cartItems.set(pokemon.name, pokemon);
    this.cart$.next(this.cartItems);
    this.updateLocalStorage();
  }

  public deleteFromCart(key: string): void {
    this.logger.debug(`pokemon: ${key} removed from the cart`);
    this.cartItems.delete(key);
    this.cart$.next(this.cartItems);
    this.updateLocalStorage();
  }

  public clearCart(): void {
    this.logger.debug(`cart cleared`);
    this.cartItems.clear();
    this.cart$.next(this.cartItems);
    this.updateLocalStorage(true);
  }

  private updateLocalStorage(isCleared = false): void {
    if (this.isLoggedInUser) {
      if (isCleared) {
        this.localStorageService.clearLocalStorage();
      } else {
        this.localStorageService.saveCartToLocalStorage(JSON.stringify(Array.from(this.cartItems.entries())));
      }
    }
  }

  private onUserLoggedIn(): void {
    const cartItems = new Map<string, Pokemon>(JSON.parse(this.localStorageService.getCartFromLocalStorage()));
    if (cartItems.size > 0) {
      this.cartItems = cartItems;
      this.cart$.next(this.cartItems);
    }
  }
}
