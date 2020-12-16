import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { Mock } from 'ts-mocks';
import { CartService } from './cart.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CART_MOCK, EMPTY_CART_MOCK } from './cart.mock';
import { MockComponent } from 'ng-mocks';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { By } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: Mock<CartService>;
  let dialogMock: Mock<MatDialog>;

  beforeEach(async(() => {
    cartServiceMock = new Mock<CartService>({
      cartData: of(EMPTY_CART_MOCK),
    });

    dialogMock = new Mock<MatDialog>({
      open: () => {
        return {} as MatDialogRef<any>
      },
    });

    TestBed.configureTestingModule({
      declarations: [
        CartComponent,
        MockComponent(PokemonItemComponent),
      ],
      providers: [
        { provide: CartService, useFactory: () => cartServiceMock.Object },
        { provide: MatDialog, useFactory: () => dialogMock.Object },
      ],
      imports: [
        MatListModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  describe('check CartComponent', () => {
    it('should show empty state when no pokemons on cart', () => {
      fixture.detectChanges();
      const emptyState = fixture.debugElement.query(By.css('.cart__empty'));
      expect(emptyState).not.toBeNull();
      expect(emptyState.nativeElement.innerText).toEqual('Cart is empty.');
    });

    it('should open dialog on clear cart clicked', () => {
      cartServiceMock.extend({
        cartData: of(CART_MOCK),
      });
      fixture.detectChanges();
      const clearButton = fixture.debugElement.query(By.css('button.cart__clear'));
      clearButton.nativeElement.click();
      expect(dialogMock.Object.open).toHaveBeenCalled();
    });

    //other test are similar to tests in homeComponent
  });
});
