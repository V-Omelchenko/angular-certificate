import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StockListComponent} from './pages/stock-list/stock-list.component';
import {StockDetailComponent} from './pages/stock-detail/stock-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StockListComponent
  },
  {
    path: 'sentiment/:symbol',
    component: StockDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
