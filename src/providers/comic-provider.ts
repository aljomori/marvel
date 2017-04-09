import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

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
    params.set('hasDigitalIssue', "true");

    if (query == 1) {
      return Promise.resolve(this.data);
    }
    params = this.jsonConcat(params, query);
    return new Promise(resolve => {
      this.http.get('https://gateway.marvel.com:443/v1/public/comics', { search: params })
        //   this.http.get('data.json', { search: params })
        .map(res => res.json())
        .subscribe(response => {
          this.data = response.data;
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
      param.set(key, o2[key]);
    }
    return param;
  }

}
