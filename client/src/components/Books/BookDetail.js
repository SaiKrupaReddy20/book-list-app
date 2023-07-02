import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, fetchBook, updateBook } from '../../redux/actions/books/bookActions';

const BookDetail = ({ }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);
  console.log(id);
  //Get the book details and fill it in the form
  const bookDetails = useSelector(state => state.bookDetails);
  console.log(bookDetails)

  const userLogin = useSelector(state => state.userLogin);
  console.log(userLogin);

  const { userInfo } = userLogin;

  const { book, loading } = bookDetails;
  console.log(book);

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState(new Date());


  useEffect(() => {
    console.log("hsjsj");
    if(book && book.title) {
      setTitle(book.title);
    }
    if(book && book.genre) {
      setGenre(book.genre);
    }
    if(book && book.author) {
      setAuthor(book.author);
    }
    if(book && book.description) {
      setDescription(book.description);
    }
    if(book && book.publicationDate) {
      setPublicationDate(new Date(book.publicationDate));
    }
  }, [book]);

  
  //dispatch action
  

  const deleteHandler = () => {
    dispatch(deleteBook(book._id));
    navigate('/books');
  }
  const formSubmitHandler = e => {
    const bookData = {
      title,
      genre,
      author,
      description,
      publicationDate
    };
    const upID = book._id;
    console.log(bookData, book._id);
    e.preventDefault();
    dispatch(updateBook({ upID, bookData }));
    navigate('/books');
  };
  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          {book ? (
            <>
              {book.createdBy === userInfo._id ? (
                <div>
                  <h3 className="text-left">Book Details</h3>
                  <Link
                    onClick={deleteHandler}
                    className='btn btn-dark m-auto'
                    to='/'>
                    Delete Book
                  </Link>
                </div>
              ) : (
                <h3 className='text-left'>Book Details</h3>
              )}
              <form onSubmit={formSubmitHandler}>
                <fieldset>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Book Name </label>
                    {book.createdBy === userInfo._id ? 
                      (
                        <input
                          value={title}
                          style={{background: '#FFFFFF'}}
                          onChange={e => {console.log(e); setTitle(e.target.value)}}
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                          placeholder='Book Name'
                        />
                      ) : (
                        <input
                          value={title}
                          style={{background: '#FFFFFF'}}
                          readOnly
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                        />
                      )
                    }
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Genre </label>
                    {book.createdBy === userInfo._id ? 
                      (
                        <input
                          value={genre}
                          style={{background: '#FFFFFF'}}
                          onChange={e => setGenre(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                          placeholder='Genre'
                        />
                      ) : (
                        <input
                          value={genre}
                          style={{background: '#FFFFFF'}}
                          readOnly
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                        />
                      )
                    }
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Author </label>
                    {book.createdBy === userInfo._id ? 
                      (
                        <input
                          value={author}
                          style={{background: '#FFFFFF'}}
                          onChange={e => setAuthor(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                          placeholder='Author name'
                        />
                      ) : (
                        <input
                          value={author}
                          style={{background: '#FFFFFF'}}
                          readOnly
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                        />
                      )
                    }
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Description </label>
                    {book.createdBy === userInfo._id ? 
                      (
                        <textarea
                          value={description}
                          style={{background: '#FFFFFF'}}
                          onChange={e => setDescription(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                          placeholder='Description'
                        />
                      ) : (
                        <textarea
                          value={description}
                          style={{background: '#FFFFFF'}}
                          readOnly
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                        />
                      )
                    }
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Publication Date </label>
                    {book.createdBy === userInfo._id ? 
                      (
                        <input
                          value={publicationDate}
                          style={{background: '#FFFFFF'}}
                          onChange={e => setPublicationDate(e.target.value)}
                          type='Date'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                        />
                      ) : (
                        <input
                          value={publicationDate}
                          style={{background: '#FFFFFF'}}
                          readOnly
                          type='Date'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                        />
                      )
                    }
                  </div>
                  {book.createdBy === userInfo._id ? 
                    (
                      <button type='submit' className='btn btn-dark m-auto'>
                        Update Book
                      </button>
                    ) : (
                      null
                    )
                  }
                </fieldset>
              </form>
            </>
          ) : (
            'No'
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
