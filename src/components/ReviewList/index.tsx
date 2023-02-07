import MainImage from 'assets/images/star-image.png';
import { Review } from 'types/review';

import './styles.css';

type Props = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: Props) => {
  return (
    <div className="base-card  movie-review-list-card">

      {reviews.map((item) => (

        <div className="movie-review-list-container" key={item.id}>
          <div className="reviewer-info-container">
            <img src={MainImage} alt="Imagem principal" />

            <p>{item.user.name}</p>
          </div>

          <div className="review-detail-card">
            <p>{item.text}</p>
          </div>
        </div>

      ))}

    </div>
  );
};

export default ReviewList;
