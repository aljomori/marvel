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
  regex = new RegExp('^\\d{4}$');
  year = new Date().getFullYear();


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
    if (!this.searching) {
      this.searching = true;
      this.dataService.load(this.search)
        .then(data => {
          this.data = data;
          this.items = this.data.results;
           this.searching = false;
        });
    }
  }
  onInputEnter() {

    if (this.customSearch.length > 0) {

      if (this.regex.test(this.customSearch)
        && this.customSearch >= "1939"
        && parseInt(this.customSearch) <= this.year) {

        this.search = { dateRange: "01-01-" + this.customSearch + ",31-12-" + this.customSearch };
      } else {
        this.search = { title: this.customSearch };
      }
    } else {
      this.search = {};
    }

    if (this.customSearch.length > 3) {
      this.onSearchInput();
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
    var params = this.search;
    params.offset = offset;
    if (offset < this.data.total) {
      this.dataService.load(params)
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

  getDate(dates, type) {
    var date = null;

    for (var i in dates) {

      if (dates[i].type === type) {
        date = dates[i].date;
      }

    }

    return date;

  }

}
