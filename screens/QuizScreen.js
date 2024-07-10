import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
import { ProgressBar } from "react-native-paper";

const QuizScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=20&type=multiple"
      );
      const fetchedQuestions = response.data.results.map((q) => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        answer: q.correct_answer,
      }));
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
      alert("Correct!");
    } else {
      alert(
        `Incorrect. The correct answer was: ${questions[currentQuestionIndex].answer}`
      );
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      navigation.navigate("Result", {
        score,
        totalQuestions: questions.length,
      });
    }
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {questions[currentQuestionIndex].question}
      </Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleAnswer(option)}
        />
      ))}
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.questionCount}>
        Question: {currentQuestionIndex + 1} / {questions.length}
      </Text>
      <ProgressBar
        progress={progress}
        color="blue"
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  score: {
    marginTop: 20,
    fontSize: 18,
  },
  questionCount: {
    marginTop: 10,
    fontSize: 16,
  },
  progressBar: {
    width: "100%",
    height: 10,
    marginTop: 20,
  },
});

export default QuizScreen;
