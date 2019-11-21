import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Course } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const courses = [
      {
        id:11,
        name: "OS",
        credits:"4",
        description:"Linux OS",
        image: "assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      },
      {
        id:12,
        name: "WT",
        credits:"4",
        description:"HTTP",
        image:"assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      },
      {
        id:13,
        name: "OS",
        credits:"4",
        description:"Linux OS",
        image: "assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      },
      {
        id:14,
        name: "WT",
        credits:"4",
        description:"HTTP",
        image:"assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      },
      {
        id:15,
        name: "OS",
        credits:"4",
        description:"Linux OS",
        image: "assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      },
      {
        id:16,
        name: "WT",
        credits:"4",
        description:"HTTP",
        image:"assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      },
      {
        id:17,
        name: "OS",
        credits:"4",
        description:"Linux OS",
        image: "assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      },
      {
        id:18,
        name: "WT",
        credits:"4",
        description:"HTTP",
        image:"assets/linux.jpeg",
        documents:[
          "Introduction.pdf",
          "Syllabus.pdf"
        ]
      }
    ];
    return {courses};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(courses: Course[]): number {
    return courses.length > 0 ? Math.max(...courses.map(course => course.id)) + 1 : 11;
  }
}
