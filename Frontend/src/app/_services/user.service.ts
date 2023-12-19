import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../_interfaces/user';
import { ICard } from '../_interfaces/card';
import { IAddress } from '../_interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://127.0.0.1:8004'

  constructor(private http: HttpClient) { }

  //trouver un utilisateur précis via l'id
  getUserById(idUser: number): Observable<IUser> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IUser>(this.baseUrl + '/user/' + idUser, { "headers": headers })
  }
  //liste des utilisateurs
  getAllUsers(): Observable<IUser[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IUser[]>(this.baseUrl + '/users', { "headers": headers })
  }

  //supprimer un utilsateur
  deleteUserById(idUser: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete<any>(this.baseUrl + '/user/' + idUser, { "headers": headers })
  }

  //modifier un utilisateur vers admin
  editUser(user: IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/user/admin/' + user.idUser, user, { "headers": headers })
  }

  //modifier utilisateur
  editProfil(user: IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/user/' + user.idUser, user, { "headers": headers })
  }

  //chercher un utilisateur
  filterUser(username: string): Observable<IUser[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    const body = { username: username };
    return this.http.post<IUser[]>(`${this.baseUrl}/user/search`, body, { "headers": headers }).pipe(
      map((users: IUser[]) => users.filter(user => user.username.toLowerCase().startsWith(username.toLowerCase())))
    )
  }


  getUserCards(idUser: number): Observable<ICard[]> {
    // Appel au backend pour récupérer les cartes de l'utilisateur
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<ICard[]>(this.baseUrl + `/user/${idUser}/cards`, { headers });
  }

  getUserAddresses(idUser: number): Observable<IAddress[]> {
    // Appel au backend pour récupérer les adresses de l'utilisateur
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IAddress[]>(this.baseUrl + `/user/${idUser}/addresses`, { headers });
  }

}
