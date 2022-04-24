import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ProviderServiceService } from '../services/provider-service.service';
import {CategoryServiceService } from '../services/category-service.service';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:any;
  productId:any;
  cate:any;
  provi:any;
  constructor(private route: ActivatedRoute,
              private products: ProductServiceService, 
              private modalService:NgbModal,
              private categories:CategoryServiceService,
              private providers:ProviderServiceService,
              ) { }

  ngOnInit(): void {
    this.route.paramMap
     .subscribe(params => {
      this.productId = params.get('id')
     })
     this.products.getProduct(this.productId)
     .subscribe(data => {
       this.product = data
       console.log(data, 'esto')
     })
     this.categories.getCategories()
     .subscribe(data =>{
       this.cate = data
     })
     this.providers.getProviders()
     .subscribe(data=>{
       this.provi = data
     })
  }

  mostrarModal(modal){
    this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title'})
  }

  onSubmit(form){
    console.log(form, 'hola')
    this.products.putProduct(form, this.productId)
    .subscribe( data =>{
      this.product = data
      console.log(data,'hollaa') 
    })
  }
}
