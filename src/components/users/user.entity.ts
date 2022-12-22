import { UserInterface } from "src/core/interfaces/user.interface";

export class User implements UserInterface {
    username:string;
    password:string;
    roles:string[];
}