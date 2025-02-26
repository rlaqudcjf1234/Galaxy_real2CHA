import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { authenticatedRequest as axios } from "../../plugins/axios";

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [survey, setSurvey] = useState({});

    const params = useParams();
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/survey/read", {
                params: {
                    "question_seq": params.question_seq,
                    "student_seq": params.student_seq
                }
            });
            setSurvey(response.data);
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
    };

    return (
        <div>
            {/* 폼 영역 */}
            <form onSubmit={handleSubmit}>
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <strong>{survey.TITLE}</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>
                                작성자
                            </th>
                            <td>
                                {survey.STUDENT_NAME}
                            </td>
                            <th>
                                작성일자
                            </th>
                            <td>
                                {survey.REG_DT}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="text-align-left fs-4 fw-bolder">
                                {survey.DETAIL}
                            </td>
                        </tr>
                    </tbody>
                    {
                        survey.qsItems?.map((qsItem, index) => (
                            <tbody key={qsItem.SORT} className='border-top-double'>
                                <tr>
                                    <td colSpan="4" className="text-align-left fs-6 fw-bold">
                                        {qsItem.SORT}.&nbsp;{qsItem.TITLE}
                                    </td>
                                </tr>
                                {
                                    qsItem.DIVISION == "short" && (
                                        <tr>
                                            <td colSpan="4">
                                                <input type="text" className="form-control-plaintext" name={`qsResults[${index}].results`}
                                                    defaultValue={qsItem.RESULT} readOnly />
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    qsItem.DIVISION == "long" && (
                                        <tr>
                                            <td colSpan="4">
                                                <textarea className="form-control-plaintext" name={`qsResults[${index}].results`} style={{ resize: "none" }} rows="2"
                                                    defaultValue={qsItem.RESULT} readOnly />
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    qsItem.DIVISION == "radio" && (
                                        <tr>
                                            <td colSpan="4">
                                                <ul className="mb-0">
                                                    {
                                                        qsItem.ITEMS?.map((item, subIndex) => (
                                                            <li className="text-align-left fs-6" key={subIndex}>
                                                                <input type="radio" className="form-check-input"
                                                                    name={`qsResults[${index}].results`}
                                                                    id={`qsResults[${index}].items[${subIndex}]`}
                                                                    value={subIndex}
                                                                    checked={qsItem.RESULT == subIndex}
                                                                    onChange={() => { return false; }} />
                                                                <label className="form-check-label" htmlFor={`qsResults[${index}].items[${subIndex}]`}>{item}</label>
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
                                            <td colSpan="4">
                                                <ul className="mb-0">
                                                    {
                                                        qsItem.ITEMS?.map((item, subIndex) => (
                                                            <li className="text-align-left fs-6" key={subIndex}>
                                                                <input type="checkbox" className="form-check-input"
                                                                    name={`qsResults[${index}].results`}
                                                                    id={`qsResults[${index}].items[${subIndex}]`}
                                                                    value={subIndex}
                                                                    checked={qsItem.RESULT?.indexOf(subIndex) > -1}
                                                                    onChange={() => { return false; }} />
                                                                <label className="form-check-label" htmlFor={`qsResults[${index}].items[${subIndex}]`}>{item}</label>
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
                    <button type="button" className="btn btn-primary" onClick={handleHistoryBack}>확인</button>
                </div>
            </form>
        </div>
    );
}

export default Add;