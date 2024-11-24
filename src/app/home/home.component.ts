import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MoviesService } from '../services/movies.service';
import { FavoritesService } from '../services/favorites.service';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { HighlightDirective } from '../highlight.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieItemComponent, HighlightDirective, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected movies: Signal<Movie[]> = inject(MoviesService).getMovies();
  public filteredMovies: Signal<Movie[]>;
  private _favoriteService = inject(FavoritesService);
  private _favorites = this._favoriteService.getFavorites();
  private _formBuilder = inject(FormBuilder);
  public form: FormGroup;

  ngOnInit(): void {
    this._setUpForm();
    this.filteredMovies = computed(() => this.movies());
  }
  public isFavorite(movie: Movie): Signal<boolean> {
    return computed(() => !!this._favorites().find((m) => m.id === movie.id));
  }

  private _setUpForm(): void {
    this.form = this._formBuilder.group({
      title: [''],
      releaseYear: [''],
    });
    this._setUpFormSubscription();
  }

  private _setUpFormSubscription(): void {
    this.form.valueChanges.subscribe((value) => {
      this.filteredMovies = computed(() =>
        this.movies().filter((movie) => {
          const titleMatch =
            !value.title ||
            movie.title.toLowerCase().includes(value.title.toLowerCase());
          const yearMatch =
            !value.releaseYear ||
            movie.release_date.toString().includes(value.releaseYear);
          return titleMatch && yearMatch;
        })
      );
    });
  }
}
