import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQualifications } from './admin-qualifications';

describe('AdminQualifications', () => {
  let component: AdminQualifications;
  let fixture: ComponentFixture<AdminQualifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQualifications],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminQualifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
