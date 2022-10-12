import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  public drinks:any[] = [];

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getData('margarita').subscribe({next: data =>{
      this.drinks = data;
    }});
  }



}
