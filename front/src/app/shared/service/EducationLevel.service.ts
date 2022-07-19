import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EducationLevelService {

    apiUrl = 'http://localhost:8080/v1/levels';
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

    public getById(id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/" + id);
    }

}