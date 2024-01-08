import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { IAddress } from '../_interfaces/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string = 'http://127.0.0.1:8004'

  baseUrlShipping: string = 'http://shipping:8002';
  constructor(private http: HttpClient) { }

  // Récupérer les adresses d'un utilisateur spécifique
  getAddressesByUserId(userId: number): Observable<IAddress[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const url = `${this.baseUrlShipping}/addresses/${userId}`;

    return this.http.get<IAddress[]>(url, { headers: headers })
      .pipe(
        map((addresses) => {
          // Traitement des adresses récupérées
          console.log('Adresses récupérées avec succès:', addresses);
          return addresses;
        }),
        catchError((error) => {
          // Gérer les erreurs HTTP ici
          console.error('Erreur HTTP:', error);
          throw error;
        })
      );
  }

  //liste des addresses d'un user
  getListAddress(idUser: number): Observable<IAddress[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IAddress[]>(this.baseUrl + '/user/' + idUser + '/addresses', { "headers": headers })
  }

  //ajouter address
  addAddress(address: IAddress): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(this.baseUrl + '/address', address, { "headers": headers })
  }

  //supprimer address
  deleteAddress(idAddress: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete<any>(this.baseUrl + '/address/' + idAddress, { "headers": headers })
  }
  //address précis via l'id
  getAddressById(idAddress: number): Observable<IAddress> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IAddress>(this.baseUrl + '/address/' + idAddress, { "headers": headers })
  }

  //modifier address
  editAddress(address: IAddress): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/address/' + address.idAddress, address, { "headers": headers })
  }

}
