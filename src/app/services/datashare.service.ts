import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatashareService {
  public userID?: number;
  public subject = new Subject<number>();
  private userSource = new BehaviorSubject<number | undefined>(this.userID);
  currentUserID = this.userSource.asObservable();

  constructor() {}

  changeUser(userID: number) {
    this.userSource.next(userID);
    console.log('userID', userID);
  }
}
