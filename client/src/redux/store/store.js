// import {combineReducers, applyMiddleware} from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import { createBookReducer } from '../reducers/books/createBookReducer';

// const middlewares = [thunk];

// const reducer = combineReducers({
//     bookCreated: createBookReducer,
// });

// const store = configureStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

// export {store};


import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBookReducer } from '../reducers/books/createBookReducer';
import { bookListReducer } from '../reducers/books/bookListReducer';
import { fetchBookReducer } from '../reducers/books/fetchBookReducer';
import { userReducer } from '../reducers/users/userAuthReducer';
import { deleteBookReducer } from '../reducers/books/deleteBookReducer';
import { updateBookReducer } from '../reducers/books/updateBookReducer';

const middlewares = [thunk];

//Get user from localstorage and save it into our store

const userAuthFromStorage = localStorage.getItem('userAuthData')
  ? JSON.parse(localStorage.getItem('userAuthData'))
  : null;

const initialState = {
  userLogin: { userInfo: userAuthFromStorage },
};
console.log(initialState);

const store = configureStore({
    reducer : {
        bookDetails: fetchBookReducer,
        deleteBook: deleteBookReducer,
        updateBook: updateBookReducer,
        bookCreated: createBookReducer,
        booksList: bookListReducer,
        userLogin: userReducer //login/register
    },
    preloadedState : initialState,
}
);
console.log(store);

export { store };