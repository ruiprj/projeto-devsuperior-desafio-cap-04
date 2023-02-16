import { AxiosRequestConfig } from 'axios';
import ReviewForm from 'components/ReviewForm';
import ReviewInfo from 'components/ReviewInfo';
import ReviewList from 'components/ReviewList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      method: 'GET',
      withCredentials: true
    };

    requestBackend(params).then((response) => {

      setReviews(response.data);
      
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];

    clone.push(review);
    
    setReviews(clone);
  }

  return (
    <div className="container">
      <div className="base-private-container  movie-details-container">
        <ReviewInfo movieId={ movieId } />

        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={ movieId } onInsertReview={ handleInsertReview } />
        )}

        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default MovieDetails;
