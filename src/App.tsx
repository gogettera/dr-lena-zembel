
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SimplePage from '@/pages/SimplePage';
import SimpleAboutPage from '@/pages/SimpleAboutPage';
import SimpleContactPage from '@/pages/SimpleContactPage';
import NotFound from '@/pages/NotFound';

function App() {
  console.log('App component rendering');
  
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Simple routes without language complexity */}
        <Route path="/" element={<SimplePage />} />
        <Route path="/about" element={<SimpleAboutPage />} />
        <Route path="/contact" element={<SimpleContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
