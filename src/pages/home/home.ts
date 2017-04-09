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
  searching: any = false;

  constructor(public navCtrl: NavController, public dataService: ComicProvider) {
    this.searchControl = new FormControl();
    this.loadComics();
  }

  ionViewDidLoad() {

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;
      //this.setFilteredItems();

    });


  }

  onSearchInput() {
    this.searching = true;
    this.dataService.load({ title: this.customSearch });
  }

  setFilteredItems() {

    // this.items = this.dataService.filterItems(this.customSearch);


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
    console.log('Begin async operation');

    var offset = this.data.offset + this.data.count;

    console.log(offset);

    if (offset < this.data.total) {
      this.dataService.load({ offset: offset })
        .then(data => {

          console.log(this.items.length)

          for (var item in data.results) {
            this.items.push(item);
          }

          console.log(this.items.length)
          console.log('Finish async operation');
          infiniteScroll.complete();
        });
    } else {
      console.log('Finish async operation - no more');
      infiniteScroll.complete();
    }


  }

}
