export class MovieModel {

    public constructor(
        public movieId?: number,
        public name?: string,
        public description?: string,
        public date?: Date,
        public imageFileName?: string,
        public videoSource?:string,
        public reviewsCount?:number
        ) {

    }
}