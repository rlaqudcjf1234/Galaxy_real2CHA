import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';
import AdminList from './pages/admin/List';
import AdminAdd from './pages/admin/Add';

import List from './pages/lecture/list';
import Add from './pages/lecture/Add';
import Read from './pages/lecture/Read';
import Update from "./pages/lecture/Update";
import LectureDocument from "./pages/lectureDocum/Document";

import ClassList from './pages/class/List';
import ClassAdd from './pages/class/Add';
import ClassRead from './pages/class/Read';
import ClassConfirm from './pages/class/Confirm';

import Class_Community from "./pages/student/Class_Community";

import TempList from "./pages/temp/TempList";


function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index="index" element={<Class_Community />} />
                    <Route path="templist" element={<TempList />} />
                    
                    <Route path="admin" element={<Container />}>
                        <Route index="index" element={<AdminList />} />
                        <Route path="add" element={<AdminAdd />} />
                    </Route>
                    
                    <Route path="lecture" element={<Container />}>
                        <Route index element={<List />} />
                        <Route path="read/:id" element={<Read />} />
                        <Route path="add" element={<Add />} />
                        <Route path="update/:id" element={<Update />} />

                    </Route>

                    <Route path="class" element={<Container />}>
                        <Route index element={<ClassList />} />
                        <Route path="add" element={<ClassAdd />} />
                        <Route path="read" element={<ClassRead />} />
                        <Route path="confirm" element={<ClassConfirm />} />
                    </Route>

                    <Route path="apply" element={<Container />}>
                        <Route index element="" />
                        <Route path="adm" />
                        <Route path="std" />
                    </Route>

                    <Route path="adminCommunity" element={<Container />}>
                        <Route /*index*/ path="list" />
                        <Route path="add" />
                        <Route path="read" />
                        <Route path="delete" />
                    </Route>

                    <Route path="lectureDocument" element={<Container />}>
                        <Route index element={<LectureDocument />} />
                        <Route path="add" />
                        <Route path="read" />
                        <Route path="delete" />
                    </Route>
                        
                    <Route path="classComunity" element={<Container />}>
                        <Route /*index*/ path="list" />
                        <Route path="add" />
                        <Route path="read" />
                        <Route path="delete" />
                    </Route>

                    <Route path="group" element={<Container />}>
                        <Route /*index*/ path="list" />
                    </Route>

                    <Route path="code" element={<Container />}>
                        <Route /*index*/ path="list" />
                    </Route>
                </Route>
            </Routes>
        </Router>

    );
}

export default App;
