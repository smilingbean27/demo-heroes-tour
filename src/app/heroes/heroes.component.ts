import { Component, OnInit } from '@angular/core';
import { HeroesDataService } from '../heroes-data.service';
import { Hero } from './hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  hero: Hero = {id: 0, name: '', rank: 0};

  constructor(private heroService: HeroesDataService) {}

  ngOnInit(): void {
    this.heroService.getHeroes()
    .subscribe(heroes=>{
      this.heroes = heroes;
    });
  }

  onClick(val: Hero){
    this.hero = val;
  }

  add(name: string, rank: string){
    name = name.trim(); 
    const newRank = Number(rank);
    if (!name || !rank){return;}
    this.heroService.addHero({name, rank: newRank } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }
}
