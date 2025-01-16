import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';
import AdminList from './pages/admin/List';
import AdminAdd from './pages/admin/Add';
import Notice from './pages/student/Notice';
import Counsel from './pages/student/Counsel';
import Lecture_Plan from './pages/student/Lecture_Plan';
import Apply from './pages/student/Apply';
import Lec_Notice from './pages/student/Lec_Notice';
import Chulseog from './pages/student/Chulseog';
import Qualification_Info from './pages/student/Qualification_Info';
import Timetable from './pages/student/Timetable';
import Stats_Analysis from './pages/student/Stats_Analysis';
import Aftercare_Apply from './pages/student/Aftercare_Apply';
import Aftercare_Progress from './pages/student/Aftercare_Progress';
import Aftercare_Results from './pages/student/Aftercare_Results';
import Survey_YN from './pages/student/Survey_YN';
import Admin_Survey from './pages/student/Admin_Survey';
import Survey_Results from './pages/student/Survey_Results';
import Class_Community from './pages/student/Class_Community';
import Community_Notice from './pages/student/Community_Notice';
import QNA from './pages/student/QNA';
import WritePost from './pages/student/WritePost';
import {PostProvider} from './contexts/PostContext';

function App() {
    return (
        <PostProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>

                        <Route index="index" element={<Class_Community />}/>

                        <Route path="admin" element={<Container />}>
                            <Route index="index" element={<AdminList />}/>
                            <Route path="add" element={<AdminAdd />}/>
                        </Route>
                        
                        <Route path="lecture" element={<Container />}>
                            <Route /*index*/ path="list"/>
                            <Route path="add"/>
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