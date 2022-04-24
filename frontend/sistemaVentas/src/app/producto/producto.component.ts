import { ProductServiceService } from '../services/product-service.service';
import { ProviderServiceService } from '../services/provider-service.service';
import { CategoryServiceService } from '../services/category-service.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  products : any;
  providers: any;
  categories:any;
  filtrados: any;
  constructor( private product:ProductServiceService,
               private provider:ProviderServiceService, 
               private category:CategoryServiceService, 
               private modalService:NgbModal
               ){
  }
  ngOnInit(){
    this.product.getProducts().subscribe(data=>{
      this.products = data
      this.filtrados = data
    })
    this.provider.getProviders().subscribe(data=>{
      this.providers = data
    })
    this.category.getCategories().subscribe(data=>{
      this.categories = data
    })
  }

  mostrarModal(modal) {
     this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title'})
  }

  filtro(valor){
    if (!valor){
      this.filtrados = this.products
    }
    this.filtrados = this.products.filter(element => element.name.includes(valor))
  }

  onSubmit(form){
    this.product.postProduct(form.value).subscribe(
      data=>{
        console.log(data)
        this.products.push(data)
      }
    )
  }
}
