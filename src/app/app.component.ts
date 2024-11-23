import {Component, computed, inject, Signal} from '@angular/core';
import {MovieItemComponent} from './movie-item/movie-item.component';
import {Movie} from './model/movie.model';
import {MoviesService} from './services/movies.service';
import {HighlightDirective} from './highlight.directive';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: 'app.component.html',
  imports: [
    MovieItemComponent, HighlightDirective
  ]
})
export class AppComponent {
  protected movies: Signal<Movie[]> = inject(MoviesService).getMovies();
  private _favoriteService = inject(FavoritesService);
  private _favorites = this._favoriteService.getFavorites();

  public setFavorite(movie: Movie): void {
    this._favoriteService.toggleFavorite(movie);
  }

  public isFavorite(movie: Movie): Signal<boolean> {
    return  computed(() => !!(this._favorites().find((m) => m.id === movie.id)));
  }
}
