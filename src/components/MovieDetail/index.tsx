import { Movie } from 'types/movie';
import './styles.css';

type Props = {
    movie: Movie;
}

const MovieDetail = ( { movie }: Props ) => {
    return (
        <div className="base-card  movie-detail-card">
            <div className="movie-detail-image-container">
                <img src={ movie.imgUrl } alt={ movie.title } />
            </div>

            <div className="movie-title-year-subtitle-container">
                <h3>{ movie.title }</h3>

                <h6>{ movie.year }</h6>
                
                <p>{ movie.subTitle }</p>
                
                {/* <div className="movie-detail-title-container">
                </div>

                <div className="movie-detail-year-container">
                </div>

                <div className="movie-detail-subtitle-container">
                </div> */}
            </div>
        </div>
    );
};

export default MovieDetail;
