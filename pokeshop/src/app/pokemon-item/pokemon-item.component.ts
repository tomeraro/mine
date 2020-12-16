import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../pokemon-types';

//shared component that is just for displaying the pokemon item in home page and in cart.
//no real logic here, just get and emit data.
@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent {
  @Input() public pokemon: Pokemon;
  @Input() public isCartMode: boolean;
  @Input() public showAction: boolean = true;
  @Output() public onActionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public buttonClicked(): void {
    this.onActionClick.emit(this.pokemon);
  }
}
