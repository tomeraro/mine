import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';
import { CartService } from '../cart/cart.service';
import { Mock } from 'ts-mocks';
import { CART_MOCK } from '../cart/cart.mock';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: Mock<AuthService>;
  let loggerServiceMock: Mock<LoggerService>;
  let cartServiceMock: Mock<CartService>;

  beforeEach(async(() => {
    loggerServiceMock = new Mock<LoggerService>({
      debug: () => {},
      info: () => {},
    });

    cartServiceMock = new Mock<CartService>({
      cartData: of(CART_MOCK),
    });
    
    authServiceMock = new Mock<AuthService>({
      login: () => {},
      logout: () => {},
    });
  
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: AuthService, useFactory: () => authServiceMock.Object },
        { provide: LoggerService, useFactory: () => loggerServiceMock.Object },
        { provide: CartService, useFactory: () => cartServiceMock.Object },
      ],
      imports: [
        MatListModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('check HeaderComponent', () => {
    it('should show badge on cart', () => {
      const cartIndication = fixture.debugElement.query(By.css('.indication'));
      expect(cartIndication.nativeElement.innerText).toEqual('1');
    });

    it('should destroy component', () => {
      component.ngOnDestroy();
      expect(component['cartSubscription'].closed).toBeTruthy();
    });
  });
});
