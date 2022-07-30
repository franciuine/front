import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LessonPlan } from '../model/LessonPlan';
import { EducationLevel } from '../model/EducationLevel';
import { Wrapper } from '../model/Wrapper';

@Injectable({ providedIn: 'root' })
export class LessonPlanService {

    apiUrl = 'http://localhost:8080/v1/lessons';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    public getAll(): Observable<any> {
        return this.httpClient.get(this.apiUrl);
    }

    public postLesson(lesson: LessonPlan): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl, lesson, this.httpOptions);
    }

    public getById(id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/" + id);
    }

}