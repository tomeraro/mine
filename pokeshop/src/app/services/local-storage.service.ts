import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

//note: I used the type any here for generic reason, we want to be able to use this service for saving different types of data to localStorage 

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly cartKey: string = 'pokemon_cart';

  constructor(private logger: LoggerService) {}

  public saveCartToLocalStorage(value: any): void {
    this.logger.debug(`cart saved to localStorage`);
    localStorage.setItem(this.cartKey, value);
  }

  public getCartFromLocalStorage(): any {
    this.logger.debug(`fetch cart from localStorage`);
    return localStorage.getItem(this.cartKey);
  }

  public clearLocalStorage(): void {
    this.logger.debug(`cart cleared from localStorage`);
    localStorage.setItem(this.cartKey, null);
  }
}
