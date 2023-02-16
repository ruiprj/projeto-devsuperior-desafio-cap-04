import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';

import { requestBackend } from 'util/requests';
import './styles.css';

export type GenreFilterData = {
  genre: Genre | null;
}

type Props = {
  onSubmitFilter : (data: GenreFilterData) => void;
}

const MovieFilter = ({ onSubmitFilter }: Props ) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control
  } = useForm<GenreFilterData>();

  const onSubmit = (formData: GenreFilterData) => {
    onSubmitFilter(formData);
    // console.log("ENVIOU", formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);

    const obj : GenreFilterData = {
      genre: getValues('genre')
    };

    onSubmitFilter(obj);
    // console.log("ENVIOU", obj);
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
                placeholder="Selecione..."

                onChange={ value => handleChangeGenre(value as Genre) }

                getOptionLabel={ (genre: Genre) => genre.name }
                getOptionValue={ (genre: Genre) => String(genre.id) }
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
