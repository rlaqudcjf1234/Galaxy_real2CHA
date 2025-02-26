import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { useParams } from "react-router-dom";

import { authenticatedRequest as axios } from '../../plugins/axios';

function Pass() {

    const params = useParams();
    const admin = useState({ "SEQ": params.seq });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // 로딩 상태

    const handleSubmit = async () => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            await axios.post("/api/admin/pass", formData);
            handleClose();
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors(response.data)
            }
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        window.open("", "_self").close();
    }

    return (
        <div>
            <form className="row g-3" onSubmit={handleSubmit}>
                <input type="hidden" name="seq" value={admin.SEQ} readOnly="readOnly" />
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">새 비밀번호</label>
                    <input type="password" className="form-control" name="password" />
                    <div className="invalid-feedback">
                        {errors.password}
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password2" className="form-label">새 비밀번호 확인</label>
                    <input type="password" className="form-control" name="password2" />
                    <div className="invalid-feedback">
                        {errors.password2}
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-end py-1">
                    <button className="btn btn-primary" type="submit">저장</button>
                    <button className="btn btn-primary" type="button" onClick={handleClose}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default Pass