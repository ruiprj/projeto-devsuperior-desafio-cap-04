
import MovieDetail from 'components/MovieDetail';
import MovieFilter from 'components/MovieFilter';

import './styles.css';

const MovieCatalog = () => {

    const movie = {
        "id": 6,
        "title": "A Voz do Silêncio",
        "subTitle": "Koe no Katachi",
        "year": 2016,
        "imgUrl": "https://image.tmdb.org/t/p/w533_and_h300_bestv2/5lAMQMWpXMsirvtLLvW7cJgEPkU.jpg"
    };

    return (
        <div className="base-private-container  catalog-container">

            <div className="container">
                <MovieFilter />

                <div className="row  catalog-card-row">
                    <div className="col-12  col-sm-6  col-xl-3" >
                        <MovieDetail movie={ movie } />
                    </div>

                    <div className="col-12  col-sm-6  col-xl-3" >
                        <MovieDetail movie={ movie } />
                    </div>
                    
                    <div className="col-12  col-sm-6  col-xl-3" >
                        <MovieDetail movie={ movie } />
                    </div>

                    <div className="col-12  col-sm-6  col-xl-3" >
                        <MovieDetail movie={ movie } />
                    </div>
                </div>
            </div>

            {/* <h2>Tela listagem de filmes</h2> tirar o css referente a isso*/}

            {/* <div className="link-container">
                <a href="/movies/1">Acessar /movies/1</a>
                <a href="/movies/2">Acessar /movies/2</a>
            </div> */}
        </div>
    );
}

export default MovieCatalog;
