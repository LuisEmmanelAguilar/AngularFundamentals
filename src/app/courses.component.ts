import {Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
                <button type="button" class="btn btn-primary" [class.active]="isActive">Primary</button>
            `
})

export class CoursesComponent {
    isActive = true;
}