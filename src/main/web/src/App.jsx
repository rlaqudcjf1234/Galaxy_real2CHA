import "./App.css";

import React, {Suspense, lazy} from "react";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';

const AdminList = lazy(() => import ('./pages/admin/List'));
const AdminAdd = lazy(() => import ('./pages/admin/Add'));
const AdminMod = lazy(() => import ('./pages/admin/Mod'));
const AdminPass = lazy(() => import ('./pages/admin/Pass'));

import List from './pages/lecture/list';
import Add from './pages/lecture/Add';
import Read from './pages/lecture/Read';
import Update from "./pages/lecture/Update";
import LectureDocument from "./pages/lectureDocum/Document";

import ClassList from './pages/class/List';
import ClassAdd from './pages/class/Add';
import ClassRead from './pages/class/Read';
import ClassConfirm from './pages/class/Confirm';
import ClassDetail from './pages/class/Detail';

import UserLogin from './pages/user/Login';

const TempList = lazy(() => import ('./pages/temp/List'));
const TempAdd = lazy(() => import ('./pages/temp/Add'));
const TempRead = lazy(() => import ('./pages/temp/Read'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div> Loading ...</div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index="index" element={<Home />}/>

                        <Route path="temp" element={<Container />}>
                            <Route index="index" element={<TempList />}/>
                            <Route path="add" element={<TempAdd />}/>
                            <Route path="read" element={<TempRead />}/>
                        </Route>

                        <Route path="user" element={<Container/>}>
                            <Route index="index" element={<UserLogin/>}/>
                        </Route>

                        <Route path="admin" element={<Container />}>
                            <Route index="index" element={<AdminList />}/>
                            <Route path="add" element={<AdminAdd />}/>
                            <Route path="mod/:seq" element={<AdminMod />}/>
                        </Route>

                        <Route path="lecture" element={<Container />}>
                            <Route index="index" element={<List />}/>
                            <Route path="read/:id" element={<Read />}/>
                            <Route path="add" element={<Add />}/>
                            <Route path="update/:id" element={<Update />}/>
                        </Route>

                        <Route path="class" element={<Container/>}>
                            <Route index="index" element={<ClassList/>}/>
                            <Route path="add" element={<ClassAdd/>}/>
                            <Route path="read" element={<ClassRead/>}/>
                            <Route path="confirm" element={<ClassConfirm/>}/>
                            <Route path="detail/:seq" element={<ClassDetail/>}/>
                        </Route>

                        <Route path="apply" element={<Container />}>
                            <Route index="index" element=""/>
                            <Route path="adm"/>
                            <Route path="std"/>
                        </Route>

                        <Route path="adminCommunity" element={<Container />}>
                            <Route /*index*/
                                element=""/>
                            <Route path="add"/>
                            <Route path="read"/>
                            <Route path="delete"/>
                        </Route>

                        <Route path="lectureDocument" element={<Container />}>
                            <Route index="index" element={<LectureDocument />}/>
                            <Route path="add"/>
                            <Route path="read"/>
                            <Route path="delete"/>
                        </Route>

                        <Route path="classComunity" element={<Container />}>
                            <Route /*index*/
                                element=""/>
                            <Route path="add"/>
                            <Route path="read"/>
                            <Route path="delete"/>
                        </Route>

                        <Route path="group" element={<Container />}>
                            <Route /*index*/
                                element=""/>
                        </Route>

                        <Route path="code" element={<Container />}>
                            <Route /*index*/
                                element=""/>
                        </Route>
                    </Route>
                    <Route path="/admin/pass/:seq" element={<AdminPass />}/>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
