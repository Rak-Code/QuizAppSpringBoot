package com.example.quizapp.service;

import com.example.quizapp.model.Question;
import com.example.quizapp.model.Score;
import com.example.quizapp.repository.QuestionRepository;
import com.example.quizapp.repository.ScoreRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    // Existing initialization with sample questions (unchanged)
    @PostConstruct
    public void initQuestions() {
        if (questionRepository.count() == 0) {
            // ... (existing questions remain the same)
            questionRepository.save(new Question(
                    "Which of the following is not a principle of OOP?",
                    new String[]{"Encapsulation", "Polymorphism", "Inheritance", "Compilation"},
                    4
            ));
            questionRepository.save(new Question(
                    "Which feature of OOP allows creating a new class from an existing class?",
                    new String[]{"Encapsulation", "Inheritance", "Polymorphism", "Abstraction"},
                    2
            ));
            questionRepository.save(new Question(
                    "Which of the following is a type of polymorphism in Java?",
                    new String[]{"Compile-time polymorphism", "Runtime polymorphism", "Both Compile-time and Runtime", "None of the above"},
                    3
            ));
            questionRepository.save(new Question(
                    "What is the process of defining a method in a subclass that already exists in the parent class?",
                    new String[]{"Method Overriding", "Method Overloading", "Encapsulation", "Polymorphism"},
                    1
            ));
            questionRepository.save(new Question(
                    "Which of the following is used to achieve abstraction in Java?",
                    new String[]{"Abstract classes", "Interfaces", "Both Abstract classes and Interfaces", "None of the above"},
                    3
            ));
        }
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public int calculateScore(String userName, List<Integer> answers) {
        List<Question> questions = questionRepository.findAll();
        int score = 0;

        for (int i = 0; i < questions.size(); i++) {
            if (i < answers.size() && answers.get(i) == questions.get(i).getCorrectOption()) {
                score++;
            }
        }

        scoreRepository.save(new Score(userName, score));
        return score;
    }

   
}