import {AppThunk} from './store';
import {API, searchMovieType} from '../api/api';

const initialState = {
    movies: [] as searchMovieType[],
    totalResults: 0,
    title: '',
    page: 1,
    movieType: '',
    isLoading: false,
    isError: false,
}

export const moviesReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'GET-MOVIES':
            return {...state, movies: action.movies}
        case 'SET-RESULTS':
            return {...state, totalResults: action.totalResults}
        case 'SET-TITLE':
            return {...state, title: action.title}
        case 'SET-PAGE':
            return {...state, page: action.page}
        case 'SET-TYPE':
            return {...state, movieType: action.movieType}
        case 'SET-IS-LOADING':
            return {...state, isLoading: action.isLoading}
        case 'SET-IS_ERROR':
            return {...state, isError: action.isError}
        default:
            return state
    }
}

// thunks
export const fetchMovies = (title: string, type: string, page: number): AppThunk => async dispatch => {
    dispatch(setIsLoading(true))
    dispatch(setTitle(title.trim()))
    dispatch(setPage(page))
    dispatch(setType(type))
    dispatch(setIsError(false))
    try {
        const {data} = await API.searchFilmsByType(title, type, page)
        if (data.Response === 'False') {
            dispatch(setIsError(true))
            dispatch(getMovies(data.Error))
            dispatch(setTotalResults(0))
            dispatch(setTitle(''))
        } else {
            dispatch(getMovies(data.Search))
            dispatch(setTotalResults(data.totalResults))
        }
    } catch (err) {
        dispatch(setIsError(true))
    } finally {
        dispatch(setIsLoading(false))
    }
}

// actions
export const getMovies = (movies: []) => ({type: 'GET-MOVIES', movies} as const)
export const setTotalResults = (totalResults: number) => ({
    type: 'SET-RESULTS',
    totalResults
} as const)
export const setTitle = (title: string) => ({type: 'SET-TITLE', title} as const)
export const setPage = (page: number) => ({type: 'SET-PAGE', page} as const)
export const setType = (movieType: string) => ({type: 'SET-TYPE', movieType} as const)
export const setIsLoading = (isLoading: boolean) => ({
    type: 'SET-IS-LOADING',
    isLoading
} as const)
export const setIsError = (isError: boolean) => ({type: 'SET-IS_ERROR', isError} as const)

// types
type InitialStateType = typeof initialState
export type ActionType =
    ReturnType<typeof getMovies>
    | ReturnType<typeof setTotalResults>
    | ReturnType<typeof setTitle>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setType>
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setIsError>