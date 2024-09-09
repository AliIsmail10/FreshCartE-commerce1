import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBrandsComponent } from './details-brands.component';

describe('DetailsBrandsComponent', () => {
  let component: DetailsBrandsComponent;
  let fixture: ComponentFixture<DetailsBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBrandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
