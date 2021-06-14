export class ReviewModel {

    public constructor(
        public reviewId?: number,
        public movieId?: number,
        public userId?: number,
        public name?: String,        
        public content?: string,
        public dateAdded?: String,
        public firstName?: String,
        public lastName?: String,
        public profilePicUrl?: string
        ) {

    }
}