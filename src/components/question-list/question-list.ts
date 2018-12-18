import { Component } from '@angular/core';

/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent {

  text: string;

  constructor() {
    console.log('Hello QuestionListComponent Component');
    this.text = 'Hello World';
  }

}
