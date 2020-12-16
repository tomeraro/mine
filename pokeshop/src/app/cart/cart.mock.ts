import { Pokemon } from '../pokemon-types';
import { POKEMON_MOCK } from '../pokemon-item/pokemon-item.mock';

export const CART_MOCK = new Map<string, Pokemon>();
CART_MOCK.set(POKEMON_MOCK.name, POKEMON_MOCK);

export const EMPTY_CART_MOCK = new Map<string, Pokemon>();
