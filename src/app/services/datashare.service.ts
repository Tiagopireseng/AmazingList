import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DetailWatchlist } from '../display/models/detailwatchlist.model';
import { Watchlist } from '../display/models/watchlist.model';
import { WatchlistComponent } from '../watchlist/watchlist.component';

@Injectable({
  providedIn: 'root',
})
export class DatashareService {
  public userID?: number;
  public emptyWL: Watchlist = {
    id: 0,
    user: 0,
    movie_series: [],
  };

  public sourceWL$ = new Subject<DetailWatchlist>();
  public subject = new BehaviorSubject<Watchlist>(this.emptyWL);
  private userSource = new BehaviorSubject<number | undefined>(this.userID);
  currentUserID = this.userSource.asObservable();
  currentWL = this.sourceWL$.asObservable();

  constructor() {}

  changeUser(userID: number) {
    this.userSource.next(userID);
    console.log('userID', userID);
  }
  changeWL(watchlist: DetailWatchlist) {
    this.sourceWL$.next(watchlist);
    console.log('watchlist', watchlist);
  }
}
