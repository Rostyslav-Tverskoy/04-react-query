import axios from 'axios';
import { type Movie } from '../types/movie';

interface TMDBResponse<T> {
    page: number
    results: T[]
    total_results: number
    total_pages: number

}

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query:string, page: number): Promise<TMDBResponse<Movie>> {
    const response = await axios.get<TMDBResponse<Movie>>(BASE_URL, {
        params: {query, page},
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    });
    return response.data;
}
