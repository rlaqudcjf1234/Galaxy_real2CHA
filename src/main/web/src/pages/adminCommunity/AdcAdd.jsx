import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Community.css';

function AdcAdd() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        adminSeq: 1,
        title: '',
        division: '',
        detail: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 서버로 보내는 데이터 형식 확인
        console.log('서버로 보내는 데이터:', {
            url: '/api/adminCommunity/add',
            method: 'POST',
            data: formData
        });

        try {
            const response = await axios.post('/api/adminCommunity/add', formData);

            console.log('서버 응답:', response);  // 성공 응답 확인


            if (response.status === 200) {
                alert('게시글이 성공적으로 등록되었습니다.');
                navigate('/adminCommunity');
            }
        } catch (error) {

            console.error('에러 상세 정보:', {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
                config: error.config
            });


            alert(error.response?.data || '게시글 등록 중 오류가 발생했습니다.');
        }
    };

    // 이전 페이지로 가기 처리
    const handleGoBack = () => {
        navigate(-1); // 브라우저의 이전 페이지로 이동
    };

    return (
        <div className="board-container">
            {/* 헤더 영역 */}
            <div className="board-header">
                <h2>게시글 작성</h2>
            </div>

            {/* 폼 영역 */}
            <form onSubmit={handleSubmit}>
                <table className="board-table">
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <select
                                    name="division"
                                    value={formData.division}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    style={{ width: '200px' }}
                                    required
                                >
                                    <option value="">선택해주세요</option>
                                    <option value="공지">공지</option>
                                    <option value="일반">일반</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="제목을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    name="detail"
                                    value={formData.detail}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows="10"
                                    placeholder="내용을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button
                        type="button"
                        onClick={handleGoBack}
                        className="btn btn-secondary"
                    >
                        이전으로
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdcAdd;