import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
    const navigate = useNavigate();
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({division: []});
    const [params, setParams] = useState({
        email: "",
        password: "",
        password2: "",
        name: "",
        phone: "",
        division: ""
    });
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

    const handleParamsChange = (e) => {
        setParams({
            ...params,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "auto"
            }}>
            <form className="row g-3">
                <div className="col-12">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="name@example.com"
                        onChange={handleParamsChange}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleParamsChange}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password2" className="form-label">비밀번호 확인</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password2"
                        onChange={handleParamsChange}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="name" className="form-label">성명</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleParamsChange}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="phone" className="form-label">연락처</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={handleParamsChange}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="division" className="form-label">구분</label>
                    <select
                        name="division"
                        className="form-select"
                        defaultValue=""
                        onChange={handleParamsChange}>
                        <option value="">선택</option>
                        {
                            codes
                                .division
                                .map(
                                    (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                )
                        }
                    </select>
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