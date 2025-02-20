import "./App.css";

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Login from "./pages/Login";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Container from "./components/Container";

// const UserModify = lazy(() => import('./pages/user/Modify'));

const TempList = lazy(() => import("./pages/temp/List"));
const TempAdd = lazy(() => import("./pages/temp/Add"));
const TempRead = lazy(() => import("./pages/temp/Read"));

const AdminList = lazy(() => import("./pages/admin/List"));
const AdminAdd = lazy(() => import("./pages/admin/Add"));
const AdminMod = lazy(() => import("./pages/admin/Mod"));
const AdminPass = lazy(() => import("./pages/admin/Pass"));

const AdcAdd = lazy(() => import("./pages/adminCommunity/AdcAdd"));
const AdcList = lazy(() => import("./pages/adminCommunity/AdcList"));
const AdcRead = lazy(() => import("./pages/adminCommunity/AdcRead"));

const ApplyList = lazy(() => import("./pages/apply/ApplyList"));
const ApplyAdd = lazy(() => import("./pages/apply/ApplyAdd"));
const ApplyRead = lazy(() => import("./pages/apply/ApplyRead"));
const ApplyAdmin = lazy(() => import("./pages/apply/ApplyAdmin"));

const ClassList = lazy(() => import("./pages/class/List"));
const ClassAdd = lazy(() => import("./pages/class/Add"));
const ClassRead = lazy(() => import("./pages/class/Read"));
//const ClassUpdate = lazy(() => import("./pages/class/Update"));

const LectureList = lazy(() => import("./pages/lecture/List"));
const LectureAdd = lazy(() => import("./pages/lecture/Add"));
const LectureRead = lazy(() => import("./pages/lecture/Read"));
const LectureMod = lazy(() => import("./pages/lecture/Mod"));

const LectureDocList = lazy(() => import("./pages/lectureDoc/List"));
const LectureDocAdd = lazy(() => import("./pages/lectureDoc/Add"));
const LectureDocRead = lazy(() => import("./pages/lectureDoc/Read"));
const LectureDocMod = lazy(() => import("./pages/lectureDoc/Mod"));

// const CodeList = lazy(()=> import('./pages/codegroup/List'))
// const CodeAdd = lazy(()=> import('./pages/codegroup/add'))

const QuestionList = lazy(() => import("./pages/question/List"));
const QuestionAdd = lazy(() => import("./pages/question/Add"));
const QuestionRead = lazy(() => import("./pages/question/Read"));
const QuestionMod = lazy(() => import("./pages/question/Mod"));

const Calendar = lazy(() => import("./pages/calendar/Calendar"));
const CalendarRead = lazy(() => import("./pages/calendar/Read"));

function App() {
    return (
        <Router>
            <Suspense fallback={<div> Loading ...</div>}>
                <Routes>
                    {/* 로그인 이전 */}
                    {/* <Route path="/login" element={<Login />}/>  */}

                    {/* 로그인 이후 */}
                    <Route path="/" element={<Layout />}>
                        <Route index="index" element={<Home />} />
                        <Route path="temp" element={<Container />}>
                            <Route index="index" element={<TempList />} />
                            <Route path="add" element={<TempAdd />} />
                            <Route path="read" element={<TempRead />} />
                        </Route>

                        <Route path="admin" element={<Container />}>
                            <Route index="index" element={<AdminList />} />
                            <Route path="add" element={<AdminAdd />} />
                            <Route path="mod/:seq" element={<AdminMod />} />
                            <Route path="pass/:seq" element={<AdminPass />} />
                        </Route>

                        <Route path="class" element={<Container />}>
                            <Route index="index" element={<ClassList />} />
                            <Route path="add" element={<ClassAdd />} />
                            <Route path="read/:seq" element={<ClassRead />} />
                            {/*<Route path="update/:seq" element={<ClassUpdate />} /> */}
                        </Route>

                        <Route path="lecture" element={<Container />}>
                            <Route index="index" element={<LectureList />} />
                            <Route path="add" element={<LectureAdd />} />
                            <Route path="read/:seq" element={<LectureRead />} />
                            <Route path="mod/:seq" element={<LectureMod />} />
                            <Route path="doc/:lecture_seq" element={<Container />}>
                                <Route index="index" element={<LectureDocList />} />
                                <Route path="add" element={<LectureDocAdd />} />
                                <Route path="read/:seq" element={<LectureDocRead />} />
                                <Route path="mod/:seq" element={<LectureDocMod />} />
                            </Route>
                        </Route>

                        <Route path="apply" element={<Container />}>
                            <Route index="index" element={<ApplyList />} />
                            <Route path="add" element={<ApplyAdd />} />
                            <Route path="read/:id" element={<ApplyRead />} />
                            <Route path="admin" element={<ApplyAdmin />} />
                        </Route>

                        <Route path="adminCommunity" element={<Container />}>
                            <Route index="index" element={<AdcList />} />
                            <Route path="add" element={<AdcAdd />} />
                            <Route path="read/:seq" element={<AdcRead />} />
                            <Route path="delete" />
                        </Route>

                        <Route path="classComunity" element={<Container />}>
                            <Route /*index*/ element="" />
                            <Route path="add" />
                            <Route path="read" />
                            <Route path="delete" />
                        </Route>

                        <Route path="group" element={<Container />}>
                            {/* <Route index="index" element={<CodeList />} />
                            <Route path="add" element={<CodeAdd />} /> */}
                        </Route>
                        <Route path="code" element={<Container />}>
                            <Route /*index*/ element="" />
                        </Route>

                        <Route path="calendar" element={<Container />}>
                            <Route index="index" element={<Calendar />} />
                            <Route path="read/:seq" element={<CalendarRead />} />
                        </Route>

                        <Route path="question" element={<Container />}>
                            <Route index="index" element={<QuestionList />} />
                            <Route path="add" element={<QuestionAdd />} />
                            <Route path="read/:seq" element={<QuestionRead />} />
                            <Route path="mod/:seq" element={<QuestionMod />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
