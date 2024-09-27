// src/services/bookService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// src/services/bookService.ts
export const addBook = async (bookData: any) => {
    await axios.post(API_URL, bookData);
  };

  // src/services/bookService.ts
export const deleteBook = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
  };

  // src/services/bookService.ts
export const updateBook = async (id: number, updatedData: any) => {
    await axios.put(`${API_URL}/${id}`, updatedData);
  };
  