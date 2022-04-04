import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any = null;
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackBar: MatSnackBar, public router: Router) { }
  
ngOnInit(): void {
  this.getMovies();
  this.getCurrentUser();
}

/**
 *  Use Api call to get data of all movies
 * @function getAllMovies
 * @returns movies in JSON format
 */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * open a dialog to display the DirectorCardComponent
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {Name: name, Bio: bio, Birth: birth},
      width: '500px',
    });
  }
  
  /**
   * open a dialog to display the GenreCardComponent
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }
  /**
   * open a dialog to display the SynopsisCardComponent
   * @param title {string}
   * @param imagePath {string}
   * @param description {string}
   */
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
   
  }
  /**
   * use API to get current user data
   * @function getCurrentUser()
      */
  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
       
     console.log(resp)
      const currentUser=resp.Username
      console.log(currentUser)
      const currentFavs=resp.FavouriteMovies
      console.log(currentFavs)

    });
  }
  /**
   * use API end-point to add user favorite movie
   * @function addToUserFavs()
   * @param id {string}
   */
  addToUserFavs(id: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavMovie(id).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();
    });
    }

        /**
         * use API end-point to delete user favorite movie
         * @function 
         * @param id DeleteFavs()
         */
    DeleteFavs(id: string): void {
      console.log(id);
        this.fetchApiData.deleteFavMovie(id).subscribe((response: any) => {
        console.log(response);
      });
      
      }
   
}