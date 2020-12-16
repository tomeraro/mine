import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { Mock } from 'ts-mocks';
import { HomeComponent } from './home.component';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';
import { POKEMON_MOCK } from '../pokemon-item/pokemon-item.mock';
import { LoggerService } from '../services/logger.service';
import { CartService } from '../cart/cart.service';
import { CART_MOCK } from '../cart/cart.mock';
import { By } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let pokemonServiceMock: Mock<PokemonService>;
  let loggerServiceMock: Mock<LoggerService>;
  let cartServiceMock: Mock<CartService>;

  beforeEach(async(() => {
    pokemonServiceMock = new Mock<PokemonService>({
      PokemonList$: of([POKEMON_MOCK]),
      init: () => {},      
    });

    loggerServiceMock = new Mock<LoggerService>({
      debug: () => {},
      info: () => {},
    });

    cartServiceMock = new Mock<CartService>({
      addToCart: () => {},
      clearCart: () => {},
      deleteFromCart: () => {},
      cartData: of(CART_MOCK),
    });

    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(PokemonItemComponent),
      ],
      providers: [
        { provide: PokemonService, useFactory: () => pokemonServiceMock.Object },
        { provide: LoggerService, useFactory: () => loggerServiceMock.Object },
        { provide: CartService, useFactory: () => cartServiceMock.Object },
      ],
      imports: [
        MatListModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Check HomeComponent', () => {
    it('should fetch pokemons', () => {
      const pokemonsUI = fixture.debugElement.queryAll(By.css('app-pokemon-item'));
      expect(pokemonsUI.length).toEqual(1);
    });

    it('should show home page title', () => {
      const title = fixture.debugElement.query(By.css('.pokemon-list__title'));
      expect(title.nativeElement.innerText).toEqual('Pokemons list (1):');
    });

    it('should check pokemon item inputs', () => {
      const pokemonsUI = fixture.debugElement.queryAll(By.css('app-pokemon-item'));
      expect(pokemonsUI[0].componentInstance.pokemon).toEqual(POKEMON_MOCK);
      expect(pokemonsUI[0].componentInstance.isCartMode).toBeFalsy();
      expect(pokemonsUI[0].componentInstance.showAction).toBeFalsy();
    });

    it('should call to service to add pokemon to cart', () => {
      component.addPokemonToCart(POKEMON_MOCK);
      expect(cartServiceMock.Object.addToCart).toHaveBeenCalledWith(POKEMON_MOCK);
    });
  });
});
