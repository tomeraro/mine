import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Observable, Subscription } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { CartService } from '../cart/cart.service';
import { Pokemon } from '../pokemon-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private cartItems: Map<string, Pokemon>;
  private cartSubscription: Subscription;

  public pokemons$: Observable<Pokemon[]>;

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.logger.debug('init HomeComponent');
    this.pokemons$ = this.pokemonService.PokemonList$;
    this.cartSubscription = 
      this.cartService.cartData.subscribe(res => this.cartItems = res,
        (err) => this.logger.debug('listeting to cart data failed ' + err));
  }

  public addPokemonToCart(pokemon: Pokemon): void {
    this.cartService.addToCart(pokemon);
  }

  public isPokemonInCart(pokemon: string): boolean {
    return this.cartItems.has(pokemon);
  }

  ngOnDestroy(): void {
    this.logger.debug('destroy HomeComponent');
    this.cartSubscription?.unsubscribe();
  }
}
