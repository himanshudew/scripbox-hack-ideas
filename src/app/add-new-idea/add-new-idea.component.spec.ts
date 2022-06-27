import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { DataService } from '../services/data.service';
import { AddNewIdeaComponent } from './add-new-idea.component';

describe('AddNewIdeaComponent', () => {
  let component: AddNewIdeaComponent;
  let fixture: ComponentFixture<AddNewIdeaComponent>;
  let dataServiceSpy = jasmine.createSpyObj('DataService', ['addNew']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AddNewIdeaComponent],
      providers: [FormBuilder, { provide: DataService, useValue: dataServiceSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataServiceSpy.addNew.and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSubmit()', () => {
    spyOn(window, 'alert');
    component.addNewIdeaFormGrp.controls['title'].setValue('new title');
    component.addNewIdeaFormGrp.controls['description'].setValue('new description');
    component.addNewIdeaFormGrp.controls['tags'].setValue(["UI", "UX"]);
    component.onSubmit();
    expect(component.submitted).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith('Idea successfully added.');
  });

  it('#onSubmit() np submit if form is invalid', () => {
    spyOn(window, 'alert');
    component.addNewIdeaFormGrp.controls['title'].setValue('');
    component.addNewIdeaFormGrp.controls['description'].setValue('new description');
    component.addNewIdeaFormGrp.controls['tags'].setValue(["UI", "UX"]);
    component.onSubmit();
    expect(component.addNewIdeaFormGrp.invalid).toBeTrue();
  });
});
