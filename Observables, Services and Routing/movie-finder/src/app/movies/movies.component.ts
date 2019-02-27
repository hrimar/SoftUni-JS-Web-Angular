import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../service/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular: Movie;
  theaters: Movie;
  kids: Movie;
  dram: Movie; // Array<Movie>
  searchResults: any;
  isSearch: boolean;

  constructor(private movieService: MoviesService) { }

  // for search form:
  search(myQuery) {
    let value = myQuery['search'];

    this.movieService.findAMovie(value).subscribe(data => {
      this.searchResults = data;
      console.log(this.searchResults);
      
      if(this.searchResults.results.length > 0){
        this.isSearch = true;
      }
    });
  }

  ngOnInit() {
    this.movieService.getPopular()
      .subscribe(data => {
        this.popular = data;
        // console.log(this.popular);
      });

    this.movieService.getTheater()
      .subscribe(data => {
        this.theaters = data;
        console.log(this.popular);
      });

    this.movieService.getKids()
      .subscribe(data => {
        this.kids = data;
        // console.log(this.popular);
      });


    this.movieService.getDram()
      .subscribe(data => {
        this.dram = data;
        // console.log(this.popular);
      });
  }

}
