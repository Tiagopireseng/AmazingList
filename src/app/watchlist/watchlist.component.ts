import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DetailWatchlist } from '../display/models/detailwatchlist.model';
import { MovieSeries } from '../display/models/movieseries.model';
import { Watchlist } from '../display/models/watchlist.model';
import { ApiService } from '../services/api.service';
import { DatashareService } from '../services/datashare.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  sticky = false;
  activeUserID?: number;
  watchlist!: MovieSeries[];
  watchlistObs!: Observable<MovieSeries[]>;
  newObservable!: Observable<DetailWatchlist>;
  headerBG!: MovieSeries;
  sliderConfig: Object = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  @ViewChild('stickyHeader') header!: ElementRef;

  constructor(private datashare: DatashareService, private api: ApiService) {}

  ngOnInit(): void {
    this.datashare.currentUserID.subscribe((id) => {
      this.activeUserID = id;
    });
    this.datashare.currentWL.subscribe((WL) => {
      this.watchlist = WL.movie_series;
      console.log('WL:', this.watchlist);
    });
    console.log('Active User ID: ', this.activeUserID);
    this.newObservable = this.api.getDetailWL(7);
    this.newObservable.subscribe(
      (res) => (this.headerBG = res.movie_series[0])
    );
  }

  printFunction() {
    console.log(this.watchlist);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
