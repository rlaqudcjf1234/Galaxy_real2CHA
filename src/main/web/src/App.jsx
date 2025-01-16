import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';
import AdminList from './pages/admin/List';
import AdminAdd from './pages/admin/Add';
import AdminApply from './pages/admin/Apply';
import StudentList from './pages/students/StudentList ';
import Signup from './pages/students/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="admin" element={<Container/>}>
            <Route index element={<AdminList/>} />
            <Route path="add" element={<AdminAdd/>}/>
            <Route path="apply" element={<AdminApply/>} />
          </Route>

          <Route path="students" element={<Container/>}>
            <Route index element={<StudentList/>} />
            <Route path="signup" element={<Signup/>}/> 
          </Route>
        </Route>
      </Routes>
     </Router>
  );
}

export default App;