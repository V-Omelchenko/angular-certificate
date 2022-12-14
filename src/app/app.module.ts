import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockListComponent } from './pages/stock-list/stock-list.component';
import { StockDetailComponent } from './pages/stock-detail/stock-detail.component';
import { StockSelectorComponent } from './partials/stock-selector/stock-selector.component';
import { StockCardComponent } from './partials/stock-card/stock-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockDetailComponent,
    StockSelectorComponent,
    StockCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
