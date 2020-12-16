import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from './header/header.component';
import { PokemonService } from './services/pokemon.service';
import { Mock } from 'ts-mocks';
import { LoggerService } from './services/logger.service';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let pokemonServiceMock: Mock<PokemonService>;
  let loggerServiceMock: Mock<LoggerService>;
  let authServiceMock: Mock<AuthService>;

  beforeEach(async(() => {
    pokemonServiceMock = new Mock<PokemonService>({
      init: () => {},      
    });

    loggerServiceMock = new Mock<LoggerService>({
      debug: () => {},
    });
    
    authServiceMock = new Mock<AuthService>({
      init: () => {},
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(HeaderComponent),
      ],
      providers: [
        { provide: PokemonService, useFactory: () => pokemonServiceMock.Object },
        { provide: LoggerService, useFactory: () => loggerServiceMock.Object },
        { provide: AuthService, useFactory: () => authServiceMock.Object },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pokeshop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pokeshop');
  });
});
