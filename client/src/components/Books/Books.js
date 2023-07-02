import BootstrapTable from 'react-bootstrap-table-next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Route } from "react-router-dom";
import { fetchBooksAction } from '../../redux/actions/books/bookActions';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Loading from '../Loading/Loading';
import Home from '../Home/Home';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import BookDetail from './BookDetail';

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //dispatch action
    dispatch(fetchBooksAction());
  }, [dispatch]);

  //GRAB THE DATA FROM OUR STORE
  const { books, loading } = useSelector(state => {
    return state.booksList;
  });
  console.log(books);
  console.log(loading);

  //const { SearchBar } = Search;
  const columns = [{
    dataField: 'title',
    text: 'Book Name',
    sort: true
  }, {
    dataField: 'genre',
    text: 'Genre',
    sort: true
  }, {
    dataField: 'author',
    text: 'Author',
    sort: true
  }, {
    dataField: 'description',
    text: 'Description',
    sort: false
  }, {
    dataField: 'publicationDate',
    text: 'Publication Date',
    sort: true
  }];
  
  const defaultSorted = [{
    dataField: 'title',
    order: 'desc'
  }];

  console.log(columns);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      //console.log(e, row, rowIndex, '/books/' + `${row._id}`);
      navigate('/books/' + `${row._id}`)
      //<Route exact path='/' element={<Home/>} />
    }
  };
  
  // return (
  //     <div className="container" id="booksList">
  //       <div className="row mb-5">
  //         <div className="col-lg-12 text-center">
  //           <h1 className="mt-5">Books List</h1>
  //         </div>
  //       </div>
  //       <Table striped bordered hover>
  //         <thead>
  //           <tr>
  //             <th>Book Name</th>
  //             <th>Genre</th>
  //             <th>Author</th>
  //             <th>Description</th>
  //             <th>Publication Date</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {books.map((ele, rowIndex) => {
  //             return (
  //               <tr key={`tr-${rowIndex}`}>
  //                 <td>{ele.title}</td>
  //                 <td>{ele.genre}</td>
  //                 <td>{ele.author}</td>
  //                 <td>{ele.description}</td>
  //                 <td>{ele.publicationDate}</td>
  //                 <td>{ele.time}</td>
  //                 <td>
  //                   <a href="#" onClick={(e) => toEdit(e, ele, rowIndex)}>
  //                     Edit
  //                   </a>{' '}
  //                   <a
  //                     href="#"
  //                     onClick={(e) => {
  //                       toDelete(e, rowIndex);
  //                     }}
  //                   >
  //                     Delete
  //                   </a>
  //                 </td>
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </Table>
  //     </div>
  // );
  return (
    <>
    {loading ? (<Loading/>) : (
      <>
        {!books ? (
          <>
          <BootstrapTable
            bootstrap4
            keyField="title"
            data={ [] }
            columns={ columns }
            noDataIndication="Table is Empty"
          />
          </>
        ) : (
          <>
          <BootstrapTable
            bootstrap4
            keyField="title"
            data={ books }
            columns={ columns }
            rowEvents={ rowEvents }
            defaultSorted={ defaultSorted } 
            pagination={paginationFactory()}
          />
          </>
        )}
      </>
    )}
    </>
  );
};
//   return (
//     <div>
//       <div className='row'>
//         <div className='col'>
//           <table className='table table-hover'>
//             <thead>
//               <tr>
//                 <th scope='col'>Author</th>
//                 <th scope='col'>Book Name</th>
//                 <th scope='col'>Action</th>
//                 <th scope='col'>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <Loading />
//               ) : (
//                 <>
//                   {books &&
//                     books.map(book => {
//                       return (
//                         <>
//                           {/* Map through here */}
//                           <tr className='table-dark'>
//                             <th scope='row'>{book.title}</th>
//                             <td>{book.author}</td>
//                             <td>
//                               <i
//                                 className='fas fa-trash '
//                                 style={{
//                                   color: 'red',
//                                   cursor: 'progress',
//                                 }}></i>
//                             </td>
//                             <td>
//                               <i
//                                 className='far fa-edit'
//                                 style={{
//                                   color: 'yellow',
//                                   cursor: 'progress',
//                                 }}></i>
//                             </td>
//                           </tr>
//                           {/* End of map thr */}
//                         </>
//                       );
//                     })}
//                 </>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Books;
