import { AxiosRequestConfig } from 'axios';
import MovieDetail from 'components/MovieDetail';
import MovieFilter from 'components/MovieFilter';
import { useEffect, useState } from 'react';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        genreId: 0,
        page: 0,
        size: 4,
        sort: 'title',
      },
      withCredentials: true
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      });
  }, []);

  return (
    <div className="base-private-container  catalog-container">
      <div className="container">
        <MovieFilter />

        <div className="row">
            
          {page?.content.map((movie) => (
            <div key={movie.id} className="col-12  col-sm-6  col-xl-3">
              <MovieDetail movie={movie} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default MovieCatalog;
