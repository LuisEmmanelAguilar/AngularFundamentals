import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-course-form-array',
  templateUrl: './new-course-form-array.component.html',
  styleUrls: ['./new-course-form-array.component.css']
})
export class NewCourseFormArrayComponent {

  form = new FormGroup({
    topics: new FormArray([])
  });

  addTopic(topic: HTMLInputElement) {
    this.topics.push(new FormControl(topic.value));
    topic.value='';
  }
  
  get topics() {
    return this.form.get('topics') as FormArray;
  }

  removeTopic(topic: any) {
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }
}
