import { SET_MOVIE_DATA, SET_PAGE } from './movieAction';

const initialState = {
    movieData: null,
    page: 1,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIE_DATA:
            return { ...state, movieData: action.payload };
        case SET_PAGE:
            return { ...state, page: action.payload };
        default:
            return state;
    }
};

export default movieReducer;
