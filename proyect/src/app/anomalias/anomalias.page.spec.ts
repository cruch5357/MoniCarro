import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnomaliasPage } from './anomalias.page';

describe('AnomaliasPage', () => {
  let component: AnomaliasPage;
  let fixture: ComponentFixture<AnomaliasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomaliasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
