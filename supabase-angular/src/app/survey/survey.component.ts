import { Component } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service';
import { QuestionsService } from '../questions.service';
import { Question } from '../question';
import { AppComponent } from '../app.component';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  session = this.supabase.session;
  profile!: Profile;
  questions!: Question[];

  constructor(
    private readonly supabase: SupabaseService, 
    private questionsService: QuestionsService, 
    private appcomponent: AppComponent,
    private accountComponent: AccountComponent
  ) {  }

  ngOnInit() {
    this.session = this.appcomponent.session;
    //this.profile = this.accountComponent.profile;

    this.questionsService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }
}
