import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreStartQuizComponetComponent } from './pre-start-quiz-componet.component';

describe('PreStartQuizComponetComponent', () => {
  let component: PreStartQuizComponetComponent;
  let fixture: ComponentFixture<PreStartQuizComponetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreStartQuizComponetComponent]
    });
    fixture = TestBed.createComponent(PreStartQuizComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
