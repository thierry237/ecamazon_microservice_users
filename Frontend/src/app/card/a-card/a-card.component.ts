import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ICard } from 'src/app/_interfaces/card';
import { CardService } from 'src/app/_services/card.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-a-card',
  templateUrl: './a-card.component.html',
  styleUrls: ['./a-card.component.css']
})
export class ACardComponent {
  message_error!: string | null;
  message_auth!: string | null;
  idUser!: number;
  ajoutValide: boolean = false;
  card: ICard = {
    methodPayment: '',
    cardNumber: '',
    nameCard: '',
    expiredDate: '',
    cvv: 0
  }

  cardTypes: string[] = [];

  constructor(private cardservice: CardService,
    private tokenservice: TokenService) { }
  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.updateCardTypes();

  }

  clearUsernameError() {
    this.message_error = null;
  }

  updateCardTypes() {
    this.cardservice.getListCard(this.idUser).subscribe(
      (data) => {
        const hasVisa = data.some((card) => card.methodPayment === 'Visa');
        const hasMasterCard = data.some((card) => card.methodPayment === 'MasterCard');

        if (hasVisa && !hasMasterCard) {
          this.cardTypes = ['MasterCard'];
        } else if (hasMasterCard && !hasVisa) {
          this.cardTypes = ['Visa'];
        } else {
          this.cardTypes = ['Visa', 'MasterCard'];
        }
        console.log(this.cardTypes);

      },
      (error) => {
        console.error(error);
        this.cardTypes = ['Visa', 'MasterCard'];
      }
    );
  }

  onSubmit() {

    this.cardservice.addCard(this.card).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      (data) => {
        console.log(data),
          this.ajoutValide = true
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;
          console.log(errorMessage);
          if (errorMessage == "visa card already exists") {
            this.message_error = "vous avez deja ajouté une carte Visa";
          }
          if (errorMessage == "MasterCard already exists") {
            this.message_error = "vous avez deja ajouté une MasterCard";
          }
          if (errorMessage == "Unauthorized") {
            this.message_auth = "Veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }
        }
      }
    )

  }
}
