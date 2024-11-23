import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import { Movie } from '../model/movie.model';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _favorites: WritableSignal<Movie[]> = signal([]);

  public toggleFavorite(movie:Movie):void{
    this._favorites.update(favorites => {
      if (favorites.find(fav => fav.id === movie.id))
        return favorites.filter(fav => fav.id !== movie.id)
      return [ ...favorites, movie ];
    });
  }

  public getFavorites(): Signal<Movie[]> {
    return this._favorites.asReadonly();
  }

}
