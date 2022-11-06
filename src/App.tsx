import React from 'react';
import {Movie} from './components/Movie/Movie';
import styles from './App.module.css'
import {Search} from './common/Search/Search';
import {fetchMovies, setTitle} from './redux/movies-reducer';
import {useAppDispatch, useAppSelector} from './redux/store';
import {Preloader} from './common/Preloader/Preloader';

function App() {
    const dispatch = useAppDispatch()
    const searchResultByType = useAppSelector(state => state.movies.movies)
    const totalResults = useAppSelector(state => state.movies.totalResults)
    const page = useAppSelector(state => state.movies.page)
    const type = useAppSelector(state => state.movies.movieType)
    const isLoading = useAppSelector(state => state.movies.isLoading)
    const isError = useAppSelector(state => state.movies.isError)
    const title = useAppSelector(state => state.movies.title)

    const nextPage = () => {
        dispatch(fetchMovies(title.trim(), type, page + 1))
    }

    const prevPage = () => {
        dispatch(fetchMovies(title.trim(), type, page - 1))
    }

    const searchMovie = () => {
        dispatch(fetchMovies(title.trim(), 'movie', 1))
    }

    const searchSeries = () => {
        dispatch(fetchMovies(title.trim(), 'series', 1))
    }

    return (
        <div>
            <h1 className={styles.title}>Movie Catalog</h1>
            <div className={styles.searchLine}>
                <Search value={title}
                        onChange={(e) => dispatch(setTitle(e.currentTarget.value))}/>
                <button className={styles.button} onClick={searchMovie}
                >Movie
                </button>
                <button className={styles.button} onClick={searchSeries}
                >Series
                </button>
            </div>
            {isLoading && <Preloader/>}
            <div className={styles.container}>
                {!isLoading && searchResultByType.length && Array.isArray(searchResultByType)
                    ? <div>
                        {totalResults} results found
                        <div className={styles.catalog}>
                            {searchResultByType.map(el =>
                                <Movie key={el.imdbID}
                                       imdbID={el.imdbID}
                                       title={el.Title} year={el.Year}
                                       poster={el.Poster}
                                />)}
                        </div>
                        <div className={styles.buttonBlock}>
                            <button className={styles.button} disabled={page === 1}
                                    onClick={prevPage}>Prev
                            </button>
                            <button className={styles.button}
                                    disabled={page * 10 === Math.ceil(totalResults / 10) * 10}
                                    onClick={nextPage}>Next
                            </button>
                        </div>
                    </div>
                    : isError &&
                    <div className={styles.notFound}>
                        <>{searchResultByType}</>
                    </div>}
            </div>
        </div>
    );
}

export default App;
