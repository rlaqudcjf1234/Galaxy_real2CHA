import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';
import AdminList from './pages/admin/List';
import ClassList from './pages/class/List';
import ClassAdd from './pages/class/Add';
import ClassRead from './pages/class/Read';
import ClassConfirm from './pages/class/Confirm';
import AdminAdd from './pages/admin/Add';
import {PostProvider} from './contexts/PostContext';

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
                            <Route /*index*/ path="list" />
                            <Route path="add" />
                        </Route>

                        
                        <Route path="class" element={<Container/>}>
                            <Route index="index" element={<ClassList/>}/>
                            <Route path="add" element={<ClassAdd/>}/>
                            <Route path="read" element={<ClassRead/>}/>
                            <Route path="confirm" element={<ClassConfirm/>}/>
                        </Route>
                        
                        <Route path="apply" element={<Container />}>
                        <Route /*index*/ path="list" />
                            <Route path="reg"  />
                            <Route path="apply"  />
                        </Route>

                        <Route path="adminCommunity" element={<Container />}>
                            <Route /*index*/ path="list" />
                            <Route path="add" />
                            <Route path="read" />
                            <Route path="delete" />
                        </Route>
                        <Route path="lectureDocument" element={<Container />}>
                            <Route /*index*/ path="list" />
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
        </PostProvider>

    );
}

export default App;