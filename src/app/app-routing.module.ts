import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CongratulationsComponent} from '../app/congratulations/congratulations.component';
import {HomeComponent} from '../app/home/home.component';


const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'congratulations', component: CongratulationsComponent}
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
