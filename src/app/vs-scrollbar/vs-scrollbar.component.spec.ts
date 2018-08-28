import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsScrollbarComponent } from './vs-scrollbar.component';

describe('VsScrollbarComponent', () => {
  let component: VsScrollbarComponent;
  let fixture: ComponentFixture<VsScrollbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsScrollbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsScrollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
