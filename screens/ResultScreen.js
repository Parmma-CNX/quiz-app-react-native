import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ResultScreen = ({ route, navigation }) => {
  const { score, totalQuestions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>
        Your Score: {score} / {totalQuestions}
      </Text>
      <Button title="Go Home" onPress={() => navigation.replace("Home")} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ResultScreen;
