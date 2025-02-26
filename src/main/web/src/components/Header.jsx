import React from 'react';
import { Link } from 'react-router-dom';
import { persistor } from "../main";
import '../css/Header.css';

function Header() {

    const handleClick = async () => {
        await persistor.purge();
    }

    return (
        <header
            className="d-flex flex-wrap align-items-center justify-content-center p-3 mb-4 border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-center col-md-3 mb-2 mb-md-0">
                <Link
                    to="/"
                    className="d-inline-flex link-body-emphasis text-decoration-none">
                    {"홈페이지 제목(이미지 처리)"}
                </Link>
            </div>

            <nav
                id="menu"
                className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/" className="nav-link px-2">통합관리</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {
                                [
                                    {
                                        label: "코드관리(미정)",
                                        path: ""
                                    }, {
                                        label: "강사등록",
                                        path: "admin"
                                    }
                                ].map(
                                    (item, index) => (<Link key={index} to={`/${item.path}`}>{item.label}</Link>)
                                )
                            }
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>
                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/" className="nav-link px-2">과정등록</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {
                                [
                                    {
                                        label: "교육과정현황",
                                        path: "lecture"
                                    }, {
                                        label: "학습안내서",
                                        path: ""
                                    }, {
                                        label: "강의현황",
                                        path: "class"
                                    }, {
                                        label: "시간표 현황",
                                        path: ""
                                    }
                                ].map(
                                    (item, index) => (<Link key={index} to={`/${item.path}`}>{item.label}</Link>)
                                )
                            }
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Lec_Notice" className="nav-link px-2">학적부</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {
                                [
                                    {
                                        label: "접수현황",
                                        path: "apply"
                                    }, {
                                        label: "출석현황",
                                        path: "Chulseog"
                                    }, {
                                        label: "자격증 안내",
                                        path: "Qualification_Info"
                                    }, {
                                        label: "시간표 조회",
                                        path: "Timetable"
                                    }
                                ].map(
                                    (item, index) => (<Link key={index} to={`/${item.path}`}>{item.label}</Link>)
                                )
                            }
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Stats_Analysis" className="nav-link px-2">사후관리</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {
                                [
                                    {
                                        label: "통계 및 분석",
                                        path: "Stats_Analysis"
                                    }, {
                                        label: "사후관리 신청",
                                        path: "Aftercare_Apply"
                                    }, {
                                        label: "진행 현황",
                                        path: "Aftercare_Progress"
                                    }, {
                                        label: "사후관리 결과",
                                        path: "Aftercare_Results"
                                    }
                                ].map(
                                    (item, index) => (<Link key={index} to={`/${item.path}`}>{item.label}</Link>)
                                )
                            }
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Survey_YN" className="nav-link px-2">설문평가</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {
                                [
                                    {
                                        label: "설문작성",
                                        path: "question"
                                    }, {
                                        label: "설문결과",
                                        path: "survey"
                                    }
                                ].map(
                                    (item, index) => (<Link key={index} to={`/${item.path}`}>{item.label}</Link>)
                                )
                            }
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Class_Community" className="nav-link px-2">게시판</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {
                                [
                                    {
                                        label: "과정별 게시판",
                                        path: "Class_Community"
                                    }, {
                                        label: "공지사항",
                                        path: "Community_Notice"
                                    }, {
                                        label: "Q&A",
                                        path: "QNA"
                                    }
                                ].map(
                                    (item, index) => (<Link key={index} to={`/${item.path}`}>{item.label}</Link>)
                                )
                            }
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>
            </nav>

            <div className="d-flex flex-wrap align-items-center justify-content-center col-md-3 text-end">
                <button type="button" className="btn btn-outline-primary me-2" onClick={handleClick}>Logout</button>
            </div>
        </header>
    );
}

export default Header;