import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { MockData, MockDatasortByDateTimeRecent, MockDataVoteHighToLow } from '../services/dashboard-mock-data';
import { DataService } from '../services/data.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataServiceSpy = jasmine.createSpyObj('DataService', ['getAll', 'putUpVote']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientModule],
      providers: [{ provide: DataService, useValue: dataServiceSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dataServiceSpy.getAll.and.returnValue(of(MockData));
    dataServiceSpy.putUpVote.and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnit() should getAll', () => {
    component.ngOnInit();
    expect(component.hackIdeasCollection).toBe(MockData);
  });

  it('#onUpVoteClick() should increase upVote Count by 1', () => {
    let idea = {
      "_id": "62b840b972ab5817000030e5",
      "title": "test 1 title",
      "description": "test 1 description",
      "tags": [
        "tags",
        "savings"
      ],
      "upvote": 7,
      "creationDateTime": "2022-06-22T11:19:12.270Z"
    }
    component.onUpVoteClick(idea);
    let objIndex = component.hackIdeasCollection.findIndex((obj => obj._id == idea._id));
    expect(component.hackIdeasCollection[objIndex].upvote).toBe(8);
  });

  it('#sortyByVote() high to low', () => {
    component.sortyByVote('high to low');
    expect(component.hackIdeasCollection).toEqual(MockDataVoteHighToLow);
  });

  it('#sortByDateTime() Recent first', () => {
    component.sortByDateTime('Recent first');
    expect(component.hackIdeasCollection).toEqual(MockDatasortByDateTimeRecent);
  });

});
