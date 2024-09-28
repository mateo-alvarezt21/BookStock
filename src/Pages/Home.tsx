import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaSync } from "react-icons/fa";  

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();  

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const interestingFacts = [
    "📖 El libro más caro del mundo cuesta más de 30 millones de dólares.",
    "📚 El récord Guinness al autor más traducido lo tiene Agatha Christie.",
    "📗 La 'Biblia de Gutenberg' fue el primer libro impreso en masa usando tipos móviles.",
    "📙 ¿Sabías que se venden más de 2 millones de libros al día en todo el mundo?",
    "📕 Los primeros libros de bolsillo aparecieron en los años 30, ¡y revolucionaron la lectura!",
    "📘 El primer libro impreso en inglés fue publicado en 1473 por William Caxton.",
    "📒 Las primeras bibliotecas eran privadas y solo los ricos tenían acceso a los libros.",
    "📑 El término 'libro de bolsillo' se refiere a libros impresos en tamaños pequeños para facilitar su transporte.",
    "📙 El libro más vendido de la historia es la Biblia, con más de 5 mil millones de copias distribuidas.",
    "📘 J.K. Rowling fue rechazada por 12 editoriales antes de publicar 'Harry Potter y la piedra filosofal'.",
    "📕 El término 'bibliomanía' se refiere a la obsesión de coleccionar libros.",
    "📚 El libro más largo jamás escrito tiene más de 1,5 millones de palabras: 'In Search of Lost Time' de Marcel Proust.",
    "📖 Existen más de 129 millones de libros publicados en todo el mundo.",
    "📗 El 'Codex Leicester' de Leonardo da Vinci es uno de los libros más caros jamás vendidos en una subasta.",
    "📘 El libro más pequeño del mundo mide solo 0,07 mm x 0,10 mm y se llama 'Teeny Ted from Turnip Town'.",
    "📙 La Biblioteca del Congreso de los EE.UU. es la biblioteca más grande del mundo, con más de 170 millones de artículos.",
    "📖 El autor más prolífico del mundo es L. Ron Hubbard, con más de 1.000 publicaciones.",
    "📕 El papel reciclado ha reducido el uso de árboles en la impresión de libros en los últimos años.",
    "📗 El libro 'Don Quijote de la Mancha' de Miguel de Cervantes es considerado la primera novela moderna.",
    "📚 El primer diccionario de la lengua inglesa fue compilado por Samuel Johnson en 1755.",
    "📖 Las bibliotecas antiguas, como la Biblioteca de Alejandría, almacenaban pergaminos en lugar de libros impresos.",
    "📘 Existen más de 6.000 idiomas en el mundo, pero solo unos pocos cientos tienen libros escritos en ellos.",
    "📕 El 'Diario de Ana Frank' ha sido traducido a más de 70 idiomas.",
    "📗 El 'Libro Guinness de los Récords' comenzó como un libro de hechos para resolver discusiones en pubs.",
    "📚 Se estima que en promedio, una persona lee entre 4 y 12 libros al año.",
    "📘 Stephen King, uno de los autores más conocidos, ha escrito más de 60 novelas y más de 200 cuentos.",
    "📖 El término 'bestseller' fue usado por primera vez en 1889 por un periódico para describir libros populares.",
    "📙 'El Principito' de Antoine de Saint-Exupéry es uno de los libros más traducidos, disponible en más de 300 idiomas.",
    "📗 'Los Miserables' de Victor Hugo, es conocido por tener una de las frases más largas en la literatura, con 823 palabras.",
    "📕 En Japón, los libros más vendidos suelen ser mangas, que representan más del 40% de las ventas de libros."
];

  const [currentFactIndex, setCurrentFactIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % interestingFacts.length);
    }, 2000);  

    return () => clearInterval(interval);  
  }, [interestingFacts.length]);

  const handleNewFact = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * interestingFacts.length);
    } while (newIndex === currentFactIndex);
    setCurrentFactIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">¡Bienvenido a BookStock!</h1>
      <p className="text-xl mb-8">Tu aplicación para gestionar el inventario de libros de forma sencilla y divertida.</p>

      <button
        onClick={() => navigate('/books')}
        className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 mb-4"
      >
        Ver Inventario de Libros
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
      >
        Cerrar sesión
      </button>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Dato Curioso sobre los Libros</h2>
        <div className="flex items-center justify-center space-x-2">
          <p className="text-lg">{interestingFacts[currentFactIndex]}</p>
          <FaSync
            onClick={handleNewFact}
            className="cursor-pointer text-white hover:text-yellow-400 transition duration-300"
            size={24} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
