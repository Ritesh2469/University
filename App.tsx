
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import UniversityPage from './components/UniversityPage';
import { universityData } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  if (!universityData || universityData.length === 0) {
    return <div>No university data available.</div>;
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
        <Header universities={universityData} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to={`/${universityData[0].slug}`} replace />} />
            {universityData.map(uni => (
              <Route key={uni.id} path={`/${uni.slug}`} element={<UniversityPage university={uni} />} />
            ))}
            <Route path="*" element={<Navigate to={`/${universityData[0].slug}`} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
