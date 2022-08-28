import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  
  //user info and tokens could be kept in a more appropriate location and in a secure form
  private users = ['John Doe', 'Jane Doe', 'Jim Dow'];
  private tokens = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwib3JnIjoib3JnLWEiLCJpYXQiOjE2NjE0ODA5Mzd9.x5p9ea8_6tYBQKTO15xmn3fyTtWGp88yNjeldVxhzp0',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTg3NjU0MzIxIiwibmFtZSI6IkphbmUgRG9lIiwib3JnIjoib3JnLWEiLCJpYXQiOjE2NjE0ODA5Mzd9.V_JoeYqrroauCmYIurYIVvvhT2ZUd97FdbLUdSOxEuo',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTA5ODc2IiwibmFtZSI6IkppbSBEb3ciLCJvcmciOiJvcmctYiIsImlhdCI6MTY2MTQ4MDkzN30.M5qdMkdJtKw0NPW-VGzIoEz69yQXQdfD7y-BSsxBnZ0',
  ]
 
  constructor(private router: Router) { }

  //signs user in across the entire website using observarables
  signin(name: string): boolean {
    if (this.users.includes(name)) {
      this.user.next(new User(name));
      return true;
    } else {
      return false;
    }
  }

  //resets user state and redirects to login page
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
