import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StockService} from '../../services/stock.service';
import {IStockData} from '../../shared/interfaces';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  items$: BehaviorSubject<Map<string, IStockData>> = new BehaviorSubject<Map<string, IStockData>>(new Map());
  loadingData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingPrices$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private stockService: StockService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.initialLoadingData();
  }

  getItem(symbol: string): void {
    this.items$.next({...this.items$.value, ...{[symbol]: {}}})
    this.loadingData$.next(true);
    this.stockService.search(symbol).then(data => {
      const prices = this.items$.value[symbol].prices;
      const d = {[symbol]: {data, prices}};
      this.items$.next({...this.items$.value, ...d})
    }).finally(() => this.loadingData$.next(false));
    this.loadPrices(symbol)
    this.saveKey(symbol)
  }

  saveKey(symbol: string): void {
    const keys: string = this.storageService.getItem('items');
    const newKeys: string[] = keys?.length ? JSON.parse(keys) : [];
    newKeys.push(symbol);
    this.storageService.setItem('items', JSON.stringify([...new Set(newKeys)]));
  }

  deleteItem(symbol: string): void {
    const data = this.items$.value;
    delete data[symbol];
    this.items$.next(data);
    /** Remove from storage */
    const keys: string = this.storageService.getItem('items');
    const newKeys: string[] = keys?.length ? JSON.parse(keys) : [];
    const index = newKeys.findIndex( i => i === symbol);
    newKeys.splice(index, 1);
    this.storageService.setItem('items', JSON.stringify(newKeys));
  }

  private initialLoadingData(): void {
    const items = this.storageService.getItem('items');
    const keysArr: string[] = items?.length ? JSON.parse(items) : [];
    if(!keysArr.length) {
      return
    }
    keysArr.forEach(k => this.getItem(k))
  }

  private loadPrices(symbol: string): void {
    this.loadingPrices$.next(true);
    this.stockService.getPrices(symbol).then(prices => {
      const data = this.items$.value[symbol].data;
      const item = {[symbol]: {prices, data}};
     this.items$.next({...this.items$.value, ...item})
    }).finally(() => this.loadingPrices$.next(false))
  }

}
