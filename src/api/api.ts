import axios from 'axios';

const instance = {
    baseURL: 'https://www.omdbapi.com',
};
const key = '9fe4584a';
const axiosInstance = axios.create(instance);

export const API = {
    searchFilmsByType: (title: string, type: string, page: number) => {
        const query = `/?apikey=${key}&type=${type}&s=${title}&page=${page}`
        return axiosInstance.get(instance.baseURL + query)
    }
};

export type searchType = {
    Search: searchMovieType[]
    totalResults: number
}

export type searchMovieType = {
    Title: string
    Year: string
    Poster: string
    imdbID: string
}
