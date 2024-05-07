import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreServiceService {

  API = 'http://localhost:3000/user';
  
  constructor() { }

  async postData(user: any){
    //user.passport = {}
    try{
      const responce = await fetch(this.API, {
        method : 'POST',
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(user)
      } )
      const result = await responce.json();
      console.log("Success:", result)
     
    }
    catch(error){
      console.log("Error:", error);
    }
   
  }
}
