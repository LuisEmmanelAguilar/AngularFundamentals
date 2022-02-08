import {Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
                <h2>{{ title }}</h2>
                <ul>
                    <!--Directive *ngFor (one of most)-->
                    <li *ngFor="let course of courses"> 
                        {{ course }}
                    </li>
                </ul>
    `
})

export class CoursesComponent {
    title ="List of courses";
    courses;

    // Dicoupled the class passing as a parameter to the constructor
    constructor(service: CoursesService){
        this.courses = service.getCourses();
    }
}