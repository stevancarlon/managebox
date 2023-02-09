import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../User';
import {BehaviorSubject, Observable, Subject } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  private apiUrl = 'http://192.168.2.110:3000/users'

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('username')
    this._isLoggedIn$.next(!!token)
   }

  registerUser(user: User) {
    return this.http.post<User>(this.apiUrl, user, httpOptions)
  }

  getUsers() {
    return this.http.get<any[]>(this.apiUrl)
  }

  

  updateSingleUser(id: any, user: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, user, httpOptions)
  }

  login(username: string) {
    
    localStorage.setItem('username', username)
    this._isLoggedIn$.next(true)
    
  }

  logout() {
    localStorage.removeItem('username')
    this._isLoggedIn$.next(false)
  }

  loginStatus() {
    return this._isLoggedIn$
  }

  // onLogin() {
  //   return this.subjectLoginStatus.asObservable()
  // }

}
