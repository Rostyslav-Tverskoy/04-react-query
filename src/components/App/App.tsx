import { useEffect, useState } from 'react';
import styles from "./App.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import { type Movie } from '../../types/movie';
import  SearchBar  from '../SearchBar/SearchBar';
import  MovieGrid  from '../MovieGrid/MovieGrid';
import  Loader  from '../Loader/Loader';
import  ErrorMessage  from '../ErrorMessage/ErrorMessage';
import  MovieModal  from '../MovieModal/MovieModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

export interface TMDBResponse<T> {
    page: number
    results: T[]
    total_results: number
    total_pages: number }



export default function App() {
  const [query, setQuery] = useState(``);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchCompleted, setSearchCompleted] = useState(false);

 const {data, isLoading, isError, isSuccess} = useQuery<TMDBResponse<Movie>>({
  queryKey: [`movies`, query, page],
  queryFn: () => fetchMovies(query,page),
  enabled: query !== "",
  placeholderData: keepPreviousData,
 })

 const handleSearch = (newQuery: string) => {
  setQuery(newQuery);
  setPage(1);
  setSearchCompleted(false);
 }

useEffect(() => {
  if (isSuccess && data && data.results.length === 0 && !isError) {
    toast.error("No movies found for your request.");
  }
},[searchCompleted, data, isError]);




  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && data && data.results.length > 0 && (<> 
       {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
      <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      </>)}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      <Toaster />
    </div>
  );
}
