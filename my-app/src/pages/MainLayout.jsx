import React from 'react';
import Header from '../components/Header';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>
      {children}
    </main>
  </>
);

export default MainLayout;