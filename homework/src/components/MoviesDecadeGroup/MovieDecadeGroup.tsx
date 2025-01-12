import React from "react";
import { MovieDecadeGroup } from "../../models/MovieDecadeGroup";
import { Divider, List } from "antd";

type MoviesDecadeGroupProps = {
  movieDecadeGroup: MovieDecadeGroup;
};

const MoviesDecadeGroup: React.FC<MoviesDecadeGroupProps> = ({ movieDecadeGroup }) => {

  return (
    <>
    <Divider orientation="left" orientationMargin={10}>{`${movieDecadeGroup.decade}s`}</Divider>
      <List
        bordered
        dataSource={movieDecadeGroup.movies.slice(0, 3)}
        renderItem={(movie) => (
          <List.Item key={movie.imdbID}>
            {movie.Title} ({movie.Year})
          </List.Item>
        )} />
    </>

  );
};

export default MoviesDecadeGroup;
