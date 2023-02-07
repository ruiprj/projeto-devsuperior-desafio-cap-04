
import './styles.css';

const MovieCatalog = () => {
    return (
        <div className="base-private-container  catalog-container">
            <h2>Tela listagem de filmes</h2>

            <div className="link-container">
                <a href="/movies/1">Acessar /movies/1</a>
                <a href="/movies/2">Acessar /movies/2</a>
            </div>
        </div>
    );
}

export default MovieCatalog;
