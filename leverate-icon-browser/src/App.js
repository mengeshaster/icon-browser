import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import IconsPage from './pages/icons-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<IconsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
