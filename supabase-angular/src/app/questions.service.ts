import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { Answer } from './answer';
import { QuestionAnswerOption } from './question-answer-option';
import { Survey } from './Survey';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getQuestions(surveyId: number): Observable<Question[]> {
    const url = `${this.baseUrl}/questions?select=*,answer_options:get_question_answer_options&survey_id=eq.${surveyId}`;
    return this.http.get<Question[]>(url);
  }

  createQuestion(questionData: {question: string, answer_type: string, survey_id: number}): Observable<Question> {
    const url = `${this.baseUrl}/questions`;
    return this.http.post<Question>(url, questionData, { headers: { Prefer: 'return=representation', Accept: 'application/vnd.pgrst.object+json' } });
  }

  addAnswerOptions(answerOptionData: { answer_option: string }): Observable<Answer> {
    const url = `${this.baseUrl}/answer_options`;
    return this.http.post<Answer>(url, answerOptionData, { headers: { Prefer: 'return=representation', Accept: 'application/vnd.pgrst.object+json' } });
  }

  createQuestionAnswerOption(data: { answer_option_id: number, question_id: number }): Observable<QuestionAnswerOption> {
    const url = `${this.baseUrl}/questions_answer_options`;
    return this.http.post<QuestionAnswerOption>(url, data, { headers: { Prefer: 'return=representation', Accept: 'application/vnd.pgrst.object+json' } });
  }

  getSurveys(): Observable<Survey[]> {
    const url = `${this.baseUrl}/survey`;
    return this.http.get<Survey[]>(url);
  }

  getSurveyById(id: number): Observable<Survey> {
    const url = `${this.baseUrl}/survey?id=eq.${id}`;
    return this.http.get<Survey>(url, { headers: { Prefer: 'return=representation', Accept: 'application/vnd.pgrst.object+json' } });
  }
}
