import { Component, computed, inject, Signal } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MoviesService } from '../services/movies.service';
import { FavoritesService } from '../services/favorites.service';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { HighlightDirective } from '../highlight.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieItemComponent, HighlightDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected movies: Signal<Movie[]> = inject(MoviesService).getMovies();
  private _favoriteService = inject(FavoritesService);
  private _favorites = this._favoriteService.getFavorites();

  public isFavorite(movie: Movie): Signal<boolean> {
    return computed(() => !!this._favorites().find((m) => m.id === movie.id));
  }
}
