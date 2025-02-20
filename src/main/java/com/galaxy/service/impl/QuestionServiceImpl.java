package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.galaxy.dto.QuestionDto;
import com.galaxy.dto.QuestionItemDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.QuestionItemMapper;
import com.galaxy.mapper.QuestionMapper;
import com.galaxy.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

    protected final String table_nm = "qustion";

    @Autowired private QuestionMapper questionMapper;

    @Autowired private QuestionItemMapper questionItemMapper;

    @Override public int selectCount(SearchDto dto)throws Exception {
        return questionMapper.selectCount(dto);
    }

    @Override public List<Map<String, Object>> selectList(SearchDto dto)throws Exception {
        return questionMapper.selectList(dto);
    }

    @Override @Transactional public void insertOne(QuestionDto dto)throws Exception {
        dto.setTable_nm(table_nm);
        int i = questionMapper.insertOne(dto);

        if (i > 0) {
            String seq = dto.getSeq();
            questionItemMapper.deleteList(seq);
            for (QuestionItemDto qsItems : dto.getQsItems()) {
                qsItems.setQuestionSeq(seq);

                String[] items = qsItems.getItems();
                if (items != null && items.length > 0) {
                    qsItems.setItem(String.join("|", items));
                } else {
                    qsItems.setItem("");
                }
                questionItemMapper.insertOne(qsItems);
            }
        }
    }

    @Override public Map<String, Object> selectOne(String seq)throws Exception {
        Map<String, Object> map = questionMapper.selectOne(seq);
        List<Map<String, Object>> list = questionItemMapper.selectList(seq);

        if (list != null) {
            int[] iCounts = new int[list.size()];
            for (int i = 0; i < list.size(); i++) {
                Map<String, Object> qsItems = list.get(i);
                String item = (String)qsItems.get("ITEM");
                if (item != null && !item.isEmpty()) {
                    String[] items = item.split("\\|");

                    qsItems.put("ITEMS", items);
                    iCounts[i] = items.length;
                } else {
                    qsItems.put("ITEMS", new String[1]);
                    iCounts[i] = 1;
                }
            }

            map.put("qsItems", list);
            map.put("iCounts", iCounts);
        }

        return map;
    }

    @Override @Transactional public void updateOne(QuestionDto dto)throws Exception {
        int i = questionMapper.updateOne(dto);

        if (i > 0) {
            String seq = dto.getSeq();

            questionItemMapper.deleteList(seq);
            for (QuestionItemDto qsItems : dto.getQsItems()) {
                qsItems.setQuestionSeq(seq);

                String[] items = qsItems.getItems();
                if (items != null && items.length > 0) {
                    qsItems.setItem(String.join("|", items));
                } else {
                    qsItems.setItem("");
                }
                questionItemMapper.insertOne(qsItems);
            }
        }

    }
}
