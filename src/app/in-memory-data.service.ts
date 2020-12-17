import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api'
import { Hero } from './heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    const heroes = [
      { id: 11, name: 'Dr Nice', rank: 10 },
      { id: 12, name: 'Narco', rank: 33 },
      { id: 13, name: 'Bombasto', rank: 9 },
      { id: 14, name: 'Celeritas', rank: 15 },
      { id: 15, name: 'Magneta', rank: 12 },
      { id: 16, name: 'RubberMan', rank: 72 },
      { id: 17, name: 'Dynama', rank: 55 },
      { id: 18, name: 'Dr IQ', rank: 5 },
      { id: 19, name: 'Magma', rank: 90 },
      { id: 20, name: 'Tornado', rank: 8 }
    ]
    return {heroes};
  }

  genId(heroes: Hero[]){
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id))+1 : 11; 
  }
}
