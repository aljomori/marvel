import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export function extend<A>(a: A): A;
export function extend<A, B>(a: A, b: B): A & B;
export function extend<A, B, C>(a: A, b: B, c: C): A & B & C;
export function extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
export function extend(...args: any[]): any {
  const newObj = {};
  for (const obj of args) {
    for (const key in obj) {
      //copy all the fields
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
/*
  Generated class for the ComicProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ComicProvider {

  data: any;


  constructor(private http: Http) {
    this.data = null;
  }

  load(query) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('apikey', "eec2b791e6e4abce698cc51c828fcd0a");


    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }


    params = this.jsonConcat(params,query);
    // don't have the data yet
    return new Promise(resolve => {
     this.http.get('https://gateway.marvel.com:443/v1/public/comics')
//      this.http.get('data.json', params)
        .map(res => res.json())
        .subscribe(response => {
          this.data = response.data.results;
          resolve(this.data);
        });
    });
  }

  filterItems(searchTerm) {
    return this.data.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  jsonConcat(param, o2) {
    for (var key in o2) {
      param.set(key,o2[key]);
    }
    return param;
  }

}
