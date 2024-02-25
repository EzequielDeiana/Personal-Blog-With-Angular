import { Injectable } from '@angular/core';
import { Publication } from './publication';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const publications = [
    {id:0 , name: 'John Doe', text:'Lorem ipsum dolor sit amet consectetur adipiscing elit per taciti, pharetra pretium quis dictum sed risus eros porttitor malesuada scelerisque, ad et vivamus auctor ultrices turpis duis cursus. Feugiat vitae dis ultrices nec pretium cursus at quisque mus, nascetur diam posuere suscipit ante gravida quam penatibus natoque, eros velit et aliquam tristique volutpat in lacinia. Urna lectus magna penatibus sagittis nam aptent diam sodales, dignissim porttitor platea primis dui proin consequat pellentesque nunc, laoreet nibh posuere sociis eu orci tortor.'},
    {id:1 , name: 'Lotus Juice', text:'Right here, Shadow 10 oclock direction Seize the moment, destroy the nation Your rhyme is slow motion, give me motivation Freaked out now, and dead on arrival (What?)'}
    ];
    return {publications};
  }
  
  genId(publications: Publication[]): number{
    return publications.length > 0 ? Math.max(...publications.map(publication => publication.id)) + 1 : 0;
  }
}
