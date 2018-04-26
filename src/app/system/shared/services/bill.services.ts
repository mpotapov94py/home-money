import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Bill } from "../models/bill.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BillService {
    constructor(private http: Http) {}

    public getBill(): Observable<Bill> {
        return this.http.get('http://localhost:3000/bill')
                .map((response: Response) => response.json()); 
    }

    public getCurrency(): Observable<any> {
        return this.http.get('http://data.fixer.io/api/latest?access_key=ac592fad1f445a32beed83f5405bad7c')
        .map((response: Response) => response.json());
    }
}