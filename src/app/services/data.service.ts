import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IhackIdea } from '../dashboard/hack-ideas';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IhackIdea[]> {
    return this.httpClient.get<IhackIdea[]>(environment.API_URL, { headers: environment.API_URL_HEADERS })
  }

  putUpVote(idea: IhackIdea): Observable<any> {
    return this.httpClient.put(environment.API_URL + '/' + idea._id, { "upvote": idea.upvote }, { headers: environment.API_URL_HEADERS })
  }

  addNew(idea: any): Observable<any>{
    return this.httpClient.post(environment.API_URL, idea, { headers: environment.API_URL_HEADERS })
  }
}
