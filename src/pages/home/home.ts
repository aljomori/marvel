import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ComicProvider } from '../../providers/comic-provider';
import { ComicDetailPage } from '../comicDetail/comicDetail';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  customSearch: string = '';
  searchControl: FormControl;
  items: any;
  data: any;
  search: any;
  searching: any = false;

  constructor(public navCtrl: NavController, public dataService: ComicProvider) {
    this.searchControl = new FormControl();
    this.loadComics();
  }

  ionViewDidLoad() {

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;

    });

  }

  onSearchInput() {
    this.searching = true;
    this.dataService.load(this.search)
      .then(data => {
        this.data = data;
        this.items = this.data.results;
      });
  }
  onInputEnter() {
    if (this.customSearch.length > 0) {
      this.search = { title: this.customSearch };
    } else {
      this.search = {};
    }
  }

  loadComics() {
    this.dataService.load({})
      .then(data => {
        this.data = data;
        this.items = this.data.results;
      });
  }

  comicDetail(item) {
    this.navCtrl.push(ComicDetailPage, { item });
  }

  doInfinite(infiniteScroll) {

    var offset = this.data.offset + this.data.count;

    if (offset < this.data.total) {
      this.dataService.load({ offset: offset })
        .then(data => {
          if (data.hasOwnProperty('results')) {
            for (var item in data.results) {
              this.items.push(data.results[item]);
            }
          }
          infiniteScroll.complete();
        });
    } else {
      infiniteScroll.complete();
    }
  }

}
