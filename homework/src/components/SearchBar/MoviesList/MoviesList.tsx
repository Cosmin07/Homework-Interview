import { List, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Movie } from '../../../models/Movie';
import MovieService from './../../../services/movies-service.service';

const { Text } = Typography;

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

    return (
        loading ? <Spin size="large" /> :
            <List
                header={<div>Movies List</div>}
                bordered
                dataSource={movies}
                renderItem={(item) => (
                    <List.Item>
                        <Text strong>{item.Title}</Text>
                        <Text >{item.Year}</Text>
                    </List.Item>
                )}
            />
    )
}

export default MoviesList;