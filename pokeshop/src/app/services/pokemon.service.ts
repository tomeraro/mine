import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { ApiClientService } from './api-client.service';
import { Subscription, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Pokemon } from '../pokemon-types';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  PokemonList$ = this.pokemonList.asObservable();
  private pokemonsSub = new Subscription();

  constructor(
    private logger: LoggerService,
    private apiClient: ApiClientService
  ) { }

  //note: in larger apps I would store this calls so we will not fetch the data everytime we are going to homepage
  public init() {
    this.pokemonsSub = this.apiClient.getPokemons()
    .pipe(
      switchMap((response: Pokemon[]) => combineLatest(response.map(pokemon => this.apiClient.getPokemon(pokemon.name)) as Observable<any>[])),
      map(response => response.map(poke => ({ name: poke.name, url: poke.sprites.front_default })))
    )
    .subscribe((response: Pokemon[]) => {
        if(response !== undefined) {
          this.pokemonList.next(response);
          this.logger.info(`Got ${response.length} pokemons`)
          this.pokemonsSub.unsubscribe();
        }
      });
  }
}
