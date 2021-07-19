export class UserModel {

    public constructor(
        public user_id?: number,
        public email?: string,
        public name?: string,
        public provider?: string,
        public provider_id?: number,
        public provider_pic?: string,
        public token?: string
        ) {

    }
}