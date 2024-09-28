import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

export const getBooks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/books'); // JSON Server
    return response.data; 
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    throw error;
  }
};

export const addBook = async (bookData: any) => {
    await axios.post(API_URL, bookData);
  };

export const deleteBook = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
  };

export const getBookById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    throw error;
  }
};

export const updateBook = async (id: string, updatedBook: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedBook);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    throw error;
  }
}; 
  