import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpg'
import './Header.css';

function Header() {





  
    return (
        <div id="header">
        <div className="logo">
          <a href="#">Soldesk</a>
        </div>  
        <nav>
        
          <ul>
          
            <li className="dropdown">
              <a href="">학습안내
              </a>
                <ul>
                  <li><a href="#">학습안내</a></li>
                  <li><a href="#">강의계획서</a></li>
                  <li><a href="#">공지(일부)</a></li>
                  <li><a href="#">과정신청</a></li>
                </ul>        
            </li>
            <li className="dropdown">
              <a href="">과정정보</a>
                <ul>
                  <li><a href="#">공지사항</a></li>
                  <li><a href="#">출석</a></li>
                  <li><a href="#">자격안내</a></li>
                  <li><a href="#">시간표</a></li>
                </ul>        
            </li>
            <li className="dropdown">
              <a href="">사후관리</a>
                <ul>
                  <li><a href="#">신청</a></li>
                  <li><a href="#">진행현황</a></li>
                  <li><a href="#">결과</a></li>
                  <li><a href="#">통계(일부)</a></li>
                </ul>        
            </li>
            <li className="dropdown">
              <a href="">설문</a>
                <ul>
                  <li><a href="#">교원평가</a></li>
                  <li><a href="#">설문</a></li>
                  <li><a href="#">참여내역</a></li>
                </ul>        
            </li>
            <li className="dropdown">
              <a href="">게시판</a>
                <ul>
                  <li><a href="#">과정별</a></li>
                  <li><a href="#">공지사항</a></li>
                  <li><a href="#">QnA</a></li>
                
                </ul>        
            </li>
          </ul>
        </nav>
      </div>
        
    )
}

export default Header;