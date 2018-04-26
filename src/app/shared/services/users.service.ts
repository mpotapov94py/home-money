import { Injectable } from "@angular/core";
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';


@Injectable()
export class UsersService {

    private url: string = 'http://localhost:3000/';
    constructor(private http: Http) {}

    public getUserByEmail(email: string): Observable<User> {
        return this.http.get( `http://localhost:3000/users?email=${email}` )
                        .map((response:Response) => response.json())    
                        .map( (user: User) => user[0]? user[0] : undefined)  
    }

    public createNewUser(user: User): Observable<User> {
       return this.http.post('http://localhost:3000/users', user)
                       .map((responce: Response) => responce.json());
    }
}