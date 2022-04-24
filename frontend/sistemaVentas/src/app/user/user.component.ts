import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users : any;
  filtrados: any;
  constructor( private user:UserServiceService,
               private modalService:NgbModal
               ){
  }
  ngOnInit(){
    this.user.getUsers().subscribe(data=>{
      this.users = data
      this.filtrados = data
    })
  }

  mostrarModal(modal) {
     this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title'})
  }

  filtro(valor){
    if (!valor){
      this.filtrados = this.users
    }
    this.filtrados = this.users.filter(element => element.first_name.includes(valor))
  }

   onSubmit(form){
    console.log(form.value)
     this.user.postUser(form.value).subscribe(
       data=>{
         console.log(data)
          this.users.push(data)
        }
      )
    
   }

}
