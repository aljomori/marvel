import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ComicProvider } from '../../providers/comic-provider';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-comic-detail',
  templateUrl: 'comicDetail.html'
})
export class ComicDetailPage {

  customSearch: string = '';
  item: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, public dataService: ComicProvider) {
    this.item = navParams.get('item');
    console.log(this.item)
  }

}
