// src/pages/Books.tsx
import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../Services/bookService';
import { useNavigate } from 'react-router-dom';

const Books: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');  // Estado para alternar entre lista y cuadrícula
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const booksList = await getBooks();
      setBooks(booksList);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este libro?');
    if (confirmDelete) {
      try {
        await deleteBook(id);
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Error al eliminar el libro: ", error);
      }
    }
  };

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  return (
    <div>
      <h1>Lista de Libros</h1>
      <button onClick={() => navigate('/add-book')}>Agregar Libro</button>
      <button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
        Cambiar a {viewMode === 'list' ? 'Cuadrícula' : 'Lista'}
      </button>
      <div className={viewMode === 'list' ? 'list-view' : 'grid-view'}>
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <p>Autor: {book.author}</p>
            <p>Género: {book.genre}</p>
            <p>Precio: ${book.price}</p>
            <p>Cantidad disponible: {book.quantity}</p>
            <p>Descripción: {book.description}</p>  {/* Aquí se muestra la descripción */}
            <button onClick={() => navigate(`/edit-book/${book.id}`)}>Editar</button>
            <button onClick={() => handleDelete(book.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
