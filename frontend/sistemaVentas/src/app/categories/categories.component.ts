import { Component, OnInit } from '@angular/core';
import {CategoryServiceService} from '../services/category-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : any;
  filter: any;

  constructor(private category:CategoryServiceService,
              private modalService:NgbModal
    ) { }

  ngOnInit(): void {
    this.category.getCategories().subscribe(data=>{
      this.categories=data
      this.filter=data
    })
  }
  filtro(string){
    if(!string){
      this.filter=this.categories
    }
    this.filter=this.categories.filter(element=>element.name.includes(string))
  }
  
  onSubmit(form){
    this.category.postCategory(form.value).subscribe(data=>{
      this.categories.push(data)
      console.log(data)
    })
  }
  mostrarModal(modal){ 
    this.modalService.open(modal, { size: 'md', ariaLabelledBy: 'modal-basic-title'})
  }
  borrarCategoria(categoria){
    let indice= this.categories.indexOf(categoria)
    this.category.deleteCategory(categoria.id).subscribe()
    this.categories.splice(indice,1)
  }
}
