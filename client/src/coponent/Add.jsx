import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setMessage('');
    setError('');

    
    const newBook = {
      title,
      author,
      genre,
      imageUrl,
    };

    try {
      
      const response = await fetch('http://localhost:3000/api/books/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook), 
      });

     
      const data = await response.json();

      if (response.ok) {
       
        setMessage('Book added successfully!');
        setTitle('');
        setAuthor('');
        setGenre('');
        setImageUrl('');
        
        
        navigate('/'); 
      } else {
       
        setError(data.message || 'Failed to add the book.');
      }
    } catch (error) {
     
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className="add-book-container pt-120">
      <h2 className="text-center">Add New Book</h2>
      {message && <Alert variant="success" className="alert-message">{message}</Alert>}
      {error && <Alert variant="danger" className="alert-message">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter book title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter author name" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter genre" 
            value={genre}
            onChange={(e) => setGenre(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter image URL" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
          />
        </Form.Group>

        <Button type="submit" className="add-book-button w-100">
          Add Book
        </Button>
      </Form>

      <p className="text-center mt-3">
        Go back to <a href="/">Books List</a>
      </p>
    </Container>
  );
};

export default AddBook;
