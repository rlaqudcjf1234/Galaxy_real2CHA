import React from "react";
import { Link } from "react-router-dom";
import { persistor } from "../main";
import "../css/Header.css";
import Logo2 from "../img/Logo_hor1.png";
import Logo from "../img/Logo_hor2.png";

function Header() {
    const handleClick = async () => {
        await persistor.purge();
    };

    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center p-3 mb-4 border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-center col-md-3 mb-2 mb-md-0">
                <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                    <img src={Logo} alt="Desktop Logo" className="logo-desktop" style={{ height: "70px" }} />
                    <img src={Logo2} alt="Mobile Logo" className="logo-mobile" style={{ height: "70px" }} />
                </Link>
            </div>

            <nav id="menu" className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/admin" className="nav-link px-2">
                            통합관리
                        </Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                {
                                    label: "강사현황",
                                    path: "admin",
                                },
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>
                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/lecture" className="nav-link px-2">
                            과정등록
                        </Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                {
                                    label: "교육과정현황",
                                    path: "lecture",
                                },
                                {
                                    label: "강의현황",
                                    path: "class",
                                }
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/apply" className="nav-link px-2">
                            학적부
                        </Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                {
                                    label: "접수현황",
                                    path: "apply",
                                },
                                {
                                    label: "일정현황",
                                    path: "calendar",
                                },
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/aftercare" className="nav-link px-2">
                            사후관리
                        </Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                {
                                    label: "사후관리",
                                    path: "aftercare",
                                },
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/survey" className="nav-link px-2">
                            설문평가
                        </Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                {
                                    label: "설문작성",
                                    path: "question",
                                },
                                {
                                    label: "설문결과",
                                    path: "survey",
                                },
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/adminCommunity" className="nav-link px-2">
                            게시판
                        </Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                {
                                    label: "관리자 게시판",
                                    path: "adminCommunity",
                                },
                                // {
                                //     label: "공지사항",
                                //     path: "",
                                // },
                                // {
                                //     label: "Q&A",
                                //     path: "",
                                // },
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>
            </nav>

            <div className="d-flex flex-wrap align-items-center justify-content-center col-md-3 text-end">
                <button type="button" className="btn btn-outline-primary me-2" onClick={handleClick}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
