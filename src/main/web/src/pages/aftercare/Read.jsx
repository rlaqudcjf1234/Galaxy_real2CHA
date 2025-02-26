import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../css/aftercare/AftercareRead.css"; 
import Info from "./Info";
import Class from "./Class";
import Aftercare from "./Aftercare";
import Academic from "./Academic";
import Certificate from "./Certificate";

const Read = () => {
    const { seq } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    // 리스트에서 전달받은 프로필 정보가 없으면 기본값을 사용
    const initialProfile = location.state?.profile || { name: "Name", email: "Email" };
    const [profile] = useState(initialProfile);

    const [activeTab, setActiveTab] = useState("info"); // 기본 탭

    // 탭에 따른 컴포넌트 렌더링
    const renderContent = () => {
        switch (activeTab) {
            case "info":
                return <Info />;
            case "class":
                return <Class />;
            case "academic":
                return <Academic />;
            case "certificate":
                return <Certificate />;
            case "aftercare":
                return <Aftercare />;
            default:
                return <Info />;
        }
    };

    return (
        <div className="mypage-container">
            {/* 왼쪽 사이드바 */}
            <div className="mypage-sidebar">
                <div className="profile-section">
                    <div className="profile-image">
                        <span className="profile-placeholder">Profile</span>
                    </div>
                    <div className="profile-name">{profile.name}</div>
                    <div className="profile-email">{profile.email}</div>
                </div>
                <nav className="sidebar-menu">
                    <ul>
                        <li className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>기본정보</li>
                        <li className={activeTab === "class" ? "active" : ""} onClick={() => setActiveTab("class")}>수강정보</li>
                        <li className={activeTab === "academic" ? "active" : ""} onClick={() => setActiveTab("academic")}>학력정보</li>
                        <li className={activeTab === "certificate" ? "active" : ""} onClick={() => setActiveTab("certificate")}>자격증정보</li>
                        <li className={activeTab === "aftercare" ? "active" : ""} onClick={() => setActiveTab("aftercare")}>사후관리</li>
                    </ul>
                </nav>
            </div>

            {/* 중앙 컨텐츠 영역 */}
            <div className="mypage-content">
                <div className="content-header">
                    <h1>사후관리</h1>
                    <button 
                        className="button-list" 
                        onClick={() => navigate('/aftercare')}
                    >
                        목록으로
                    </button>
                    <p>{profile.name}님의 페이지</p>
                </div>
                {renderContent()} {/* 선택된 탭의 컴포넌트 표시 */}
            </div>
        </div>
    );
};

export default Read;
