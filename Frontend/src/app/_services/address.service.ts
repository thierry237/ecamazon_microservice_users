import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../_interfaces/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string = 'http://127.0.0.1:8004'

  /*baseUrl : string = 'http://shipping:8002'
  ajouter address (envoyer cette information à l'équipe shipping)
  addAddress(address: IAddress): Observable<any> {
     const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
      return this.http.post<any>(this.baseUrl + '/address', address, { "headers": headers })
    } 
    
  */


  constructor(private http: HttpClient) { }

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
