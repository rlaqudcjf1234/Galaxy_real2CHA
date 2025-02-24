import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [question, setQuestion] = useState({});

    const params = useParams();
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/question/read", {
                params: {
                    "seq": params.seq
                }
            });
            setQuestion(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchFormData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate(`../mod/${params.seq}`);
    };

    return (
        <div>
            {/* 폼 영역 */}
            <form onSubmit={handleSubmit}>
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>설문평가</em>
                            <strong>설문작성</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%"/>
                        <col width="30%"/>
                        <col width="20%"/>
                        <col width="30%"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={question.TITLE || ""}
                                    readOnly="readOnly"/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colSpan="3">
                                <textarea
                                    className="form-control-plaintext"
                                    rows="2"
                                    value={question.DETAIL}
                                    readOnly="readOnly"/>
                            </td>
                        </tr>
                    </tbody>
                    {
                        question.qsItems?.map((qsItem, index) => (
                            <tbody key={qsItem.SORT} className='border-top-double'>
                                <tr>
                                    <th>순번</th>
                                    <td>
                                        {qsItem.SORT}
                                    </td>
                                    <th>구분</th>
                                    <td>
                                        <input
                                            className="form-control-plaintext"
                                            value={qsItem.DIVISION_NAME}
                                            readOnly="readOnly"/>
                                    </td>
                                </tr>
                                {
                                    qsItem.DIVISION != "" && (
                                        <tr>
                                            <th>질의</th>
                                            <td colSpan="3">
                                                <textarea
                                                    className="form-control-plaintext"
                                                    rows="2"
                                                    value={qsItem.TITLE}
                                                    readOnly="readOnly"/>
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    qsItem.DIVISION == "radio" && (
                                        <tr>
                                            <th>항목</th>
                                            <td colSpan="3">
                                                <ul className="mb-0">
                                                    {
                                                        qsItem.ITEMS?.map((item, subIndex) => (
                                                            <li className="text-align-left" key={subIndex}>
                                                                <input
                                                                    type="radio"
                                                                    className="form-check-input"
                                                                    name={`qsItems[${index}].items`}
                                                                    id={`qsItems[${index}].items[${subIndex}]`}
                                                                    value={subIndex}
                                                                    readOnly="readOnly"/>
                                                                <label className="form-check-label" htmlFor={`qsItems[${index}].items[${subIndex}]`}>{item}</label>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    qsItem.DIVISION == "check" && (
                                        <tr>
                                            <th>항목</th>
                                            <td colSpan="3">
                                                <ul className="mb-0">
                                                    {
                                                        qsItem.ITEMS?.map((item, subIndex) => (
                                                            <li className="text-align-left" key={subIndex}>
                                                                <input type="checkbox" className="form-check-input" value={subIndex}
                                                                    id={`qsItems[${index}].items[${subIndex}]`} readOnly="readOnly"/>
                                                                <label className="form-check-label" htmlFor={`qsItems[${index}].items[${subIndex}]`}>{item}</label>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        ))
                    }
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">수정</button>
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default Add;