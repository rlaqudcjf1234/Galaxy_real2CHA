import {useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

import Editor from '../../components/Editor';

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({division: []});
    const [lecture, setLecture] = useState({});
    const [errors, setErrors] = useState({}); // 오류 내용

    const params = useParams();
    const [loading, setLoading] = useState(false); // 로딩 상태

    const [detail, setDetail] = useState(""); // Editor

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "text": "lectureDoc"
                }
            });
            const data = {}
            response
                .data
                .forEach(item => {
                    data[item.name] = item.value
                });
            setCodes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/lecture/read", {
                params: {
                    seq: params.lecture_seq
                }
            });
            setLecture(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
        fetchFormData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/lectureDoc/add", formData);
            navigate(`/lecture/doc/${params.lecture_seq}`);
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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="hidden"
                    name="lecture_seq"
                    value={params.lecture_seq}
                    readOnly="readOnly"/>
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>교육과정현황</em>
                            <strong>안내문서(<small>{lecture.NAME}</small>)</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%"/>
                        <col/>
                        <col width="30%"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="제목을 입력해주세요"
                                    required="required"/>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.title}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>구분</th>
                            <td>
                                <select
                                    name="division"
                                    className="form-control"
                                    defaultValue=""
                                    required="required">
                                    <option value="">선택</option>
                                    {
                                        codes
                                            .division
                                            .map(
                                                (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                            )
                                    }
                                </select>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.division}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>순번</th>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="sort"
                                    defaultValue="1"
                                    min="1"
                                    required="required"/>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.division}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td className="edit" colSpan="2">
                                <input type="hidden" name="detail" value={detail}/>
                                <Editor htmlStr={detail} setHtmlStr={setDetail}/>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">등록</button>
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default Add;