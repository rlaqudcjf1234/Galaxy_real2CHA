// src/contexts/PostContext.js
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 게시글 데이터를 가져오는 함수
    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/lecture/search');
            const data = response.data;
            
            // API 응답을 게시글 형식으로 변환
            const formattedPosts = (data.nameSearchResults || data.allSearchResults || [])
                .map((lecture, index) => ({
                    id: lecture.SEQ || index + 1,
                    title: lecture.NAME,
                    content: '', // 필요한 경우 content 필드 추가
                    author: lecture.ADMIN_SEQ ? `관리자${lecture.ADMIN_SEQ}` : '관리자',
                    date: new Date(lecture.REG_DT).toLocaleDateString(),
                    views: Math.floor(Math.random() * 100) // 임시 데이터
                }));

            setPosts(formattedPosts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostContext.Provider 
            value={{ 
                posts, 
                setPosts, 
                loading,
                refreshPosts: fetchPosts 
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};