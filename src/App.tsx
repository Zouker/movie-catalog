import React, {useEffect, useState} from 'react';
import {API, searchMovieType} from './api/api';
import {Movie} from './components/Movie/Movie';
import styles from './App.module.css'
import {Search} from './components/Search/Search';

function App() {

    const [title, setTitle] = useState('');
    const [searchResultByType, setSearchResultByType] = useState<searchMovieType | ''>('');
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [type, setType] = useState('')

    const searchByType = async () => {
        try {
            const {data} = await API.searchFilmsByType(title, type, page)
            const {Search, Error, Response, totalResults} = data;
            Response === 'True' ? setSearchResultByType(Search) : setSearchResultByType(Error)
            setTotalResults(totalResults)
        } catch (err) {
            console.log('err', err)
        }
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const prevPage = () => {
        page > 1 && setPage(page - 1)
    }

    const searchMovie = () => {
        setType('movie')
        searchByType()
        setPage(1)
    }

    const searchSeries = () => {
        setType('series')
        searchByType()
        setPage(1)
    }

    useEffect(() => {
        searchByType()
    }, [page, type])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Movie Catalog</h1>
            <div className={styles.searchLine}>
                <Search value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button className={styles.button} onClick={searchMovie}
                >Movie
                </button>
                <button className={styles.button} onClick={searchSeries}
                >Series
                </button>
            </div>
            <div className={styles.container}>
                {Array.isArray(searchResultByType)
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
                    : <div className={styles.notFound}><>{searchResultByType}</>
                    </div>}
            </div>
        </div>
    );
}

export default App;
