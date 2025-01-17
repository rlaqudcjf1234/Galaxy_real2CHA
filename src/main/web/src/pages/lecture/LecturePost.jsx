// // routes/lectureRoutes.js
// const express = require('express');
// const router = express.Router();
// const oracledb = require('oracledb');
// const dbConfig = require('../config/database');

// // 강의 목록 조회 (페이지네이션 + 검색)
// router.get('/api/lecture/list', async (req, res) => {
//     let connection;
//     try {
//         connection = await oracledb.getConnection(dbConfig);
//         const pageIndex = parseInt(req.query.pageIndex) || 1;
//         const pageSize = 10;
//         const searchTerm = req.query.searchTerm || '';
        
//         // 검색어가 있는 경우와 없는 경우의 쿼리를 분리
//         let query, countQuery;
//         let params = {};
        
//         if (searchTerm) {
//             query = `
//                 SELECT a.* 
//                 FROM (
//                     SELECT a.*, ROWNUM rnum 
//                     FROM (
//                         SELECT * FROM LECTURE 
//                         WHERE LOWER(NAME) LIKE LOWER(:searchTerm) 
//                         ORDER BY SEQ DESC
//                     ) a WHERE ROWNUM <= :maxRow
//                 ) a WHERE rnum > :minRow
//             `;
            
//             countQuery = `
//                 SELECT COUNT(*) as total 
//                 FROM LECTURE 
//                 WHERE LOWER(NAME) LIKE LOWER(:searchTerm)
//             `;
            
//             params = {
//                 searchTerm: `%${searchTerm}%`,
//                 minRow: (pageIndex - 1) * pageSize,
//                 maxRow: pageIndex * pageSize
//             };
//         } else {
//             query = `
//                 SELECT a.* 
//                 FROM (
//                     SELECT a.*, ROWNUM rnum 
//                     FROM (
//                         SELECT * FROM LECTURE 
//                         ORDER BY SEQ DESC
//                     ) a WHERE ROWNUM <= :maxRow
//                 ) a WHERE rnum > :minRow
//             `;
            
//             countQuery = `SELECT COUNT(*) as total FROM LECTURE`;
            
//             params = {
//                 minRow: (pageIndex - 1) * pageSize,
//                 maxRow: pageIndex * pageSize
//             };
//         }

//         // 전체 개수 조회
//         const countResult = await connection.execute(countQuery, 
//             searchTerm ? [params.searchTerm] : [],
//             { outFormat: oracledb.OUT_FORMAT_OBJECT }
//         );
        
//         // 페이지 데이터 조회
//         const result = await connection.execute(query, params, 
//             { outFormat: oracledb.OUT_FORMAT_OBJECT }
//         );

//         res.json({
//             items: result.rows,
//             totalCount: countResult.rows[0].TOTAL
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error occurred' });
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// });

// // 강의 등록
// router.post('/api/lecture/insert', async (req, res) => {
//     let connection;
//     try {
//         connection = await oracledb.getConnection(dbConfig);
//         const { name } = req.body;
        
//         // SEQ 값을 위한 시퀀스 사용
//         const result = await connection.execute(
//             `INSERT INTO LECTURE (SEQ, NAME, REG_DT) 
//              VALUES (LECTURE_SEQ.NEXTVAL, :name, SYSDATE)
//              RETURNING SEQ INTO :seq`,
//             {
//                 name: name,
//                 seq: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
//             },
//             { autoCommit: true }
//         );

//         res.json({ 
//             success: true, 
//             seq: result.outBinds.seq[0]
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to insert lecture' });
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// });

// module.exports = router;