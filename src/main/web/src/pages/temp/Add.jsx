import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({division: []});
    const [errors, setErrors] = useState({}); // 오류 내용

    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = {
                data: [
                    {
                        name: "division",
                        value: [
                            {
                                CODE_ID: "1",
                                CODE_NAME: "공지"
                            }, {
                                CODE_ID: "2",
                                CODE_NAME: "일반"
                            }
                        ]
                    }
                ]
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
                            <em>간의게시판</em>
                            <strong>게시글 작성</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%"/>
                        <col/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <select
                                    name="division"
                                    className="form-control"
                                    defaultValue=""
                                    required="required">
                                    <option value="">선택해주세요</option>
                                    {
                                        codes
                                            .division
                                            .map(
                                                (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                            )
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="제목을 입력해주세요"
                                    required="required"/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    name="detail"
                                    className="form-control"
                                    rows="10"
                                    placeholder="내용을 입력해주세요"
                                    required="required"/>
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
    );
}

export default Add;