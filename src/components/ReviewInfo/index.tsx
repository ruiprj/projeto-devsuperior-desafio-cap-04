import { Movie } from 'types/movie';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import './styles.css';

type Props = {
  movieId: string;
};

const ReviewInfo = ({ movieId }: Props) => {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      method: 'GET',
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  return (
    <div className="base-card  review-info-detail-card">
      <div className="review-info-image-container">
        <img src={movie?.imgUrl} alt={movie?.title} />
      </div>

      <div className="review-info-title-year-subtitle-synopsis-container">
        <div className="review-info-title-year-subtitle-container">
            <h3>{movie?.title}</h3>

            <h6>{movie?.year}</h6>

            <p>{movie?.subTitle}</p>
        </div>

        <div className="review-info-synopsis-container">
            <p>{movie?.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;
