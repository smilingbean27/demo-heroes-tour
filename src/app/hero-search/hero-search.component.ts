import { Component, OnInit } from '@angular/core';
import { HeroesDataService } from '../heroes-data.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';
import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  constructor(private heroService: HeroesDataService) { }

  searchedHeroes: Hero[] = [];

  private searchTerms = new Subject<string>();

  search(term: string){
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string)=> this.heroService.searchHero(term) )
    )
    .subscribe(heroes => this.searchedHeroes = heroes )
  }

}
