import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authenticatedRequest as axios } from '../../plugins/axios';
import Dompurify from 'dompurify';

const Read = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [lecture, setLecture] = useState({});
    const [lectureDoc, setLectureDoc] = useState({});

    const params = useParams();
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response1 = await axios.get("/api/lecture/read", {
                params: {
                    seq: params.lecture_seq
                }
            });
            setLecture(response1.data);
            const response2 = await axios.get("/api/lectureDoc/read", {
                params: {
                    "seq": params.seq
                }
            });
            setLectureDoc(response2.data);
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
                            <em>교육과정현황</em>
                            <strong>교육설명(<small>{lecture.NAME}</small>)</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%" />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={lectureDoc.TITLE}
                                    readOnly="readOnly" />
                            </td>
                        </tr>
                        <tr>
                            <th>구분</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={lectureDoc.DIVISION_NAME}
                                    readOnly="readOnly" />
                            </td>
                        </tr>
                        <tr>
                            <th>순번</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={lectureDoc.SORT}
                                    readOnly="readOnly" />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td className="edit">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: Dompurify.sanitize(String(
                                            lectureDoc
                                                ?.DETAIL || ""
                                        ))
                                    }}></div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">
                        수정
                    </button>
                    <button type="button" onClick={handleHistoryBack} className="btn btn-secondary">
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Read;