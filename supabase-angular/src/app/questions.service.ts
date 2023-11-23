import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { Answer } from './answer';
import { QuestionAnswerOption } from './question-answer-option';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    const url = `${this.baseUrl}/questions?select=*,answer_options:get_question_answer_options`;
    return this.http.get<Question[]>(url);
  }

  createQuestion(questionData: {question: string, answer_type: string}): Observable<Question> {
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
}
