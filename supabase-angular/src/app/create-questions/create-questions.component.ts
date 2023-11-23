import { Component } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service';
import { QuestionsService } from '../questions.service';
import { Question } from '../question';
import { AppComponent } from '../app.component';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent {
  session = this.supabase.session;
  selectedAnsType!: string;
  numberAnswers: number = 1;
  answerForm!: FormGroup;
  inputValues: string[] = [];

  constructor(
    private readonly supabase: SupabaseService,
    private questionsService: QuestionsService,
    private appcomponent: AppComponent,
    private fb: FormBuilder
  ) {  }

  ngOnInit() {
    this.session = this.appcomponent.session;

    this.answerForm = this.fb.group({
      answers: this.fb.array([
        this.createAnswer()
      ])
    });
  }

  createAnswer(): FormControl {
    return this.fb.control('');
  }

  addAnswer() {
    const answers = this.answerForm.get('answers') as FormArray;
    answers.push(this.createAnswer());
  }

  get answersControls(): FormControl[] {
    return (this.answerForm.get('answers') as FormArray).controls.map(control => control as FormControl);
  }

  updateAnsType(value: string) {
    this.selectedAnsType = value;
  }

  createQuestion(question: string, answer_type: string) {
    this.questionsService.createQuestion({ question, answer_type }).subscribe(gambas => {

      if (answer_type === 'radio') {
        this.answersControls.forEach((control, index) => {
          this.inputValues.push(control.value);
    
          const answer_option = control.value;
          this.questionsService.addAnswerOptions({ answer_option }).subscribe(data => {
            this.createQuestionAnswerOption(data.id, gambas.id);
          });
        });
      }
    });
  }

  createQuestionAnswerOption(answer_option_id: number, question_id: number) {
    this.questionsService.createQuestionAnswerOption({ answer_option_id, question_id }).subscribe(data => {
      
    });
  }
}