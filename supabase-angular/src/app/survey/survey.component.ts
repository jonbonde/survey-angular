import { Component } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service';
import { QuestionsService } from '../questions.service';
import { Question } from '../question';
import { AppComponent } from '../app.component';
import { Answer } from '../answer';
import { ActivatedRoute } from '@angular/router';
//import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  session = this.supabase.session;
  profile!: Profile;
  questions!: Question[];
  surveyId!: number;
  survey!: string;

  constructor(
    private readonly supabase: SupabaseService, 
    private questionsService: QuestionsService, 
    private appcomponent: AppComponent,
    private route: ActivatedRoute,
    //private accountComponent: AccountComponent
  ) {  }

  ngOnInit() {
    this.session = this.appcomponent.session;
    //this.profile = this.accountComponent.profile;

    this.route.params.subscribe(params => {
      this.surveyId = Number(params['id']);

      this.questionsService.getQuestions(this.surveyId).subscribe((data) => {
        this.questions = data;
      });

      this.questionsService.getSurveyById(this.surveyId).subscribe(data => {
        this.survey = data.survey_name;
        console.log(this.survey);
      });
    });
  }
}
