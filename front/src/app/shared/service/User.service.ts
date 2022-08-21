import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { baseURL } from './Global';

@Injectable({ providedIn: 'root' })
export class UserService {

    apiUrl = baseURL + "/user";

    
    constructor(
        private httpClient: HttpClient
    ) { }

    public getAll(): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/all");
    }

    public getById(id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/" + id);
    }

    public findByUsername(username: string): Observable<any>{
        return this.httpClient.get(this.apiUrl + "/get/user/" + username);
    }

    public save(user: User): Observable<any> {
        console.log(user);
        return this.httpClient.post<any>(this.apiUrl + "/save", user);
    }


    public loggedUser(token: string) {
        return this.httpClient.get(this.apiUrl + "/currentuser", {responseType:'text' ,headers: {Authorization: 'Bearer ' + token} 
        });
    }


    public login(username:string, password: string) {
        return this.httpClient.post(baseURL + "/login", {username: username, password: password}, {responseType: 'text'});
    }

    public logout() {
        return this.httpClient.get(baseURL + "/logout");
    }

}