import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UpComingSteps from './pages/UpComingSteps';
import UpComingPages from './pages/UpComingPages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming-steps" element={<UpComingSteps />} />
        <Route path="/upcoming-pages" element={<UpComingPages />} />
      </Routes>
    </Router>
  );
};

export default App;
