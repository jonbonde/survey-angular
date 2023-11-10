import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    const url = `${this.baseUrl}/questions`;
    return this.http.get<Question[]>(url);
  }
}
