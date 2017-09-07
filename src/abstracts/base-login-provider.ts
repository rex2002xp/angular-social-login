import { ILoginProvider } from "../interfaces";
import { SocialUser } from '../models';

export declare abstract class BaseLoginProvider implements ILoginProvider {
    constructor();
    abstract initialize(): Promise<SocialUser>;
    abstract signIn(): Promise<SocialUser>;
    abstract signOut(): Promise<any>;
    loadScript(id: string, src: string, onload: any): void;
}
