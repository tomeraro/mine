import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';
import { CartService } from '../cart/cart.service';
import { Pokemon } from '../pokemon-types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public itemsInCart: number;
  isLoggedIn = this.auth.isLoggedIn$;

  private cartSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private logger: LoggerService,
    private cart: CartService) { }

  ngOnInit(): void {
    this.logger.debug('init HeaderComponent');
    this.cartSubscription = 
      this.cart.cartData.subscribe((cartItems: Map<string, Pokemon>) => this.itemsInCart = cartItems.size);
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.logger.debug('destory HeaderComponent');
    this.cartSubscription?.unsubscribe();
  }
}
