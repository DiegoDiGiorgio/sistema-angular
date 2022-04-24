import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth.service.service';
import { ProductServiceService } from '../services/product-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SellServiceService} from '../services/sell-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  productos:any;
  productosSeleccionados=new Array();
  precioTotal=0;
  constructor(private authService:AuthServiceService,
              private sellService:SellServiceService,
              private productService: ProductServiceService,
              private modalService:NgbModal)
               { }

  ngOnInit(): void {
    this.authService.setCurrentUser()
    this.productService.getProducts().subscribe(data=>{
      this.productos=data
    })
  }

  desloguear(){
    this.authService.logOut()
  }

  estaLogueado(){
    return this.authService.isLoggedIn()
  }

  currentUser(){
    return this.authService.getCurrentUser()
  }

  esSuperUser(){
    return this.authService.isSuperUser()
  }

  formVenta(modal){
    this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title'})
    this.limpiarCampos()
  }

  onSubmit(form){
    let jsonVenta;
    jsonVenta = {
      productos : this.productosSeleccionados,
      seller : localStorage.getItem('user_id'),
      mount : this.precioTotal
    }
    this.sellService.postSell(jsonVenta).subscribe(data=>{
      console.log('este', data)
    })
  }
   agregarProd(){ // se intenta aumentar la cantidad de un producto existente, si este no existe(falla) se crea un nuevo producto
    //  this.productService.getProduct(selectProd.value).subscribe(data=>{
    //     try{     
    //       this.productosSeleccionados[this.productosSeleccionados.findIndex(prod => prod.getProducto().id == selectProd.value)].agregar();
    //   } catch {
    //       let prodNuevo = new ProdVenta(data);
    //       this.productosSeleccionados.push(prodNuevo)
    //   } finally{
    //       selectProd.value=null;
    //       this.calcularPrecio();
    //   }     
    //  })     
   }
   borrarProd(prod){
    prod.descontar();
    if (prod.cantidad<1){
      this.productosSeleccionados=this.productosSeleccionados.filter(pro=> pro.getProducto().id !== prod.getProducto().id)
    }
    this.calcularPrecio()
    console.log('pepo')
 }
  calcularPrecio(){
    let sum = 0;
    this.productosSeleccionados.forEach(prod => sum += prod.precio())
    this.precioTotal = sum;
  }

  limpiarCampos(){
    this.precioTotal=0;
    this.productosSeleccionados = [];
  }


}

class ProdVenta {
  producto;
  cantidad;
  constructor(producto) {
    this.producto=producto;
    this.cantidad=1;
  }
  agregar(){
    this.cantidad++
  }
  descontar(){
    this.cantidad--
  }
  precio(){
    return (this.cantidad * this.producto.sell_price)
  }
  getProducto(){
    return this.producto;
  }
  getCantidad(){
    return this.cantidad;
  }
  setCantidad(cant){
    this.cantidad = cant;
  }
}
