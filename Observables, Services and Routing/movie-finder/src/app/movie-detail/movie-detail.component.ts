import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {
 myMovie : Object;

  constructor(private route: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        let id = +params.id; // params['id']

        this.movieService.getMovie(id).subscribe(selectedMovie => {
          this.myMovie = selectedMovie
        })
      });
  }

}
