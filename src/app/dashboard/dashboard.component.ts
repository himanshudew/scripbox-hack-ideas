import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IhackIdea } from './hack-ideas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userid: string;
  hackIdeasCollection: IhackIdea[];

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.authService.getUserId.subscribe((user) => { this.userid = user });
    this.httpClient.get(environment.API_URL, { headers: environment.API_URL_HEADERS })
      .subscribe((res: IhackIdea[]) => {
        res.sort((a, b) => b.upvote - a.upvote);//default sort using upvote descending order high to low
        this.hackIdeasCollection = res;
      });
  }

  onUpVoteClick(idea) {
    this.httpClient.put(environment.API_URL + '/' + idea._id, { "upvote": ++idea.upvote }, { headers: environment.API_URL_HEADERS })
      .subscribe(res => {
        var objIndex = this.hackIdeasCollection.findIndex((obj => obj._id == idea._id));
        ++this.hackIdeasCollection[objIndex].upvote;//increments, and returns the new
      });
  }

  sortyByVote(order) {
    if (order == 'high to low') {
      this.hackIdeasCollection.sort((a, b) => b.upvote - a.upvote);
    }
    if (order == 'low to high') {
      this.hackIdeasCollection.sort((a, b) => a.upvote - b.upvote);
    }
  }

  sortByDateTime(order) {
    if (order == 'Recent first') {
      this.hackIdeasCollection.sort((a, b) => Date.parse(b.creationDateTime) - Date.parse(a.creationDateTime));
    }
    if (order == 'Oldest first') {
      this.hackIdeasCollection.sort((a, b) => Date.parse(a.creationDateTime) - Date.parse(b.creationDateTime));
    }
  }
} 