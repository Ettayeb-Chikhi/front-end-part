import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  addUser(user:User):void{
    let users = this.getUsers();
    users = [...users,user];
    localStorage.setItem("users",JSON.stringify(users));
  }

  getUsers():User[]{
    let items = localStorage.getItem("users");
    if(items!=null){
        let users:User[] = JSON.parse(items);
        return users;
        
    }
    return [];
  }

  findByEmail(email:string):User|undefined{
    const users = this.getUsers();
    const user = users.find((u)=>u.email==email);
    return user;

  }
}
