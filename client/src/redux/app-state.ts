import { UserModel } from "../models/user-model";

export class AppState {
    public user : UserModel[];

    public constructor(){
        this.user = [];
    }

}