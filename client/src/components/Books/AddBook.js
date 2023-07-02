import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createBookAction } from '../../redux/actions/books/bookActions';

const AddBook = ({ }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const userLogin = useSelector(state => state.userLogin);

  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const state = useSelector(state => {
    return state.bookCreated;
  });

  const { loading, book, error } = state;

  const handleFormSubmit = e => {
      e.preventDefault();
  
      const data = {
        title,
        genre,
        author,
        description,
        publicationDate,
        createdBy: userInfo._id
      };
      dispatch(createBookAction(data));
      navigate('/books');
  };

  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          <h1 className='text-center'>Add Book</h1>

          <form onSubmit={handleFormSubmit}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Title </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Book Title'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Genre </label>
                <input
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Genre'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Author </label>
                <input
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Author name'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Description </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Book Description'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Publication Date </label>
                <input
                  value={publicationDate}
                  onChange={e => setPublicationDate(e.target.value)}
                  type='Date'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                />
              </div>
              <button type='submit' className='btn btn-info m-auto'>
                Create Book
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

