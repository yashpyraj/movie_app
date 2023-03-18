export const SET_MOVIE_DATA = 'SET_MOVIE_DATA';
export const SET_PAGE = 'SET_PAGE';

export const setMovieData = (data) => {
    return {
        type: SET_MOVIE_DATA,
        payload: data,
    };
};

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page,
    };
};
