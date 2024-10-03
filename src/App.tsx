import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import { GlobalStateProvider } from './context/GlobalState';
import Header from './components/Header/Header';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;