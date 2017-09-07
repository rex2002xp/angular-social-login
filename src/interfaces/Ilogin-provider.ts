import { SocialUser } from '../models'

export interface ILoginProvider {
    initialize(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}