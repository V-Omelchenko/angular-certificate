import { Component, OnInit } from '@angular/core';
import {StockService} from "../../services/stock.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ISentiment, IStock} from "../../shared/interfaces";

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {
  stockItem$: BehaviorSubject<IStock> = new BehaviorSubject<IStock>(null);
  sentiment$: BehaviorSubject<ISentiment[]> = new BehaviorSubject<ISentiment[]>([]);
  loadingSentiment$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingItem$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  symbol: string;
  constructor(private stockService: StockService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.symbol = this.activatedRoute.snapshot.params['symbol'];
    this.loadingSentiment$.next(true);
    this.loadingItem$.next(true);
    this.stockService.getSentiment( this.symbol).then(data => {
      this.sentiment$.next(this.validateMonthData(data.data))
    })
      .finally(() => this.loadingItem$.next(false));

    this.stockService.search( this.symbol).then(data => this.stockItem$.next(data))
      .finally(() => this.loadingSentiment$.next(false));
  }


  private validateMonthData(data: ISentiment[] = []): ISentiment[] {
    if(data.length >= 3) {
      return data
    }
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const result: ISentiment[] = [];

    // prev 2 month
    const prev2MonthIndex = data.findIndex(d => d.month === currentMonth - 2);
    const prev2MonthData = prev2MonthIndex !== -1 ? data[prev2MonthIndex] : {month: currentMonth - 2, year:date.getFullYear() }
    result.push(prev2MonthData);

    // prev 1 month
    const prev1MonthIndex = data.findIndex(d => d.month === currentMonth - 1);
    const prev1MonthData = prev1MonthIndex !== -1 ? data[prev1MonthIndex] : {month: currentMonth - 1, year:date.getFullYear()}
    result.push(prev1MonthData);

    // current month
    const nowMonthIndex = data.findIndex(d => d.month === currentMonth);
    const currentMonthData = nowMonthIndex !== -1 ? data[nowMonthIndex] : {month: currentMonth, year:date.getFullYear()}
    result.push(currentMonthData);
    console.log(result)
    return result;
  }

}
