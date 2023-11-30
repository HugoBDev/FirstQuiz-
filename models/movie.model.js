export default class Movie{
    constructor(id, backdrop_path, genre_ids, poster_path, title, original_title, overview, popularity){
        this.id = id,
        this.poster_path = poster_path,
        this.backdrop_path = backdrop_path,
        this.genre_ids = genre_ids,
        this.title = title,
        this.original_title = original_title,
        this.overview = overview,
        this.popularity = popularity
    }
}