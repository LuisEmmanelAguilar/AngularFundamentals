import {Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
            <img [src]="imageUrl"] />
            <table>
                <tr>
                    <td [attr.colspan]="colSpan"]> </td>
                </tr>
            </table>
`
})

export class CoursesComponent {
    imageUrl = "http//lorempixel.com/400/200";
    colSpan = 2;
}