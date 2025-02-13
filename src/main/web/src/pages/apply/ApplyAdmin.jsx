// ApplyAdmin.js
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import "../../css/Community.css";

const ApplyAdmin = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState({ pageIndex: 1 });
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");
    const [adminForm, setAdminForm] = useState({
        email: "",
        password: "",
    });

    // 관리자 로그인 처리
    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("/api/apply/admin-login", adminForm);
            if (response.data && response.data.seq) {
                setIsAuthenticated(true);
                sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("authType", "admin");
                sessionStorage.setItem("adminEmail", response.data.email);
                sessionStorage.setItem("adminName", response.data.name);
                fetchData();
            } else {
                setError("이메일 또는 비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            setError("로그인 처리 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const fetchData = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            // params 객체를 URLSearchParams로 변환
            const queryParams = new URLSearchParams({
                pageIndex: params.pageIndex.toString(),
            }).toString();

            const response = await axios.get(`/api/apply/list?${queryParams}`);

            // 응답 데이터 구조 확인을 위한 로그
            console.log("Response data:", response.data);

            if (response.data && Array.isArray(response.data.items)) {
                setItems(response.data.items);
                setTotalCount(response.data.totalCount || 0);
            } else {
                console.error("Invalid data format:", response.data);
                setError("데이터 형식이 올바르지 않습니다.");
            }
        } catch (error) {
            console.error("Error fetching data:", error.response || error);
            setError("데이터 조회 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("authType");
        sessionStorage.removeItem("adminEmail");
        setIsAuthenticated(false);
        setAdminForm({ email: "", password: "" });
        navigate("/apply/admin");
    };

    useEffect(() => {
        const authStatus = sessionStorage.getItem("isAuthenticated");
        const authType = sessionStorage.getItem("authType");

        if (authStatus === "true" && authType === "admin") {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, params.pageIndex]);

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">관리자 로그인</h2>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4 mb-4">
                            <div className="flex">
                                <div className="text-red-700">{error}</div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleAdminLogin} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    이메일
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={adminForm.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={adminForm.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            {loading ? "처리중..." : "로그인"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg">로딩중...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="board-header">
                <Link to="/apply/add" className="write-button">
                    등록
                </Link>
                <button onClick={handleLogout} className="write-button">
                    로그아웃
                </button>
            </div>
            <table className="board-table">
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">성명</th>
                        <th scope="col">이메일</th>
                        <th scope="col">연락처</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">등록여부</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.RNUM}</td>
                                <td className="title">
                                    <Link to={`/apply/read/${item.ID}`}>{item.NAME}</Link>
                                </td>
                                <td>{item.EMAIL}</td>
                                <td>{item.PHONE}</td>
                                <td>{item.REG_DT}</td>
                                <td>{item.USE_YN}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={params.pageIndex}
                totalCount={totalCount}
                onPageChange={(pageIndex) => setParams((prev) => ({ ...prev, pageIndex }))}
            />
        </div>
    );
};

export default ApplyAdmin;
