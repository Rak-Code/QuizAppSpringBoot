package com.example.quizapp.controller;

import com.example.quizapp.model.Question;
import com.example.quizapp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return quizService.getAllQuestions();
    }

    @PostMapping("/submit")
    public int submitQuiz(@RequestBody QuizSubmission submission) {
        return quizService.calculateScore(submission.getUserName(), submission.getAnswers());
    }

   
   
}

// Helper class for quiz submission (unchanged)
class QuizSubmission {
    private String userName;
    private List<Integer> answers;

    // Getters and setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Integer> answers) {
        this.answers = answers;
    }
}