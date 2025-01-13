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


    const getDecade = (year: string): number => {
        return Math.floor(+year / 10) * 10;
    }

    const getDecadesFromYearRange = (yearRange: string): number[] => {
        const [startYear, endYear] = yearRange.split('–').map(Number);
        const decades: number[] = [];

        if (endYear === 0) {
            decades.push(getDecade(startYear.toString()));
        } else {
            for (let year = startYear; year <= endYear; year++) {
                const decade = getDecade(year.toString());
                if (!decades.includes(decade)) {
                    decades.push(decade);
                }
            }
        }

        // Sort the unique decades
        decades.sort((a, b) => a - b);
        return decades;
    };

    const groupMoviesByRecentDecades = (movies: Movie[]): MovieDecadeGroup[] => {

        const result: MovieDecadeGroup[] = [];

        //Group movies by decade
        const moviesByDecade: { [key: number]: Movie[] } = {};

        for (const movie of movies) {
            let decades: number[];

            // Check if year do not have years format and have - symbol
            if (movie.Year.includes('–')) {
                decades = getDecadesFromYearRange(movie.Year);
            } else {
                const decade = getDecade(movie.Year);
                decades = [decade];
            }

            // Group movies by each detected decade
            for (const decade of decades) {
                if (!moviesByDecade[decade]) {
                    moviesByDecade[decade] = [];
                }
                moviesByDecade[decade].push(movie);
            }
        }

        //Extract and sort decades in descending order
        const sortedDecadesDescending = Object.keys(moviesByDecade).map(Number).sort((a, b) => b - a);

        for (const decade of sortedDecadesDescending) {
            const sortedMoviesAsc = moviesByDecade[decade].sort((a, b) => +a.Year - +b.Year)
            result.push({ decade, movies: sortedMoviesAsc });
        }

        return result;
    }

    const moviesGroupedByLastRecentsFourDecade = groupMoviesByRecentDecades(movies).slice(0, 4);

    return (
        loading ? <Spin size="large" /> :
            moviesGroupedByLastRecentsFourDecade.map((item) => (
                <MoviesDecadeGroup movieDecadeGroup={item} key={item.decade}></MoviesDecadeGroup>
            ))
    )
}

export default MoviesList;