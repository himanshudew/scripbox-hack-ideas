import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { IhackIdea } from './hack-ideas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userid: string;
  hackIdeasCollection: IhackIdea[];

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    this.authService.getUserId.subscribe((user) => { this.userid = user });

    this.dataService.getAll().subscribe((res: IhackIdea[]) => {
      res.sort((a, b) => b.upvote - a.upvote);//default sort using upvote descending order high to low
      this.hackIdeasCollection = res;
    });
  }

  onUpVoteClick(idea) {
    let objIndex = this.hackIdeasCollection.findIndex((obj => obj._id == idea._id));
    ++this.hackIdeasCollection[objIndex].upvote;
    this.dataService.putUpVote(idea).subscribe(data => { }, error => { --this.hackIdeasCollection[objIndex].upvote });
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
    console.log(this.hackIdeasCollection);
  }
} 