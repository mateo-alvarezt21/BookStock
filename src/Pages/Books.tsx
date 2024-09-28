// src/pages/Books.tsx
import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../Services/bookService';
import { useNavigate } from 'react-router-dom';

const Books: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
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
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Lista de Libros</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate('/add-book')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar Libro
        </button>
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cambiar a {viewMode === 'list' ? 'Cuadrícula' : 'Lista'}
        </button>
      </div>

      {/* Botón para ir al Home */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300"
        >
          Volver al Home
        </button>
      </div>

      <div className={viewMode === 'list' ? 'space-y-4' : 'grid grid-cols-2 gap-6'}>
        {books.map((book) => (
          <div
            key={book.id}
            className={`p-4 bg-white rounded-lg shadow-md flex flex-col justify-between ${
              viewMode === 'grid' ? 'h-72' : 'h-auto'
            }`}
          >
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-2 truncate">{book.title}</h2>
              <p className="text-gray-700 truncate">Autor: {book.author}</p>
              <p className="text-gray-700 truncate">Género: {book.genre}</p>
              <p className="text-gray-700">Precio: ${book.price}</p>
              <p className="text-gray-700">Cantidad disponible: {book.quantity}</p>
              <p className="text-gray-700 truncate">Descripción: {book.description}</p>  
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => navigate(`/edit-book/${book.id}`)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
