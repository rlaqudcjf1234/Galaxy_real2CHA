import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';

const Read = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [formData, setFormData] = useState(
        {adminSeq: 0, title: '', division: '', detail: ''}
    );

    const [loading, setLoading] = useState(false); // 로딩 상태

    const fetchFormData = async () => {
        setLoading(true);
        try {
            setFormData(
                {adminSeq: 1, title: '제목을 입력해주세요', division: '선택해주세요', detail: '내용을 입력해주세요'}
            );
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchFormData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    // 이전 페이지로 가기 처리
    const handleGoBack = () => {
        navigate(-1); // 브라우저의 이전 페이지로 이동
    };

    return (
        <div>
            {/* 폼 영역 */}
            <form onSubmit={handleSubmit}>
                <table className="table">
                    {/* 헤더 영역 */}
                    <thead>
                        <tr>
                            <th colSpan="2">
                                <span>
                                    <em>홈</em>
                                    <strong>간의게시판</strong>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <input
                                    name="division"
                                    value={formData.division}
                                    className="form-control-plaintext"
                                    readOnly="readOnly"/>
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    className="form-control-plaintext"
                                    readOnly="readOnly"/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    name="detail"
                                    value={formData.detail}
                                    className="form-control-plaintext"
                                    rows="10"
                                    readOnly="readOnly"/>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">
                        수정
                    </button>
                    <button type="button" onClick={handleGoBack} className="btn btn-secondary">
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Read;