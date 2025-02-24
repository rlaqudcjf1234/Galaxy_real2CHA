package com.galaxy.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdcListDto;
import com.galaxy.dto.AdcPostDto;
import com.galaxy.dto.AdcSearchDto;
import com.galaxy.service.AdcListService;
import com.galaxy.util.HttpLoginUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/adminCommunity")
@RequiredArgsConstructor
public class AdcListController {

    private final AdcListService adcListService;

    @GetMapping("/list")
    public AdcListDto getList(AdcSearchDto searchDto) throws Exception {
        return adcListService.selectList(searchDto);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPost(@RequestBody AdcPostDto postDto) {
        try {
            adcListService.addPost(postDto);
            return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo() {
        HttpLoginUtil loginUtil = new HttpLoginUtil();
        try {
            String seq = HttpLoginUtil.getSeq();
            String email = loginUtil.getEmail();
            String name = loginUtil.getName();

            if (seq == null) {
                return ResponseEntity.status(401).body("Invalid token or user not found");
            }

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("seq", seq);
            userInfo.put("email", email);
            userInfo.put("name", name);

            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch user info: " + e.getMessage());
        }
    }

    @GetMapping("/read/{seq}")
    public ResponseEntity<?> getPost(@PathVariable Long seq) {
        try {
            System.out.println("=== API Request Start ===");
            System.out.println("Received seq: " + seq);
            
            AdcListDto.AdcItem post = adcListService.selectPost(seq);
            
            // 상세 로깅 추가
            if (post != null) {
                System.out.println("=== Retrieved Post Details ===");
                System.out.println(String.format("seq: %d", post.getSeq()));
                System.out.println(String.format("adminSeq: %d", post.getAdminSeq()));
                System.out.println(String.format("name: '%s'", post.getName()));  // name 값 확인
                System.out.println(String.format("title: '%s'", post.getTitle()));
                System.out.println(String.format("division: '%s'", post.getDivision()));
                System.out.println(String.format("detail: '%s'", post.getDetail()));
                System.out.println(String.format("regDt: '%s'", post.getRegDt()));
                System.out.println("=== Post Object ===");
                System.out.println(post.toString());
            } else {
                System.out.println("No post found for seq: " + seq);
                return ResponseEntity.notFound().build();
            }
    
            // 응답 데이터 로깅
            System.out.println("=== Response Data ===");
            ResponseEntity<?> response = ResponseEntity.ok(post);
            System.out.println(response.getBody());
            System.out.println("=== API Request End ===");
    
            return response;
        } catch (Exception e) {
            System.err.println("=== Error Occurred ===");
            System.err.println("Error type: " + e.getClass().getName());
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body("게시글 조회 중 오류 발생: " + e.getMessage());
        }
    }

    @DeleteMapping("/read/{seq}")
    public ResponseEntity<?> deletePost(@PathVariable Long seq) {
        try {
            boolean deleted = adcListService.deletePost(seq);

            if (deleted) {
                return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("오류 발생: " + e.getMessage());
        }
    }
}