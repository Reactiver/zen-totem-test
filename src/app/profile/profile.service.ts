import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

type Profile = Readonly<{
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  webSiteUrl?: string;
}>;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  getProfile(): Observable<Profile> {
    return of({
      email: 'my-mail@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+78005553535',
    });
  }
}
