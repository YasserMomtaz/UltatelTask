import { Component } from '@angular/core';
import { LoginService } from '../Service/login.service';
import { User } from '../dto/user.dto';
import { Token } from '../dto/token.dto';
import { ActivatedRoute, Route, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../dto/decoded.dto';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  token: Token = new Token();
  hide: boolean = true;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  Login() {
    this.loginService.userLogin(this.user).subscribe(
      data => {
        if (data.access_token != undefined) {
          this.loginService.IsLogged = true;
          localStorage.setItem('token', data.access_token);
          const decodedToken: DecodedToken = jwtDecode(data.access_token);
          this.loginService.setUserId(decodedToken.sub);
          this.router.navigate(['/student']);
        }
      },
      data => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Password or Username",
          footer: '<a href="/register">You Don\'t have an Account?</a>'
        });
      }
    );
  }

  Register(){
    this.router.navigate(['/register']);
  }
}
