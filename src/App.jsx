import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ArticlesPage from './pages/ArticlesPage';
import UsersPage from './pages/UsersPage';
import PhotosPage from './pages/PhotosPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ArticlesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/photos" element={<PhotosPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;



