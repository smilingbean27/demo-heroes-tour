import { Component, OnInit } from '@angular/core';
import { HeroesDataService } from '../heroes-data.service';
import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topHeroes: Hero[] = [];

  constructor(private heroService: HeroesDataService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.topHeroes = heroes.sort((a, b)=> a.rank - b.rank).slice(0, 4);
    });
  }

}
