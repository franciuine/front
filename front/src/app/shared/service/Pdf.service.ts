import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from './Global';

@Injectable({ providedIn: 'root' })
export class PdfService {

    apiUrl = baseURL + "/pdf";

    constructor(
        private httpClient: HttpClient
    ) { }

    public getPdf(filename: string) {
        return this.httpClient.get(this.apiUrl + "/get/" + filename);
    }

    public savePdf(file: FormData, filename: string) {
        return this.httpClient.post(baseURL + "/pdf/add/" + filename, file ,{responseType:'text'});
    }


}
