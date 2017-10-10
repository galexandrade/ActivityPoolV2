import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/core/auth.service";
import { Router } from "@angular/router";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private slimLoadingBarService: SlimLoadingBarService) { }

  ngOnInit() {
    this.authService.logout();
  }
  
  onSubmit(form: any){
    this.slimLoadingBarService.start();
    this.slimLoadingBarService.progress = 30;

    this.authService.login(form.username, form.password).subscribe((data) => {      
      if(this.authService.loggedIn()){
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        this.router.navigate([redirect]);
      }
      else
        this.slimLoadingBarService.complete();
    },
    (error) => this.slimLoadingBarService.complete()
    );

  }

}
