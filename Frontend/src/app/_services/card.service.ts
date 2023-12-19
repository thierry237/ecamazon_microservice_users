import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from '../_interfaces/card';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl: string = 'http://127.0.0.1:8004'

  /*baseUrl : string = 'http://localhost:8002'
  //ajouter une cart
  addCard(card: ICard): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(this.baseUrl + '/card', card, { "headers": headers })
  } */


  constructor(private http: HttpClient) { }

  //liste des cards d'un user
  getListCard(idUser: number): Observable<ICard[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<ICard[]>(this.baseUrl + '/user/' + idUser + '/cards', { "headers": headers })
  }

  //ajouter une cart
  addCard(card: ICard): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(this.baseUrl + '/card', card, { "headers": headers })
  }

  //supprimer card 
  deleteCard(idCard: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete<any>(this.baseUrl + '/card/' + idCard, { "headers": headers })
  }
  //card précis via l'id
  getCardById(idCard: number): Observable<ICard> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<ICard>(this.baseUrl + '/card/' + idCard, { "headers": headers })
  }

  //modifier une carte
  editCard(card: ICard): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/card/' + card.idCard, card, { "headers": headers })
  }
}
