import { Component, OnInit } from '@angular/core';
import {ProviderServiceService} from '../services/provider-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers:any;
  filtrados:any;
  constructor(private provider:ProviderServiceService,
              private modalService:NgbModal) { }
  

  ngOnInit(): void {
    this.provider.getProviders().subscribe(data=>{
      this.providers=data
      this.filtrados=data
    })
  }
  onSubmit(form){
    this.provider.postProvider(form.value).subscribe(data=>{
      console.log('provider nuevo', data)
      this.providers.push(data)
    }
      )
   
  }

  mostrarModal(modal) {
    this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title'})
 }

  filtro(aString){
    if(!aString){
      this.filtrados=this.providers
    }
    this.filtrados = this.providers.filter(element=> element.name.includes(aString))
  }

}
