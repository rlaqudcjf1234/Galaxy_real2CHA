import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { PostProvider } from './pages/lecture/LectureContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';

import AdminList from './pages/admin/List';
import AdminAdd from './pages/admin/Add';
import AdminMod from './pages/admin/Mod';

import LectureList from './pages/lecture/List';
import LectureAdd from './pages/lecture/Add';
import LectureRead from './pages/lecture/Read';

import ClassList from './pages/class/List';
import ClassAdd from './pages/class/Add';
import ClassRead from './pages/class/Read';
import ClassConfirm from './pages/class/Confirm';
import ClassDetail from './pages/class/Detail';

import UserLogin from './pages/user/Login';


import Class_Community from "./pages/student/Class_Community";



function App() {
    return (
       <PostProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index="index" element={<Class_Community />} />

                        <Route path="admin" element={<Container />}>
                            <Route index="index" element={<AdminList />}/>
                            <Route path="add" element={<AdminAdd />}/>
                            <Route path="mod/:seq" element={<AdminMod />}/>
                        </Route>
                        <Route path="lecture" element={<Container />}>
                            <Route index element={<LectureList />}/>
                            <Route path="detail/:id" element={<LectureRead />}/>
                            <Route path="add" element={<LectureAdd />}/>
                        </Route>

                        <Route path="class" element={<Container/>}>
                            <Route index element={<ClassList/>}/>
                            <Route path="add" element={<ClassAdd/>}/>
                            <Route path="read" element={<ClassRead/>}/>
                            <Route path="confirm" element={<ClassConfirm/>}/>
                            <Route path="detail/:seq" element={<ClassDetail/>}/>
                            
                        </Route>

                        
                   
                        <Route path="apply" element={<Container />}>
                            <Route index element=""/>
                            <Route path="adm" />
                            <Route path="std"  />
                        </Route>
                        
                        <Route path="adminCommunity" element={<Container />}>
                            <Route /*index*/ element="" />
                            <Route path="add" />
                            <Route path="read" />
                            <Route path="delete" />
                        </Route>

                        <Route path="lectureDocument" element={<Container />}>
                            <Route /*index*/ element="" />
                            <Route path="add" />
                            <Route path="read" />
                            <Route path="delete" />
                        </Route>

                        <Route path="classComunity" element={<Container />}>
                            <Route /*index*/ element="" />
                            <Route path="add" />
                            <Route path="read" />
                            <Route path="delete" />
                        </Route>

                        <Route path="group" element={<Container />}>
                            <Route /*index*/ element="" />
                        </Route>

                        <Route path="code" element={<Container />}>
                            <Route /*index*/ element="" />
                        </Route>
                    </Route>
                    <Route path="user" element={<Container/>}>
                            <Route index element={<UserLogin/>}/>
                        </Route>
                </Routes>

            </Router>
        </PostProvider>
    );
}

export default App;
