import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
function Add() {

    const navigate = useNavigate();
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({division: []});
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "page": "adminAdd"
                }
            });
            response
                .data
                .forEach(item => {
                    setCodes({
                        ...codes,
                        [item.name]: item.value
                    });
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/admin/add", formData);
            navigate("/admin");
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors(response.data)
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "auto"
            }}>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="name@example.com"/>
                    <div className="invalid-feedback">
                        {errors.email}
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input type="password" className="form-control" name="password"/>
                    <div className="invalid-feedback">
                        {errors.password}
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password2" className="form-label">비밀번호 확인</label>
                    <input type="password" className="form-control" name="password2"/>
                    <div className="invalid-feedback">
                        {errors.password2}
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="name" className="form-label">성명</label>
                    <input type="text" className="form-control" name="name"/>
                    <div className="invalid-feedback">
                        {errors.name}
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="phone" className="form-label">연락처</label>
                    <input type="text" className="form-control" name="phone"/>
                    <div className="invalid-feedback">
                        {errors.phone}
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="division" className="form-label">구분</label>
                    <select name="division" className="form-select" defaultValue="">
                        <option value="">선택</option>
                        {
                            codes
                                .division
                                .map(
                                    (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                )
                        }
                    </select>
                    <div className="invalid-feedback">
                        {errors.division}
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-end py-1">
                    <button className="btn btn-primary" type="submit">등록</button>
                    <button className="btn btn-primary" type="button" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default Add;