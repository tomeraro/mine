import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { POKEMON_MOCK } from '../pokemon-item/pokemon-item.mock';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ApiClientService,
      ]
    });
    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('check ApiClientService', () => {
    it('should call to getPokemons()', (done) => {
      service.getPokemons().subscribe(res => {
        expect(res).toEqual([]);
        done();
      });
      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=30');
      expect(req.request.method).toBe('GET');
      req.flush({ results: [] });
    });

    it('should call to getPokemon()', (done) => {
      service.getPokemon(POKEMON_MOCK.name).subscribe(res => {
        expect(res).toEqual({});
        done();
      });
      const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${POKEMON_MOCK.name}`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
