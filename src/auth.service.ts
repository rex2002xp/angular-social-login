import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ILoginProvider } from "./interfaces";
import { SocialUser } from "./models";

export interface AuthServiceConfigItem {
  id: string,
  provider: ILoginProvider
}

export class AuthServiceConfig {
  providers: Map<string, ILoginProvider> = new Map<string, ILoginProvider>();

  constructor(providers: AuthServiceConfigItem[]) {
    for (var i = 0; i < providers.length; i++) {
      var element = providers[i];
      this.providers.set(element.id, element.provider);
    }
  }
}

@Injectable()
export class AuthService {

  private static readonly LOGIN_PROVIDER_NOT_FOUND: string = "Login provider not found";

  private providers: Map<string, ILoginProvider>;

  private _user: SocialUser = null;
  private _authState: BehaviorSubject<SocialUser> = new BehaviorSubject(null);

  get authState(): Observable<SocialUser> {
    return this._authState.asObservable();
  }

  constructor(config: AuthServiceConfig) {
    this.providers = config.providers;

    this.providers.forEach((provider: ILoginProvider, key: string) => {
      provider.initialize().then((user: SocialUser) => {
        user.provider = key;

        this._user = user;
        this._authState.next(user);
      }).catch((err) => {
        // this._authState.next(null);
      });
    });
  }

  signIn(providerId: string): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signIn().then((user: SocialUser) => {
          user.provider = providerId;
          resolve(user);

          this._user = user;
          this._authState.next(user);
        });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      let providerId = this._user.provider;
      let providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signOut().then(() => {
          resolve();

          this._user = null;
          this._authState.next(null);
        });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

}