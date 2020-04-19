import * as actionTypes from './actionTypes';

export const addBook = (bookData) => {
    return {
        type: actionTypes.ADD_BOOK,
        bookData: bookData
    };
};

export const editBook = (updatedBooks) => {
    return {
        type: actionTypes.EDIT_BOOK,
        updatedBooks: updatedBooks
    };
};

export const fetchBooks = (storedBooks)=>{
    return {
        type: actionTypes.FETCH_BOOKS,
        storedBooks: storedBooks
    };
};









