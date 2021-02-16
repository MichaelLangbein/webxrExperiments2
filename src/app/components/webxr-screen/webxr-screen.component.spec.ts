import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrScreenComponent } from './webxr-screen.component';

describe('WebxrScreenComponent', () => {
  let component: WebxrScreenComponent;
  let fixture: ComponentFixture<WebxrScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
