import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../user.model';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class DataAccessServiceService {

  API = 'http://localhost:3000/user';


  constructor(private http :HttpClient) { }

  login(email: string, password: string):Observable<User|null >{
      return this.http.get<User[]>(`${this.API}?email=${email}&password=${password}`).pipe(
              map(users => users.length>0 ? users[0] : null),
              catchError(error => {
                console.log('Login erorr' + error);
                return of(null);
              })
      )           
  }
}
