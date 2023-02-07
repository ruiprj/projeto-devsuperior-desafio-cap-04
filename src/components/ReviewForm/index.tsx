import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';

import { requestBackend } from 'util/requests';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
}

type FormData = {
  movieId: number;
  text: string;
}

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const [hasSuccess, setHasSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const params: AxiosRequestConfig = {
      url: '/reviews',
      method: 'POST',
      data: {
        ...formData
      },
      withCredentials: true
    };

    requestBackend(params)
      .then((response) => {
        setValue('text', '');

        onInsertReview(response.data);

        console.log('SUCESSO AO SALVAR', response);
        
        setHasSuccess(true);
      })
      .catch((errors) => {
        console.log('ERRO AO SALVAR', errors);

        setHasSuccess(false);
      });
    
  }

  return (
    <div className="base-card  movie-review-card">
      { hasSuccess && (
        <div className="alert  alert-success">
          Review salvo com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-review-custom-container">
          <input
            {...register("text", {
              required: 'Campo obrigatório'
            })}
            type="text"
            className={`form-control  base-input  ${errors.text ? 'is-invalid' : ''}`}
            placeholder="Deixe sua avaliação aqui"
            name="text"
          />
        </div>
        <div className="invalid-feedback  d-block  invalid-feedback-custom">
          { errors.text?.message }
        </div>

        <div className="btn-review-container">
          <button className="btn  btn-primary  btn-custom">
            <h6>SALVAR AVALIAÇÃO</h6>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
