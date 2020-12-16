import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonItemComponent } from './pokemon-item.component';
import { POKEMON_MOCK } from './pokemon-item.mock';
import { By } from '@angular/platform-browser';

describe('PokemonItemComponent', () => {
  let component: PokemonItemComponent;
  let fixture: ComponentFixture<PokemonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonItemComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonItemComponent);
    component = fixture.componentInstance;
    component.pokemon = POKEMON_MOCK;
  });

  describe('Check  PokemonItemComponent', () => {
    it('should verify name and image', () => {
      component.isCartMode = false;
      component.showAction = true;
      fixture.detectChanges();
      const name = fixture.debugElement.queryAll(By.css('div'));
      const image = fixture.debugElement.query(By.css('div img'));
      expect(name[2].nativeElement.innerText).toEqual('Mock Pokemon');
      expect(image.properties.src).toEqual(POKEMON_MOCK.url);
    });

    it('should show pokemon item with + action', () => {
      component.isCartMode = false;
      component.showAction = true;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.innerText).toEqual('+');
    });
  
    it('should show pokemon item with - action', () => {
      component.isCartMode = true;
      component.showAction = true;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.innerText).toEqual('-');
    });
  
    it('should hide action from pokemon item', () => {
      component.isCartMode = false;
      component.showAction = false;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button).toBeNull();
    });

    it('should emit value on action click', () => {
      spyOn(component.onActionClick, 'emit');
      component.isCartMode = false;
      component.showAction = true;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(component.onActionClick.emit).toHaveBeenCalledWith(component.pokemon);
    });
  });
});
