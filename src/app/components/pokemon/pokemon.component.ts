import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { map,tap } from 'rxjs/operators';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public pokemon$!: Observable<any>;

  constructor(public requestService: RequestService) { 
    this.pokemon$ = this.requestService.getPokemon().pipe(
      map((resp:any)=>{
        return {
          name: resp.name,
          stats: resp.stats,
          sprites: resp.sprites
        }
      }),
      tap (res =>{
        console.log('tap3',res);
    })
    );
    console.log(this.pokemon$);
    
  }

  ngOnInit(): void {
  }

}
