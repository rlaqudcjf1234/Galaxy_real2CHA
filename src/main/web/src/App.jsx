import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';
import AdminList from './pages/admin/List';
import AdminAdd from './pages/admin/Add';
import List from './pages/lecture/list';
import Add from './pages/lecture/Add';
import Detail from './pages/lecture/Detail';
import { PostProvider } from './pages/lecture/LectureContext';


function App() {
    return (
       <PostProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>

                        <Route index="index" element={<Home />}/>

                        <Route path="admin" element={<Container />}>
                            <Route index="index" element={<AdminList />}/>
                            <Route path="add" element={<AdminAdd />}/>
                        </Route>
                        
                        <Route path="lecture" element={<Container />}>
                            <Route index element={<List/>}/>
                            <Route path="detail/:id" element={<Detail/>}/>
                            <Route path="add" element={<Add/>}/>
                        </Route>
                        
                        <Route path="class" element={<Container />}>
                            <Route /*index*/ path="list"/>
                            <Route path="add"/>
                            <Route path="read"/>
                            <Route path="confirm"/>
                        </Route>
                        
                        <Route path="apply" element={<Container />}>
                            <Route /*index*/ path="list"/>
                            <Route path="read"/>
                            <Route path="confirm"/>
                        </Route>

                        <Route path="adminCommunity" element={<Container />}>
                            <Route /*index*/ path="list"/>
                            <Route path="add"/>
                            <Route path="read"/>
                            <Route path="delete"/>
                        </Route>
                        <Route path="lectureDocument" element={<Container />}>
                            <Route /*index*/ path="list"/>
                            <Route path="add"/>
                            <Route path="read"/>
                            <Route path="delete"/>
                        </Route>
                        <Route path="classComunity" element={<Container />}>
                            <Route /*index*/ path="list"/>
                            <Route path="add"/>
                            <Route path="read"/>
                            <Route path="delete"/>
                        </Route>

                        <Route path="group" element={<Container />}>
                            <Route /*index*/ path="list"/>
                        </Route>
                        <Route path="code" element={<Container />}>
                            <Route /*index*/ path="list"/>
                        </Route>

                    </Route>
                </Routes>
            </Router>
            </PostProvider>
    );
}

export default App;