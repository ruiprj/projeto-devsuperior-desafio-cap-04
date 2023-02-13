import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';

import { requestBackend } from 'util/requests';
import './styles.css';

type GenreFilterData = {
  genre: Genre;
}

const MovieFilter = () => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>();

  const {
    register,
    handleSubmit,
    control
  } = useForm<GenreFilterData>();

  const onSubmit = (formData: GenreFilterData) => {
    console.log("ENVIOU", formData);
  };

  useEffect(() => {
    requestBackend({
      url: '/genres',
      withCredentials: true
    })
    .then(response => {
      setSelectGenres(response.data);
    })
  }, []);

  return (
    <div className="base-card  movie-filter-card">
      <form onSubmit={ handleSubmit(onSubmit) } className="movie-filter-form">
        <div className="movie-filter-genre-container">
          <Controller 
            name="genre"
            control={ control }
            render={({ field }) => (
              <Select 
                { ...field }
                options={ selectGenres }
                isClearable
                classNamePrefix="genre-filter-select"
                getOptionLabel={ (genre: Genre) => genre.name }
                getOptionValue={ (genre: Genre) => String(genre.id) }
              />
            )}
          />
          
          {/* <select name="" id="">
            <option value="">Terror</option>
          </select> */}
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
