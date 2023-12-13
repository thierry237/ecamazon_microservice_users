import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IAddress } from 'src/app/_interfaces/address';
import { AddressService } from 'src/app/_services/address.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-a-address',
  templateUrl: './a-address.component.html',
  styleUrls: ['./a-address.component.css']
})
export class AAddressComponent {
  message_error!: string | null;
  message_auth!: string | null;
  idUser!: number;
  ajoutValide: boolean = false;
  address: IAddress = {
    typeAddress: '',
    country: '',
    city: '',
    street: '',
    postalCode: 0
  }

  addressTypes: string[] = [];

  constructor(private addressservice: AddressService,
    private tokenservice: TokenService) { }
  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.updateAddressTypes();

  }

  clearUsernameError() {
    this.message_error = null;
  }

  updateAddressTypes() {
    this.addressservice.getListAddress(this.idUser).subscribe(
      (data) => {
        const hasLivraison = data.some((address) => address.typeAddress === 'livraison');
        const hasFacturation = data.some((address) => address.typeAddress === 'facturation');

        if (hasLivraison && !hasFacturation) {
          this.addressTypes = ['facturation'];
        } else if (hasFacturation && !hasLivraison) {
          this.addressTypes = ['livraison'];
        } else {
          this.addressTypes = ['facturation', 'livraison'];
        }
        console.log(this.addressTypes);

      },
      (error) => {
        console.error(error);
        this.addressTypes = ['facturation', 'livraison'];
      }
    );
  }

  onSubmit() {
    this.addressservice.addAddress(this.address).pipe(
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
          if (errorMessage == "billing address already exists") {
            this.message_error = "vous avez deja défini l'adresse de facturation";
          }
          if (errorMessage == "delivery address already exists") {
            this.message_error = "vous avez deja défini l'adresse de livraison";
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
