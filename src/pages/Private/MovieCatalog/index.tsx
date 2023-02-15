import { AxiosRequestConfig } from 'axios';
import MovieDetail from 'components/MovieDetail';
import MovieFilter, { GenreFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: GenreFilterData;
}

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
    {
      activePage: 0,
      filterData: {genre: null}
    }
  );

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
  };

  const handleSubmitFilter = (data: GenreFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        genreId: controlComponentsData.filterData.genre?.id,
        page: controlComponentsData.activePage,
        size: 4,
        sort: 'title'
      },
      withCredentials: true
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="base-private-container  catalog-container">
      <div className="container">
        <MovieFilter onSubmitFilter={handleSubmitFilter} />

        <div className="row">
            
          {page?.content.map((movie) => (
            <div key={movie.id} className="col-12  col-sm-6  col-xl-3">
              <MovieDetail movie={movie} />
            </div>
          ))}

        </div>

        <Pagination 
          forcePage={ page?.number }
          pageCount={ page ? page.totalPages : 0 } 
          range={ 3 }
          onChange={ handlePageChange }
        />
      </div>
    </div>
  );
};

export default MovieCatalog;
