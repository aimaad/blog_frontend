import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import Add from './pages/Add';
import Edit from './pages/Edit';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <Layout>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Edit/:id" element={<Edit />} />
      </Routes>
    </Layout>
  </Router>
  );
}

export default App;
