export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}   

export interface TMDBResponse<T> {
    page: number
    results: T[]
    total_results: number
    total_pages: number }
