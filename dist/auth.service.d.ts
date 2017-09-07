import { Observable } from 'rxjs';
import { ILoginProvider } from "./interfaces";
import { SocialUser } from "./models";
export interface AuthServiceConfigItem {
    id: string;
    provider: ILoginProvider;
}
export declare class AuthServiceConfig {
    providers: Map<string, ILoginProvider>;
    constructor(providers: AuthServiceConfigItem[]);
}
export declare class AuthService {
    private static readonly LOGIN_PROVIDER_NOT_FOUND;
    private providers;
    private _user;
    private _authState;
    readonly authState: Observable<SocialUser>;
    constructor(config: AuthServiceConfig);
    signIn(providerId: string): Promise<SocialUser>;
    signOut(): Promise<any>;
}
