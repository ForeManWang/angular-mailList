import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagNewComponent } from './tag-new.component';

describe('TagNewComponent', () => {
  let component: TagNewComponent;
  let fixture: ComponentFixture<TagNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
