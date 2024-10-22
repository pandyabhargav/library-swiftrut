import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'; 

const EditBook = () => {
    const { id } = useParams(); 
    const [book, setBook] = useState(null);
    const [title, setTitle] = useState(''); 
    const [author, setAuthor] = useState(''); 
    const [genre, setGenre] = useState(''); 
    const [imageUrl, setImageUrl] = useState(''); 
    const [error, setError] = useState(null); 
    const [message, setMessage] = useState(null); 
    const navigate = useNavigate(); 

    const fetchBook = async () => {
        if (!id) {
            console.error('No book ID provided');
            setError('No book ID provided');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/books/${id}`);
            setBook(response.data); 
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setGenre(response.data.genre);
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error('Error fetching book:', error);
            setError('Error fetching book. Please try again.'); 
        }
    };

    useEffect(() => {
        fetchBook();
    }, [id]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/api/books/edit/${id}`, {
                title,
                author,
                genre,
                imageUrl,
            });
            setMessage('Book updated successfully!');
            setTimeout(() => {
                navigate('/'); 
            });
        } catch (error) {
            console.error('Error updating book:', error);
            setError('Failed to update book. Please try again.');
        } finally {
            setLoading(false); 
        }
    };


    return (
        <Container className="add-book-container pt-120">
            <h2 className="text-center">Edit Book</h2>
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
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter author name" 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter genre" 
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicImageUrl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter image URL" 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button type="submit" className="add-book-button w-100">
                    Update Book
                </Button>
            </Form>

            <p className="text-center mt-3">
                Go back to <a href="/">Books List</a>
            </p>
        </Container>
    );
};

export default EditBook;
