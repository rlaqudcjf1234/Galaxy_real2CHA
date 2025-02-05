import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

function Mod() {

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    }

    const params = useParams();
    const [codes, setCodes] = useState({use_yn: [], division: []});
    const [admin, setAdmin] = useState({});
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "page": "adminMod"
                }
            });
            if (!response || !response.data) {
                alert("대상을 찾을 수 없습니다.");
                navigate("/admin");
                return;
            }
            const data = {}
            response
                .data
                .forEach(item => {
                    data[item.name] = item.value
                });
            setCodes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert("대상을 찾을 수 없습니다.");
            navigate("/admin");
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 데이터 요청
    const fetchParams = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/admin/mod", {
                params: {
                    "seq": params.seq
                }
            });
            setAdmin(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
        fetchParams();
    }, []);

    const handleAdmin = (e) => {
        setAdmin({
            ...admin,
            [e.target.name.toUpperCase()]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/admin/mod", formData);
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

    const handlePreview = () => {
        const url = `/admin/pass/${admin.SEQ}`;
        window.open(url, "mozillaWindow", "popup");
    }

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "auto"
            }}>
            <div className="board-header">
                <div className="search-box"></div>
                <a className="write-button" onClick={handlePreview}>비밀번호 변경</a>
            </div>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <input type="hidden" name="seq" value={admin.SEQ} readOnly="readOnly"/>
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input
                        type="email"
                        className="form-control-plaintext"
                        name="email"
                        value={admin.EMAIL}
                        readOnly="readOnly"/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="name" className="form-label">성명</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={admin.NAME}
                        onChange={handleAdmin}/>
                    <div className="invalid-feedback">
                        {errors.name}
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="phone" className="form-label">연락처</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={admin.PHONE}
                        onChange={handleAdmin}/>
                    <div className="invalid-feedback">
                        {errors.phone}
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="division" className="form-label">구분</label>
                    <select
                        name="division"
                        className="form-select"
                        defaultValue=""
                        value={admin.DIVISION}
                        onChange={handleAdmin}>
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
                <div className="col-md-6">
                    <input type="hidden" name="seq" value={admin.SEQ} readOnly="readOnly"/>
                    <label htmlFor="reg_dt" className="form-label">등록일자</label>
                    <input
                        type="text"
                        className="form-control-plaintext"
                        name="reg_dt"
                        value={admin.REG_DT}
                        readOnly="readOnly"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="use_yn" className="form-label">사용여부</label>
                    <select
                        name="use_yn"
                        className="form-select"
                        defaultValue=""
                        value={admin.USE_YN}
                        onChange={handleAdmin}>
                        <option value="">선택</option>
                        {
                            codes
                                .use_yn
                                .map(
                                    (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                )
                        }
                    </select>
                    <div className="invalid-feedback">
                        {errors.use_yn}
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-end py-1">
                    <button className="btn btn-primary" type="submit">저장</button>
                    <button className="btn btn-primary" type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default Mod;