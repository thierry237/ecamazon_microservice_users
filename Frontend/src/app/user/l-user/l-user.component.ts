import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/_interfaces/user';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-l-user',
  templateUrl: './l-user.component.html',
  styleUrls: ['./l-user.component.css']
})
export class LUserComponent {
  users: IUser[] = [];
  idUser!: number;
  isAdmin!: boolean;
  message_auth!: string | null;
  message_error!: string | null;
  searchUser: string = '';
  user: IUser = {
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  //injections des services dans le constructeur
  constructor(
    private userservice: UserService,
    private activatedroute: ActivatedRoute,
    private tokenservice: TokenService,
    private router: Router
  ) { }

  //éxecuter au demarrage du composant
  ngOnInit(): void {
    //récupération de la variable isAdmin de l'utilisateur connecté
    this.idUser = this.tokenservice._idUser();
    this.isAdmin = this.tokenservice.isAdmin();

    //service pour afficher la liste des utilisateurs
    this.userservice.getAllUsers().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      data => {
        this.users = data;
        console.log(this.users)
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;

          //Gestion de l'erreur
          if (errorMessage == "Unauthorized") {
            this.message_auth = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_auth)
          }
        }
      }

    )
  }
  //ajouter un utilisateur en tant qu'admin
  addAdmin(idUser: number) {
    this.userservice.getUserById(idUser).subscribe(
      data => {
        this.user = data;
        this.user.isAdmin = !this.user.isAdmin;
        console.log(this.user);
        this.userservice.editUser(this.user).subscribe(
          data => {
            console.log(data);
            this.userservice.getAllUsers().subscribe(
              data => {
                this.users = data;
              },
              err => console.log(err)

            )
          }
        )

      })
  }

  //supprimer un utilisateur
  deleteUser(idUser: number) {
    this.userservice.deleteUserById(idUser).subscribe(
      data => {
        console.log(data);
        this.users = [];
        this.userservice.getAllUsers().subscribe(
          data => {
            this.users = data;
          },
          err => console.log(err)

        )
      }
    )
  }
  //deconnecter l'utilisateur
  logoutUser() {
    this.tokenservice.logout();
    this.router.navigate(['']);
  }
  //rechercher un utilisateur
  searchUserAPI() {
    console.log(this.user.idUser, this.isAdmin);

    this.userservice.filterUser(this.searchUser).subscribe(
      data => {
        if (data) {
          this.users = data;
        }

      },
      err => {
        console.log(err);
      }
    );
    this.router.navigateByUrl('/user?search=' + this.searchUser);
  }

  //appeler lorsqu'il y a changement dans la barre de recherche
  onSearchChange(): void {
    //si la barre de recherche est vide, la liste des utilisateurs est afficher
    if (this.searchUser === '') {
      this.userservice.getAllUsers().pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante

        })
      ).subscribe(
        (data) => {
          console.log(data),
            this.users = data;
        },
        (error: HttpErrorResponse) => {
          if (error && error.error && error.error.message) {
            const errorMessage: string = error.error.message;

            //gestion d'erreur de connexion 
            if (errorMessage == "Unauthorized") {
              this.message_auth = "Session terminée! veuillez vous reconnecter de nouveau";
              console.log(this.message_auth)
            }
          }
        }
      )
    }
  }
}
