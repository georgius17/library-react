import * as actionTypes from '../actions/actionTypes';

const initialState = {
    books:[]
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_BOOK:
            return {
                ...state,
                books: state.books.concat({...action.bookData})
            }
        case actionTypes.EDIT_BOOK:
            return {
                ...state,
                books: action.updatedBooks
            }
        case actionTypes.FETCH_BOOKS:
            return {
                ...state,
                books: action.storedBooks
            }
            
        default:
            return state
    }
};

export default reducer;