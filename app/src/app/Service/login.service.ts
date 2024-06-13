import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../dto/user.dto';
import { Token } from '../dto/token.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser } from '../dto/registerUser.dto';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public UserId:BehaviorSubject<string>=new BehaviorSubject<string>("");
  public IsLogged=false;
    constructor(private httpClient: HttpClient) { }

    userLogin(user:User): Observable<Token> {
      console.log(user);
      return this.httpClient.post<Token>("http://localhost:3000/auth/login",user)
    }

    setUserId(userId:string)
    {
      this.UserId.next(userId);
    }
   
    register(username: string,email:string, password: string): Observable<any> {
      return this.httpClient.post<any>(`http://localhost:3000/auth/register`, { username,email, password });
    }
  
}
