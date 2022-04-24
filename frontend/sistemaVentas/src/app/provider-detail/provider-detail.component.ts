import { Component, OnInit } from '@angular/core';
import {ProviderServiceService} from '../services/provider-service.service';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.css']
})
export class ProviderDetailComponent implements OnInit {
  provider:any
  providerId:any
  constructor(private providers:ProviderServiceService,
              private route:ActivatedRoute,
              private modalService:NgbModal ) { }

  ngOnInit(): void {
    this.route.paramMap
     .subscribe(params => {
      this.providerId = params.get('id')
     })
     this.providers.getProvider(this.providerId).subscribe(data=>{
       this.provider=data
       console.log(data)
     })
  }
  mostrarModal(modal){
    this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title'})
  }
  onSubmit(json){
    this.providers.putProvider(json,this.providerId).subscribe(data=>{
      this.provider=data
      console.log(data)
    })
  
  }
}
