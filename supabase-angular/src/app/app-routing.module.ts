import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { LoginComponent } from './login/login.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';

const routes: Routes = [
  { path: 'survey', component: SurveyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-questions', component: CreateQuestionsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
