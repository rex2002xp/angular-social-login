import { BaseLoginProvider } from "../abstracts";
import { SocialUser } from "../models";

export declare class FacebookLoginProvider extends BaseLoginProvider {
    private clientId;
    static readonly PROVIDER_ID: string;
    constructor(clientId: string);
    initialize(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}
