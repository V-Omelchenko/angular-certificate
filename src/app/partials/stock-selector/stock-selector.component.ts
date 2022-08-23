import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.scss']
})
export class StockSelectorComponent {
  @Output() private searchStockEmitter = new EventEmitter<string>();

  searchStock(searchText: string): void {
    this.searchStockEmitter.emit(searchText)
  }

}
