import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor (private autorizacion:AuthServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.autorizacion.getToken(form.value).subscribe(
      data=>{
        console.log(data)
      }
    )
  }

  isLoggedIn(){
    this.autorizacion.isLoggedIn()
  }


}
