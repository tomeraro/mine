import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { Mock } from 'ts-mocks';
import { LoggerService } from './logger.service';
import { ApiClientService } from './api-client.service';
import { of } from 'rxjs';
import { POKEMON_MOCK } from '../pokemon-item/pokemon-item.mock';
import { FULL_POKEMON_MOCK } from './pokemon.mock';

describe('PokemonService', () => {
  let service: PokemonService;
  let loggerServiceMock: Mock<LoggerService>;
  let apiClientMock: Mock<ApiClientService>;

  beforeEach(() => {
    apiClientMock = new Mock<ApiClientService>({
      getPokemons: () => of([POKEMON_MOCK]),
      getPokemon: () => of(FULL_POKEMON_MOCK),
    });
  
    loggerServiceMock = new Mock<LoggerService>({
      info: () => {},
    });
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        { provide: ApiClientService, useFactory: () => apiClientMock.Object },
        { provide: LoggerService, useFactory: () => loggerServiceMock.Object },
      ],
    });
    service = TestBed.inject(PokemonService);
    spyOn(service['pokemonList'], 'next');
  });

  describe('check PokemonService', () => {
    it('should send pokemonList', () => {
      service.init();
      expect(service['pokemonList'].next).toHaveBeenCalled();
    });
  });
});
