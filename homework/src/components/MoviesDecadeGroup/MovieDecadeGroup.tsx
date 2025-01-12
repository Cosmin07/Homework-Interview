import React, { useState } from "react";
import { MovieDecadeGroup } from "../../models/MovieDecadeGroup";
import { Button, Divider, List } from "antd";

type MoviesDecadeGroupProps = {
  movieDecadeGroup: MovieDecadeGroup;
};

const MoviesDecadeGroup: React.FC<MoviesDecadeGroupProps> = ({ movieDecadeGroup }) => {
  const [visibleCount, setVisibleCount] = useState<number>(3);

  return (
    <>
    <Divider orientation="left" orientationMargin={10}>{`${movieDecadeGroup.decade}s`}</Divider>
      <List
        bordered
        dataSource={movieDecadeGroup.movies.slice(0, visibleCount)}
        renderItem={(movie) => (
          <List.Item key={movie.imdbID}>
            {movie.Title} ({movie.Year})
          </List.Item>
        )} />
        {visibleCount < movieDecadeGroup.movies.length && (
        <Button style={{marginTop: "10px"}} type="primary" onClick={() => setVisibleCount(visibleCount + 3)}>
          Load More
        </Button>
      )}
    </>

  );
};

export default MoviesDecadeGroup;
