export class ReviewModel {

    public constructor(
        public movie_name?: String,
        public reviewId?: number,
        public movieId?: number,
        public content?: string,
        public dateAdded?: String,
        public userId?: number,
        public user_name?: String,
        public profile_pic?: string
        ) {

    }
}