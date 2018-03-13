import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameJamComponent } from './game-jam.component';

describe('GameJamComponent', () => {
  let component: GameJamComponent;
  let fixture: ComponentFixture<GameJamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameJamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameJamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
