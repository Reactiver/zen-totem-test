import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { switchMap } from 'rxjs';
import { Profile } from './types';

const profileData = {
  email: 'my-mail@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+78005553535',
  webSiteUrl: null,
};

describe('ProfileServiceTsService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  test('should return right profile data after some delay', fakeAsync(() => {
    service.getProfile().subscribe((profile) => {
      expect(profile).toEqual(profileData);
    });

    tick(500);
  }));

  test('should return an error when firstName have only 1 character', fakeAsync(() => {
    const failableProfile = {
      firstName: 'a',
    } as Profile;

    service.saveProfile(failableProfile).subscribe({
      error: (message) => {
        expect(message).toBe('Something went wrong');
      },
    });

    tick(500);
  }));

  test('should update profile state if firstName contains more than 1 character', fakeAsync(() => {
    const okProfile = {
      firstName: 'abc',
    } as Profile;

    service
      .saveProfile(okProfile)
      .pipe(switchMap(() => service.getProfile()))
      .subscribe((profile) => {
        expect(profile).toEqual(okProfile);
      });

    tick(1_000);
  }));
});
