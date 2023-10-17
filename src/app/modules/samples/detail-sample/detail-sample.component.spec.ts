import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSampleComponent } from './detail-sample.component';

describe('DetailSampleComponent', () => {
  let component: DetailSampleComponent;
  let fixture: ComponentFixture<DetailSampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSampleComponent]
    });
    fixture = TestBed.createComponent(DetailSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
