import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesDataService {
  
  private heroesURL: string = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }
  
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesURL)
    .pipe(
      tap(_ => console.log('Fetched Results')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  private handleError<T>(operation = 'operation', result ?: []){
    return (error: any): Observable<T>=> {
      console.log('Error:', error);
      return of(result as unknown as T);
    }
  }

  getHeroById(id: number): Observable<Hero>{
    const url = `${this.heroesURL}/${id}}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => console.log(`Fetched Result of Hero with id: ${id}`)),
      catchError(this.handleError<Hero>('getHeroes', []))
    )
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesURL, hero, this.httpOptions)
    .pipe(
      tap(_=> console.log(`Updated Hero id:${hero.id}`)),
      catchError(this.handleError<any>('UpdateHero'))
    )
  }

  addHero(hero: Hero ): Observable<Hero>{
    return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions)
    .pipe(
      tap( hero => console.log(`Added Hero id:${hero.id}`)),
      catchError(this.handleError<any>('Not able to add Hero'))
    )
    
  }

  deleteHero(hero: Hero): Observable<Hero>{
    const url = `${this.heroesURL}/${hero.id}`;
    console.log(hero);
    return this.http.delete<Hero>(this.heroesURL, this.httpOptions)
    .pipe(
      tap( hero => console.log(`Deleted Hero id:${hero.id}`)),
      catchError(this.handleError<any>('Not able to delete Hero'))
    )

  }

  searchHero(term: string): Observable<Hero[]>{
    if (!term.trim()){
      console.log('No seaching Term');
      return of([]);
    }
    else{
      return this.http.get<Hero[]>(`${this.heroesURL}/?name=${term}`)
      .pipe(
        tap(heroes => {
          (heroes.length > 0) ?
          console.log('Heroes found'): 
          console.log('No heroes found');
        }),
        catchError(this.handleError<any>('Something bad happend while searching for heroes'))
      ) 
    }
  }
  
}
