import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ICard } from 'src/app/_interfaces/card';
import { CardService } from 'src/app/_services/card.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-e-card',
  templateUrl: './e-card.component.html',
  styleUrls: ['./e-card.component.css']
})
export class ECardComponent {
  message_error!: string | null;
  message_auth!: string | null;
  modificationValide: boolean = false;
  idUser!: number;

  card: ICard = {
    methodPayment: '',
    cardNumber: '',
    nameCard: '',
    expiredDate: '',
    cvv: 0
  }

  cardTypes: string[] = []; // Liste des types de cartes disponibles


  constructor(private activatedroute: ActivatedRoute,
    private cardservice: CardService,
    private tokenservice: TokenService) { }

  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.updateCardTypes();
    let idCard = this.activatedroute.snapshot.params['id'];
    this.cardservice.getCardById(idCard).subscribe(
      (data) => {
        this.card = data;
        this.card.methodPayment = data.methodPayment;
        console.log(this.card.methodPayment)
      },
      (error) => {
        console.log(error);
      }
    )

  }

  updateCardTypes() {
    this.cardservice.getListCard(this.idUser).subscribe(
      (data) => {
        const hasVisa = data.some((card) => card.methodPayment === 'visa');
        const hasMasterCard = data.some((card) => card.methodPayment === 'masterCard');

        if (hasVisa && !hasMasterCard) {
          this.cardTypes = ['visa'];
        } else if (hasMasterCard && !hasVisa) {
          this.cardTypes = ['masterCard'];
        } else {

        }
        console.log(this.cardTypes);

      },
      (error) => {
        console.error(error);

      }
    );
  }

  clearUsernameError() {
    this.message_error = null;
  }

  updateCard(): void {
    this.cardservice.editCard(this.card).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      (data) => {
        console.log(data);
        this.modificationValide = true
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;
          console.log(errorMessage);
          if (errorMessage == "card already exists") {
            this.message_error = "Cette carte existe déjà";
          }

          if (errorMessage == "Unauthorized") {
            this.message_auth = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }
        }
      }
    );

  }
}
