import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
import {RouterModule} from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.guard';
import { UserComponent } from './user/user.component';
import { EjemploComponent } from './ejemplo/ejemplo.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    ProductDetailComponent,
    NavbarComponent,
    HomeComponent,
    CategoriesComponent,
    ProvidersComponent,
    ProviderDetailComponent,
    CategoryDetailComponent,
    LoginComponent,
    UserComponent,
    EjemploComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      {path:'', component: LoginComponent},
      {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path:'productos', component: ProductoComponent, canActivate: [AuthGuard]},
      {path:'productos/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
      {path:'categorias', component:CategoriesComponent, canActivate: [AuthGuard]},
      {path:'provedores', component: ProvidersComponent, canActivate: [AuthGuard]},
      {path:'provedores/:id', component:ProviderDetailComponent, canActivate: [AuthGuard] },
      {path:'usuarios', component: UserComponent, canActivate: [AuthGuard, AdminGuard]},
    ])
  ],  
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
  