import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojipickerComponent } from './emojipicker/emojipicker';
import { QuestionListComponent } from './question-list/question-list';
// import { QuestionListComponent } from './question-list/question-list';
@NgModule({
	declarations: [EmojipickerComponent,
    QuestionListComponent,
	// QuestionListComponent
],
	imports: [IonicPageModule .forChild(EmojipickerComponent),],
	exports: [EmojipickerComponent,
    QuestionListComponent,
	// QuestionListComponent
]
})
export class ComponentsModule {}
