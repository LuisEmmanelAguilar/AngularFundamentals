import {Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
                <h2>{{ title }}</h2><!--String Interpolation-->
                <h2 [textContent]="title"></h2><!--Property Binding-->

                <img src="{{ imageUrl }}"/>
                <img [src]="title" />
            `
})

export class CoursesComponent {
    title ="List of courses";
    imageUrl = "http//lorempixel.com/400/200";
}