import {Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
            <div (click)="onDivClicked()">
                <button (click)="onSave()">Primary</button>
            </div>
            `
})

export class CoursesComponent {
    onDivClicked() {
        console.log("Div was clicked");
    }
    
    onSave(){
        console.log("Button was clicked");
    }
}