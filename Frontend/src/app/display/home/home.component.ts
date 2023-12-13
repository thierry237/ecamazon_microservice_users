import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IAddress } from 'src/app/_interfaces/address';
import { ICard } from 'src/app/_interfaces/card';
import { IUser } from 'src/app/_interfaces/user';
import { AddressService } from 'src/app/_services/address.service';
import { CardService } from 'src/app/_services/card.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  idUser!: number;
  isAdmin: boolean = false;
  message_error!: string | null;
  error_card!: string | null;
  error_address!: string | null;
  username: string = '';


  addresses: IAddress[] = [];
  cards: ICard[] = [];

  user: IUser = {
    idUser: 0,
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    createdAt: '',
    isAdmin: false
  }

  cardsWithUser: any[] = [];
  addressesWithUser: any[] = [];

  constructor(private activatedroute: ActivatedRoute,
    private addressservice: AddressService,
    private cardservice: CardService,
    private userservice: UserService,
    private tokenservice: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    //récupération des informations de l'utilisateur connecté
    this.idUser = this.tokenservice._idUser();
    this.isAdmin = this.tokenservice.isAdmin();

    if (this.idUser) {
      //on affiche les cards liés à l'utilisateur 
      this.listCard();
      this.listAddress();
      this.userservice.getUserById(this.idUser).subscribe(
        data => {
          this.username = data.username;
        }
      )

    }

  }


  logoutUser() {
    this.tokenservice.logout();
    this.router.navigate(['']);
  }

  editUser() {
    console.log(this.idUser)
    this.router.navigate(['/user/edit/', this.idUser])
  }


  listAddress() {
    this.addressservice.getListAddress(this.idUser).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante

      })
    ).subscribe(
      (data) => {
        this.addresses = data,
          console.log(data),
          this.addresses.forEach(address => {
            if (address.idUser !== undefined) {
              this.userservice.getUserById(address.idUser).subscribe(
                user => {
                  this.addressesWithUser.push({ ...address, user }); //operateur de spread, permet de fusionner les objets
                }
              )
            }

          })
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;

          //Gestion d'erreur
          if (errorMessage == "Unauthorized") {
            this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }

          if (errorMessage == "addresses not found") {
            this.error_address = "Pas encore d'adresses!"
          }
        }
      }
    )
  }

  listCard() {
    this.cardservice.getListCard(this.idUser).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante

      })
    ).subscribe(
      (data) => {
        this.cards = data,
          console.log(data),
          this.cards.forEach(card => {
            if (card.idUser !== undefined) {
              this.userservice.getUserById(card.idUser).subscribe(
                user => {
                  this.cardsWithUser.push({ ...card, user }); //operateur de spread, permet de fusionner les objets
                }
              )
            }

          })
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;

          //Gestion d'erreur
          if (errorMessage == "Unauthorized") {
            this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";

          }
          if (errorMessage == "Card not found") {
            this.error_card = "Pas encore de cartes!"
          }
        }
      }
    )
  }

  deleteAccount() {
    this.userservice.deleteUserById(this.idUser).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      }
    )
  }


  deleteAddress(idAddress: number) {
    this.addressservice.deleteAddress(idAddress).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante

      })
    ).subscribe(
      (data) => {
        console.log(data),
          this.cardsWithUser = []; // Vider le tableau
        this.addressesWithUser = []; // Vider le tableau
        this.listCard()
        this.listAddress();

      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;


          if (errorMessage == "Unauthorized") {
            this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }

          if (errorMessage == "address not found") {
            this.message_error = "Aucune adresse trouvée";
          }
        }
      }
    )
  }

  deleteCard(idCard: number) {
    this.cardservice.deleteCard(idCard).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante

      })
    ).subscribe(
      (data) => {
        console.log(data),
          this.cardsWithUser = []; // Vider le tableau
        this.addressesWithUser = []; // Vider le tableau
        this.listCard()
        this.listAddress();

      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;


          if (errorMessage == "Unauthorized") {
            this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }

          if (errorMessage == "card not found") {
            this.message_error = "Aucune carte trouvée";
          }
        }
      }
    )
  }

}
