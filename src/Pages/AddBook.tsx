// src/pages/AddBook.tsx
import React, { useState } from 'react';
import { addBook } from '../Services/bookService';
import { useNavigate } from 'react-router-dom';

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');  // Campo de descripción
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook({ title, author, genre, price, quantity, description });
      navigate('/books');  // Redirigir a la lista de libros después de agregar
    } catch (error) {
      console.error("Error al agregar el libro: ", error);
    }
  };

  return (
    <div>
      <h1>Agregar Libro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Autor:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label>
          Género:
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </label>
        <label>
          Precio:
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </label>
        <label>
          Cantidad disponible:
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
        </label>
        <label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

export default AddBook;
