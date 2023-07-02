import axios from 'axios';
import {
  CREATE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_REQUEST,
  FETCH_USERS_REQUEST,
  BOOK_DETAIL_REQUEST,
  BOOK_DETAIL_SUCCESS,
  BOOK_DETAIL_FAIL,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
} from '../actionTypes';

const createBookAction = bookData => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_BOOK_REQUEST,
      });

      const config = {
        'Content-Type': 'application/json',
      };
      const { data } = await axios.post('/api/books', bookData, config);

      dispatch({
        type: CREATE_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOOK_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

const updateBook = ({ upID, bookData }) => {
  console.log(upID, bookData);
  return async dispatch => {
    try {
      dispatch({
        type: BOOK_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //make http call to our backend
      const { data } = await axios.put('/api/books/' + `${upID}`, bookData, config);
      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_UPDATE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

const fetchBook = id => {
  return async dispatch => {
    try {
      dispatch({
        type: BOOK_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //make http call to our backend
      const { data } = await axios.get('/api/books/' + `${id}`, config);
      console.log(data);
      dispatch({
        type: BOOK_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_DETAIL_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};


//Fetch all books action

const fetchBooksAction = () => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_BOOK_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //make http call to our backend
      const { data } = await axios.get('/api/books', config);
      dispatch({
        type: FETCH_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_BOOK_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

const deleteBook = id => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_BOOK_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //make http call to our backend
      const { data } = await axios.delete('/api/books/' + `${id}`, config);
      dispatch({
        type: DELETE_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_BOOK_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

export { createBookAction, fetchBooksAction, fetchBook, updateBook, deleteBook };
