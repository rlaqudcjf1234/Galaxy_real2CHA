import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import axios from 'axios';

function Add() {

    const [params, setParams] = useState({
        email: "",
        password: "",
        password2: "",
        name: "",
        phone: "",
        division: "",
        post: "",
        reg_dt: "",
        use_yn: ""
    });

    return (
        <div>
            <form class="row g-3">
                <div className="col-12">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="name@example.com"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input type="password" className="form-control" name="password"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password2" className="form-label">비밀번호 확인</label>
                    <input type="password" className="form-control" name="password2"/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="name" className="form-label">성명</label>
                    <input type="text" className="form-control" name="name"/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="phone" className="form-label">연락처</label>
                    <input type="text" className="form-control" name="phone"/>
                </div>
                <div class="col-md-4">
                    <label for="division" class="form-label">구분</label>
                    <select name="division" class="form-select">
                        <option selected="selected">선택</option>
                        <option value="1">관리자</option>
                        <option value="2">교강사</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Add;