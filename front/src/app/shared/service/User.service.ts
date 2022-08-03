import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class UserService {

    apiUrl = 'http://localhost:8080/v1/users';
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

    public save(user: User): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl, user, this.httpOptions);
    }

    public login() {
        let username='admin'
        let password='admin'
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get("http://localhost:8080/login",{headers});
    }

}