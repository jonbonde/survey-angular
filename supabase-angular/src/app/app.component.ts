import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { Survey } from './Survey';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supabase-angular';
  surveys!: Survey[];

  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService, private router: Router, private questionsService: QuestionsService) {  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));

    if (this.session?.user.email == '') {
      this.router.navigate(['/Login']);
    }

    this.questionsService.getSurveys().subscribe((data) => {
      this.surveys = data;
    });
  }
}
