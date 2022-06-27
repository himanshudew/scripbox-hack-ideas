import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { MockData } from './dashboard-mock-data';
import { environment } from 'src/environments/environment';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll() should http GET All documents', () => {

    service.getAll().subscribe((res) => {
      expect(res).toEqual(MockData);
    });

    const req = httpMock.expectOne(environment.API_URL);
    expect(req.request.method).toEqual("GET");
    req.flush(MockData);

    httpMock.verify();
  });

  it('putUpVote() should http PUT one document', () => {

    const idea = {
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

    service.putUpVote(idea).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(environment.API_URL + '/' + idea._id);
    expect(req.request.method).toEqual("PUT");
    req.flush({});

    httpMock.verify();
  });

  it('addNew() should http POST one document', () => {

    const newidea = {
      "title": "test 1 title",
      "description": "test 1 description",
      "tags": [
        "tags",
        "savings"
      ],
      "upvote": 0,
      "creationDateTime": "2022-06-22T11:19:12.270Z"
    }

    service.addNew(newidea).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(environment.API_URL);
    expect(req.request.method).toEqual("POST");
    req.flush({});

    httpMock.verify();
  });
});
