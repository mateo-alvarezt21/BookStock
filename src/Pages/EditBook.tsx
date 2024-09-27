// src/pages/EditBook.tsx
import React, { useEffect, useState } from 'react';
import { getBooks, updateBook } from '../Services/bookService';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Obtener el parámetro id de la URL
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    price: 0,
    quantity: 0,
    description: ''
  });
  const [loading, setLoading] = useState(true);  // Añadir estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const books = await getBooks();
      const bookToEdit = books.find((b: any) => b.id === Number(id));
      if (bookToEdit) {
        setBook(bookToEdit);  // Precargar los datos del libro en el formulario
        setLoading(false);  // Quitar el estado de carga
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook(Number(id), book);
      navigate('/books');  // Redirigir a la lista de libros después de actualizar
    } catch (error) {
      console.error("Error al actualizar el libro: ", error);
    }
  };

  if (loading) {
    return <div>Cargando datos del libro...</div>;  // Mostrar un indicador de carga mientras se cargan los datos
  }

  return (
    <div>
      <h1>Editar Libro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </label>
        <label>
          Autor:
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
        </label>
        <label>
          Género:
          <input
            type="text"
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            required
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={book.price}
            onChange={(e) => setBook({ ...book, price: Number(e.target.value) })}
            required
          />
        </label>
        <label>
          Cantidad disponible:
          <input
            type="number"
            value={book.quantity}
            onChange={(e) => setBook({ ...book, quantity: Number(e.target.value) })}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            required
          />
        </label>
        <button type="submit">Actualizar Libro</button>
      </form>
    </div>
  );
};

export default EditBook;
