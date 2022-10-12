import { Injectable } from '@angular/core';
import { BehaviorSubject,tap } from 'rxjs';

interface UserData{
  name: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  public data$: BehaviorSubject<UserData> =  new BehaviorSubject<UserData>({name:'',password:''});

  constructor() { 
    
  }
}
