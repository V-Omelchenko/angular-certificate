import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IStockData} from '../../shared/interfaces';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockCardComponent {
  @Input() item: IStockData;

  @Output() deleteEmitter = new EventEmitter<string>();

  delete(symbol: string): void {
    this.deleteEmitter.emit(symbol)
  }
}
