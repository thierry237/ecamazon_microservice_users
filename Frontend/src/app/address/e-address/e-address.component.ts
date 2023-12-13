import { ActivatedRoute } from '@angular/router';
import { IAddress } from './../../_interfaces/address';
import { Component } from '@angular/core';
import { AddressService } from 'src/app/_services/address.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-e-address',
  templateUrl: './e-address.component.html',
  styleUrls: ['./e-address.component.css']
})
export class EAddressComponent {
  message_error!: string | null;
  message_auth!: string | null;
  modificationValide: boolean = false;
  idUser!: number;

  address: IAddress = {
    typeAddress: '',
    country: '',
    city: '',
    street: '',
    postalCode: 0
  }

  addressTypes: string[] = []; // Liste des types d'adresse disponibles


  constructor(private activatedroute: ActivatedRoute,
    private addressservice: AddressService,
    private tokenservice: TokenService) { }

  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.updateAddressTypes();
    let idAddress = this.activatedroute.snapshot.params['id'];
    this.addressservice.getAddressById(idAddress).subscribe(
      (data) => {
        this.address = data;
        this.address.typeAddress = data.typeAddress;
        console.log(this.address.typeAddress)
      },
      (error) => {
        console.log(error);
      }
    )

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

        }
        console.log(this.addressTypes);

      },
      (error) => {
        console.error(error);

      }
    );
  }

  clearUsernameError() {
    this.message_error = null;
  }

  updateAddress(): void {
    this.addressservice.editAddress(this.address).pipe(
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
          if (errorMessage == "address already exists") {
            this.message_error = "Cette adresse existe déjà";
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
