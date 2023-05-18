export interface IMovie {
    adult: boolean;
    backdrop_path:string;
    genre_ids:number[];
    id: number;
    original_language:string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path:string;
    release_date: number;
    title: string;
    video: boolean;
    budget: number,
    vote_average: number;
    vote_count: number;
    revenue: number,
}

export interface IMoviesService {
    page: number,
    results: IMovie[],
    total_results: number,
    total_pages: number
}

export interface IMovieDetails {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genres: object[],
    genre_ids:number[];
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    title: string,
    vote_average: number,
    vote_count: number
}