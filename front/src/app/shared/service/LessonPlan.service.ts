import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LessonPlan } from '../model/LessonPlan';
import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class LessonPlanService {

    apiUrl = 'http://localhost:8080/lessonplan';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    public getAll(): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/all");
    }

    public getAllEnabled(): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/all/enabled");
    }

    public getLessonsByUser(user: String): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/all/by/user/" + user);
    }

    public postLesson(lesson: LessonPlan): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + "/add", lesson, this.httpOptions);
    }
    public getById(id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/" + id);
    }

    public deleteLesson (id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/delete/" + id);
    }

}