import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzadisplayComponent } from './pizzadisplay.component';

const routes: Routes = [{ path: '', component: PizzadisplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzadisplayRoutingModule {}
