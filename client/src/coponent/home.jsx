import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]); 
  const [recentlyReturned, setRecentlyReturned] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books/all');
      setBooks(response.data); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleEdit = () => {
    if (selectedBook && selectedBook._id) {
      navigate(`/edit/${selectedBook._id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${selectedBook.title}"?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/books/delete/${selectedBook._id}`);
        fetchBooks(); 
        handleClose();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleBorrow = (book) => {
    
    setBooks((prev) => prev.filter((b) => b._id !== book._id));
    setRecentlyReturned((prev) => [...prev, { ...book, borrowed: true }]);
  };

  const handleReturn = (book) => {
    
    setRecentlyReturned((prev) => prev.filter((b) => b._id !== book._id));
    setBooks((prev) => [...prev, { ...book, borrowed: false }]); 
  };

  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecentlyReturned = recentlyReturned.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Container className='contain'>
        <Row>
          <div className='col-12 d-flex flex-wrap justify-content-center align-items-center'>
            <div className='col-4'>
              <div className='links p-2'>
                <Link to='/add' className='mx-3 p-2'>Add Book</Link>
              </div>
              <div className='links p-2'>
                <a href="#" className='mx-3 p-2 disabled-link' aria-disabled="true">Author</a>
                <Link to='/subject' className='mx-3 p-2 disabled-link' aria-disabled="true">Subject</Link>
              </div>
              <div className='links p-2'>
                <a href="#" className='mx-3 p-2 disabled-link' aria-disabled="true">List</a>
                <a href="#" className='mx-3 p-2 disabled-link' aria-disabled="true">Recently</a>
                <a href="#" className='mx-3 p-2 disabled-link' aria-disabled="true">About Us</a>
              </div>
            </div>
            <div className='col-4 d-flex flex-wrap justify-content-center align-items-center'>
              <div className='logo'>
                <img src="/images/logo.webp" alt="" />
              </div>
            </div>
            <div className="col-4 d-flex flex-wrap justify-content-center align-items-end p-3">
              <input
                type="text"
                className="form-control rounded-pill border-0 px-4"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
        </Row>
      </Container>

      <Container className='p-0'>
        <div className='baner mb-5'>
          <img src="images/baner.jpg" className='rounded-3' />
        </div>
      </Container>



      <Container className="text-center banner rounded-3 p-3">
        <h2>Open Library is yours to explore, collect & borrow.</h2>
        <p>Over 1,000,000 free ebook titles available.</p>
      </Container>

      <Container className="mt-4 p-3">
        <h2 className="section-title">Books to Read</h2>
        <Row>
          {filteredBooks.map((book, index) => (
            <Col key={index} xs={12} md={3} className="mb-4 d-flex justify-content-center">
              <Card className="custom-card"> 
                <Card.Img variant="top" src={book.imageUrl} />
                <div className="buttons d-flex justify-content-around mt-2 mb-2">
                  <button className='btn btn-outline-success' onClick={() => handleView(book)}>View</button>
                  <button className='btn btn-outline-info' onClick={() => handleBorrow(book)}>Borrow</button>
                </div>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-4 p-3">
        <h2 className="section-title">Recently Borrowed</h2>
        <Row>
          {filteredRecentlyReturned.map((book, index) => (
            <Col key={index} xs={12} md={3} className="mb-4 d-flex justify-content-center">
              <Card className="custom-card"> {/* Apply custom class here */}
                <Card.Img variant="top" src={book.imageUrl} />
                <div className="buttons d-flex justify-content-around mt-2 mb-2">
                  <button className='btn btn-outline-success' onClick={() => handleView(book)}>View</button>
                  <button className='btn btn-outline-warning' onClick={() => handleReturn(book)}>Return</button>
                </div>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-4 p-3">
        <Row className="text-center">
          <Col>
            <h3>3,767,307</h3>
            <p>Unique Visitors</p>
          </Col>
          <Col>
            <h3>9,703</h3>
            <p>New Members</p>
          </Col>
          <Col>
            <h3>31,303</h3>
            <p>Catalog Edits</p>
          </Col>
          <Col>
            <h3>918</h3>
            <p>Lists Created</p>
          </Col>
          <Col>
            <h3>3,336</h3>
            <p>eBooks Borrowed</p>
          </Col>
        </Row>
      </Container>

      {selectedBook && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBook.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='card-img'>
              <img src={selectedBook.imageUrl} alt={selectedBook.title} className="img-fluid mb-3" />
            </div>
            <p><strong>Genre:</strong> {selectedBook.genre || 'genre'}</p>
            <p><strong>Author:</strong> {selectedBook.author || 'Author Name'}</p>
            <p><strong>Publication Year:</strong> {'1925'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="warning" onClick={handleEdit}>Edit</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
