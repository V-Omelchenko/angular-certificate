import { Injectable } from '@angular/core';
import {ISentiment, IStock, IStockPrices} from '../shared/interfaces';
import {AddZeroToMonth} from "../shared/utils/add-rezo-to-month";
declare var require: any;
const finnhub = require('finnhub');

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private api_key = finnhub.ApiClient.instance.authentications['api_key'];
  private finnhubClient;

  constructor() {
    this.api_key.apiKey = "bu4f8kn48v6uehqi3cqg";
    this.finnhubClient = new finnhub.DefaultApi();
  }

  search(symbol: string): Promise<IStock> {
    return new Promise((resolve, reject) => {
      this.finnhubClient.symbolSearch(symbol, (error: any, data: any, response: any) => {
        if(error) {
          reject(error)
        }
        data.result.forEach(i => {
          // Selecting item that equal to types symbol
          if(i.symbol === symbol) {
            resolve(i)
          }
        })
        }
      );
    })
  }

  getPrices(symbol: string): Promise<IStockPrices> {
    return new Promise((resolve, reject) => {
      this.finnhubClient.quote(symbol, (error, data, response) => {
        if(error) {
          reject(error)
        }
        resolve(data)
      });
    });
  }

  getSentiment(symbol: string): Promise<{data: ISentiment[], symbol: string}> {
    const nowDate = new Date();
    const from  = nowDate.getFullYear()+'-'+AddZeroToMonth((nowDate.getMonth()-1))+'-01';
    const to  = nowDate.getFullYear()+'-'+AddZeroToMonth((nowDate.getMonth() + 1))+'-01'
    return new Promise((resolve, reject) => {
      this.finnhubClient.insiderSentiment(symbol, from, to, (error, data, response) => {
        if(error) {
          reject(error)
        }
        resolve(data)
      });
    });
  }
}




