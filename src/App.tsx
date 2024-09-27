// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Books from './Pages/Books';
import AddBook from './Pages/AddBook';
import EditBook from './Pages/EditBook';
import { useAuth } from './Context/AuthContext';

// Componente para proteger las rutas
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Ruta pública: página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Ruta pública: página de login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida: solo accesible si el usuario está autenticado */}
        <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />

        {/* Ruta protegida: página para agregar un nuevo libro */}
        <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />

        {/* Ruta protegida: página para editar un libro */}
        <Route path="/edit-book/:id" element={<PrivateRoute><EditBook /></PrivateRoute>} />

        {/* Ruta por defecto: página no encontrada */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </div>
  );
};

export default App;
