import React, { useEffect, useState } from 'react';
import { getBookById, updateBook } from '../Services/bookService'; 
import { useParams, useNavigate } from 'react-router-dom';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    price: 0,
    quantity: 0,
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) {
          setError('ID del libro no proporcionado');
          setLoading(false);
          return;
        }
        const fetchedBook = await getBookById(id);  
        console.log('Libro encontrado:', fetchedBook);  

        if (fetchedBook) {
          setBook(fetchedBook);  
        } else {
          setError('No se encontró el libro');
        }
      } catch (err) {
        setError('Error al cargar los datos del libro');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBook(id, book); 
      } else {
        setError('ID del libro no proporcionado');
      }
      navigate('/books');  
    } catch (error) {
      setError('Error al actualizar el libro');
      console.error("Error al actualizar el libro: ", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Cargando datos del libro...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Editar Libro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Título:</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Autor:</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Género:</label>
          <input
            type="text"
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Precio:</label>
          <input
            type="number"
            value={book.price}
            onChange={(e) => setBook({ ...book, price: Number(e.target.value) })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Cantidad disponible:</label>
          <input
            type="number"
            value={book.quantity}
            onChange={(e) => setBook({ ...book, quantity: Number(e.target.value) })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Descripción:</label>
          <textarea
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Actualizar Libro
        </button>
      </form>
    </div>
  );
};

export default EditBook;
