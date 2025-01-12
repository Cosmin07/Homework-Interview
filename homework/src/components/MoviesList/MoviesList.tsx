import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Movie } from '../../models/Movie';
import MovieService from '../../services/movies-service.service';
import { MovieDecadeGroup } from '../../models/MovieDecadeGroup';
import MoviesDecadeGroup from '../MoviesDecadeGroup/MovieDecadeGroup';

const MoviesList: React.FC<{ query: string }> = ({ query }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (query.trim() === "") {
            setMovies([]);
            return;
        }

        const fetchMovies = async () => {
            setLoading(true);
            const movieResults = await MovieService.getMovies(query);
            setMovies(movieResults);
            setLoading(false);
        };

        const debounceTimeout = setTimeout(fetchMovies, 500);
        return () => clearTimeout(debounceTimeout);
    }, [query]);


    const getDecade = (year: number): number => {
        return Math.floor(year / 10) * 10;
    }

    const groupMoviesByRecentDecades = (movies: Movie[]): MovieDecadeGroup[] => {

        const result: MovieDecadeGroup[] = [];

        //Group movies by decade
        const moviesByDecade: { [key: number]: Movie[] } = {};

        for (const movie of movies) {
            const decade = getDecade(movie.Year);
            if (!moviesByDecade[decade]) {
                moviesByDecade[decade] = [];
            }
            moviesByDecade[decade].push(movie);
        }

        //Extract and sort decades in descending order
        const sortedDecadesDescending = Object.keys(moviesByDecade).map(Number).sort((a, b) => b - a);

        for (const decade of sortedDecadesDescending) {
            const sortedMoviesAsc = moviesByDecade[decade].sort((a, b) => a.Year - b.Year)
            result.push({ decade, movies: sortedMoviesAsc });
        }

        return result;
    }

    const moviesGroupedByDecade = groupMoviesByRecentDecades(movies);

    return (
        loading ? <Spin size="large" /> :
            moviesGroupedByDecade.slice(0, 4).map((item) => (
                <MoviesDecadeGroup movieDecadeGroup={item}></MoviesDecadeGroup>
            ))
    )
}

export default MoviesList;