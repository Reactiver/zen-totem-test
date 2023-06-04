import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { Profile } from './types';

const DELAY_MS = 500;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly profileData = new BehaviorSubject<Profile>({
    email: 'my-mail@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+78005553535',
    webSiteUrl: null,
  });

  getProfile(): Observable<Profile> {
    return timer(DELAY_MS).pipe(
      switchMap(() => this.profileData.asObservable())
    );
  }

  saveProfile(newProfile: Profile): Observable<null> {
    if (newProfile.firstName.length === 1) {
      return timer(DELAY_MS).pipe(
        switchMap(() => throwError(() => 'Something went wrong'))
      );
    }

    return timer(DELAY_MS).pipe(
      tap(() => {
        this.profileData.next(newProfile);
      }),
      map(() => null)
    );
  }
}
