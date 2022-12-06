import { BaseInterface } from './base.interface';
export interface UserInterface extends BaseInterface{
    username:string;
    roles: string[];
}