import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  //standalone: true,
  //imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
   movies: any[] = [];
   user: any = {};
   userData = { Username: "", FavoriteMovies: []};
   FavoriteMovies: any[] = [];
   isFavMovie: boolean = false;

   constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }   

getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
        });
    }   
  
openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
   this.dialog.open(DirectorInfoComponent, {
        data: {
          Name: name,
          Bio: bio,
          Birth: birth,
          Death: death
        },
        width: '450px',
      });
    }

openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
        data: {
          Name: name,
          Description: description,
        },
        width: '450px',
      });
    } 
    
openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisInfoComponent, {
        data: {
          Description: description,
        },
        width: '450px',
      });
    } 
    
getFavMovies(): void { 
      this.user = this.fetchApiData.getUser();
      this.userData.FavoriteMovies = this.user.FavoriteMovies;
      this.FavoriteMovies = this.user.FavoriteMovies;
      console.log('Fav Movies in getFavMovie', this.FavoriteMovies); 
    } 
    
isFav(movie: any): any {
      const MovieID = movie._id;
      if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
        return true;
      } else {
        return false;
      }
    }
    
  toggleFav(movie: any): void {
      const isFavorite = this.isFav(movie);
      isFavorite
        ? this.deleteFavMovies(movie)
        : this.addFavMovies(movie);
    } 
    
addFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavouriteMovies(movie).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.getFavMovies(); 
        this.snackBar.open('Movie has been added to your favorites!', 'OK', {
          duration: 3000,
        });
      });
    } 
    
deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavouriteMovies(movie).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.getFavMovies();
        this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
          duration: 3000,
        });
      });
    }
  }    
