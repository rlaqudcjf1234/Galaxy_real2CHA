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
    const [qsCount, setQsCount] = useState(1);
    const [qsItems, setQsItems] = useState([
        {
            sort: 1,
            title: "",
            division: "",
            items: [""]
        }
    ]);
    const [iCounts, setICounts] = useState([1]);
    const [errors, setErrors] = useState({}); // 오류 내용

    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "text": "question"
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

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
    }, []);

    const handleQsCount = (e) => {
        setQsCount(e.target.value);
    }

    useEffect(() => {
        if (qsCount == "") {
            return;
        }
        if (qsItems.length < qsCount) {
            var copy = [...qsItems];
            copy.length = qsCount;
            for (var i = qsItems.length; i < qsCount; i++) {
                copy[i] = {
                    sort: i+1,
                    title: "",
                    division: "",
                    items: [""]
                };
            }
            setQsItems(copy);

            var copy = [...iCounts];
            copy.length = qsCount;
            for (var i = iCounts.length; i < qsCount; i++) {
                copy[i] = 1;
            }
            setICounts(copy)
        } else if (qsItems.length > qsCount) {
            setQsItems(qsItems.slice(0, qsCount))
            setICounts(iCounts.slice(0, qsCount))
        }
    }, [qsCount]);

    const handleQsItem = (e, index, name) => {
        const copy = [...qsItems];
        copy[index] = {
            ...copy[index],
            [name]: e.target.value
        };
        setQsItems(copy);
    }

    const handleQsOCount = (e, index) => {
        const copy = [...iCounts];
        copy[index] = e.target.value;
        setICounts(copy);
    }

    useEffect(() => {
        const copy = [...qsItems];
        iCounts.forEach((value, index) => {
            if (copy[index].items.length < value) {
                var copy2 = [...copy[index].items];
                copy2.length = value;
                for (var i = copy[index].items.length; i < value; i++) {
                    copy2[i] = "";
                }
                copy[index].items = copy2;
            } else if (copy[index].items.length > value) {
                copy[index].items = copy[index].items.slice(0, value);
            }
        });
        setQsItems(copy);
    }, [iCounts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/question/add", formData);
            navigate("/question");
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors(response.data)
            }
        } finally {
            setLoading(false);
        }
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
                                    className={`form-control ${errors.title
                                        ? 'is-invalid'
                                        : ''}`}
                                    name="title"
                                    required="required"
                                    placeholder="제목을 입력해주세요."/> {
                                    errors.title && (
                                        <div className="invalid-feedback d-block">
                                            {errors.title}
                                        </div>
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colSpan="3">
                                <textarea
                                    name="detail"
                                    className="form-control"
                                    rows="2"
                                    placeholder="내용을 입력해주세요"/>
                            </td>
                        </tr>
                        <tr>
                            <th>문항수</th>
                            <td colSpan="3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="count"
                                    value={qsCount}
                                    onChange={handleQsCount}
                                    min="1"
                                    max="50"
                                    required="required"/>
                            </td>
                        </tr>
                    </tbody>
                    {
                        qsItems.map((qsItem, index) => (
                            <tbody key={qsItem.sort} className='border-top-double'>
                                <tr>
                                    <th>순번</th>
                                    <td>
                                        <input type="hidden" name={`qsItems[${index}].sort`} value={qsItem.sort}/> {qsItem.sort}
                                    </td>
                                    <th>구분</th>
                                    <td>
                                        <select
                                            name={`qsItems[${index}].division`}
                                            className="form-control"
                                            value={qsItem.division}
                                            onChange={(e) => handleQsItem(e, index, 'division')}
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
                                </tr>
                                {
                                    qsItem.division == "" && <tr>
                                            <th>질의</th>
                                            <td colSpan="3"></td>
                                        </tr>
                                }
                                {
                                    qsItem.division != "" && (
                                        <tr>
                                            <th>질의</th>
                                            <td colSpan="3">
                                                <textarea
                                                    className="form-control"
                                                    name={`qsItems[${index}].title`}
                                                    rows="2"
                                                    maxLength="150"
                                                    required="required"
                                                    placeholder="질의를 입력해주세요."/>
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    (qsItem.division == "radio" || qsItem.division == "check") && (
                                        <tr>
                                            <th>항목수</th>
                                            <td colSpan="3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name={`qsItems[${index}].option.count`}
                                                    value={iCounts[index]}
                                                    onChange={(e) => handleQsOCount(e, index)}
                                                    min="1"
                                                    max="50"
                                                    required="required"/>
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    (qsItem.division == "radio" || qsItem.division == "check") && (
                                        <tr>
                                            <th>항목</th>
                                            <td colSpan="3">
                                                <ol className="mb-0">
                                                    {
                                                        qsItem
                                                            .items
                                                            .map((item, subIndex) => (
                                                                <li key={subIndex}>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name={`qsItems[${index}].items[${subIndex}]`}
                                                                        required="required"
                                                                        placeholder="항목"/>
                                                                </li>
                                                            ))
                                                    }
                                                </ol>
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
                    <button type="submit" className="btn btn-primary">등록</button>
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default Add;