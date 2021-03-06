import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IhackIdea } from '../dashboard/hack-ideas';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-new-idea',
  templateUrl: './add-new-idea.component.html',
  styleUrls: ['./add-new-idea.component.css']
})
export class AddNewIdeaComponent implements OnInit {

  addNewIdeaFormGrp: FormGroup;
  submitted = false;
  hackIdea: IhackIdea;

  tags: any = ['AI', 'UI', 'UX', 'Tech', 'Finance']

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addNewIdeaFormGrp = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields  
  get formGrpControls() { return this.addNewIdeaFormGrp.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addNewIdeaFormGrp.invalid) {
      return;
    }

    this.hackIdea = {
      title: this.formGrpControls.title.value,
      description: this.formGrpControls.description.value,
      tags: JSON.stringify(this.formGrpControls.tags.value),
      upvote: 0,
      creationDateTime: new Date().toISOString()
    };

    this.dataService.addNew(this.hackIdea).subscribe(res => {
      alert('Idea successfully added.');
      this.router.navigate(['']);
    });
  }
}
