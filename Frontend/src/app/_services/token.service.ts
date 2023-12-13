import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITokenPayload } from '../_interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }
  decodedToken: ITokenPayload = {
    idUser: 0,
    isAdmin: false,
    username: 'admin',
    iat: 1,
    exp: 2
  }

  //sauvegarder le token
  saveToken(token: string): void {
    localStorage.setItem('token', token)
    this.router.navigate(['home'])
  }

  //vérifie si un token est présent, retourne un booléen
  isLogged(): boolean {
    const token = localStorage.getItem('token')
    return !!token
  }

  //recuperer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //recuper le statut de isAdmin de l'utilisateur connecté
  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
    return this.decodedToken.isAdmin
  }

  //recuperer l'id de l'utilisateur connecté
  _idUser(): number {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }

    return this.decodedToken.idUser
  }

  //recupèrer l'username de l'utilisateur connecté
  getUsername(): string {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
    return this.decodedToken.username
  }
  // supprime le token une fois déconnecté
  logout() {
    localStorage.removeItem('token');
  }


}
