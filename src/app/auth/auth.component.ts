import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login: boolean = true;
  userInfoForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  })
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userInfoForm.invalid) { return; }

    const name = this.userInfoForm.value['name'];

    if (this.authService.signin(name)) {
      this.router.navigate(['/task-list']);
    } else {
      this.errorMsg = 'Name does not exist';
    }
  }
}
