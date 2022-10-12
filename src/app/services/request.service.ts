import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  merge, Observable} from 'rxjs';
import { map, concatMap, tap, combineLatestAll } from 'rxjs/operators';
import { Drink } from '../models/drink.model';
import Transform from '../libs/helpers/transform.helper';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private toSearch: Observable<any>[] = [];

  constructor(public http: HttpClient) { }

  getData(name: string): Observable<Drink[]>{
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+name).pipe(
      map((resp:any) =>{
        return Transform.transformData(resp.drinks);
      }));
  }

  getPokemon(){
   return this.http.get('https://pokeapi.co/api/v2/pokemon/pikachu').pipe(
    
    concatMap((respPokemon: any) => {
      return this.getSpecies(respPokemon.species.url,respPokemon);
    }),
    concatMap((respSpecies: any)=>{
      return this.getVarieties(respSpecies);
    })
    ,
    tap (res =>{
      console.log('tap2',res);
  })
   );
  }

  /*getPokemon(){
    return merge([this.http.get('https://pokeapi.co/api/v2/pokemon/pikachu'),this.http.get('https://pokeapi.co/api/v2/pokemon/ditto')]).pipe(
      combineLatestAll(),
      tap(resp =>{
        console.log(resp);
      })
    )
  }*/

  getSpecies(url: string, original: any): Observable<any>{
    return this.http.get(url).pipe(
      map((respSpecies: any) =>{

        (respSpecies.varieties as  any[]).forEach(el =>{
          this.toSearch.push(this.http.get(el.pokemon.url));
        })
        //console.log(this.toSearch);
        

        return{
          ...respSpecies, ...original
        } 
      })
    )
  }

  getVarieties(original: any): Observable<any>{
    return merge(this.toSearch).pipe(
      combineLatestAll(),//ejecuta los obvs del arrar y junta las respuestas en un arreglo
      map(resp =>{
        let sprites = resp.map(item =>{
          return {
            name: item.name,
            img: item.sprites.front_default
          }
        })
        return {
          ...original,
          sprites:sprites,
        }
        
      })
    )
  }

}
