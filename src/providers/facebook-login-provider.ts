import { BaseLoginProvider } from "../abstracts";
import { SocialUser } from "../models";

declare let FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID: string = "FACEBOOK";

  constructor(private clientId: string) { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(FacebookLoginProvider.PROVIDER_ID,
        "//connect.facebook.net/en_US/sdk.js",
        () => {
          FB.init({
            appId: this.clientId,
            autoLogAppEvents: true,
            cookie: true,
            xfbml: true,
            version: 'v2.10'
          });
          FB.AppEvents.logPageView();

          FB.getLoginStatus(function (response: any) {
            if (response.status === 'connected') {
              FB.api('/me?fields=firtsname,lastname,name,email,picture', (response: any) => {
                let user: SocialUser = new SocialUser();

                user.id = response.id;
                user.fullname = response.name;
                user.firstname = response.firstname;
                user.lastname = response.lastname;
                user.email = response.email;
                user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";

                resolve(user);
              });
            }
          });
        });
    });
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          FB.api('/me?fields=firtsname,lastname,name,email,picture', (response: any) => {
            let user: SocialUser = new SocialUser();

            user.id = response.id;
            user.fullname = response.name;
            user.firstname = response.firstname;
            user.lastname = response.lastname;
            user.email = response.email;
            user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";

            resolve(user);
          });
        }
      }, { scope: 'email,public_profile' });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.logout((response: any) => {
        resolve();
      });
    });
  }

}
