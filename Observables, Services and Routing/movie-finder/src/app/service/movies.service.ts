import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';

const apiKey = "4cea3d75112f96cf851b263f265ec7af";

@Injectable()
export class MoviesService {
   path: string = 'https://api.themoviedb.org/3/';
   popular: string = 'discover/movie?sort_by=popularity.desc';
   theaters: string = 'discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22';
   kids: string = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
   dram: string = 'discover/movie?with_genres=18&primary_release_year=2014';
   movie: string = 'movie/';
   authentication: string = '&api_key=';
   movieAuth: string = '?api_key=';
   search:string = 'search/movie';
   searchQuery: string = '?query=';

  constructor(private http: HttpClient) { }

  getPopular() : Observable<Movie> {
    return this.http.get<Movie>(this.path + this.popular + this.authentication + apiKey);
  }

  getTheater() : Observable<Movie> {
    return this.http.get<Movie>(this.path + this.theaters + this.authentication + apiKey);
  }

  getKids() : Observable<Movie> {
    return this.http.get<Movie>(this.path + this.kids + this.authentication + apiKey);
  }

  getDram() : Observable<Movie> {
    return this.http.get<Movie>(this.path + this.dram + this.authentication + apiKey);
  }

  getMovie(id) : Observable<Object> {
    return this.http.get(this.path + this.movie + id + this.movieAuth + apiKey);
  }


  findAMovie(name)  {  
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${apiKey}`);
  }
}
