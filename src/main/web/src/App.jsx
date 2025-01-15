import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';
import AdminList from './pages/admin/List';
import AdminAdd from './pages/admin/Add';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} />

          <Route path="admin" element={<Container />}>
            <Route index element={<AdminList />} />
            <Route path="add" element={<AdminAdd />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;