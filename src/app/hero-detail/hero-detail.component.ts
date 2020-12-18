import { Component, OnInit} from '@angular/core';
import { Hero } from '../heroes/hero';
import { HeroesDataService } from '../heroes-data.service';
import { ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common'
import { Observable} from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero ={id: 0, name: '', rank: 0};
  constructor(private heroService: HeroesDataService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.heroService.getHeroById(id)
    .subscribe(hero => {
      this.hero = hero;
    });
  }

  goBack(){
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(()=> this.goBack());
  }

  

}
