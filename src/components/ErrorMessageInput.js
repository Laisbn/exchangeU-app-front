import { StyleSheet, Text } from "react-native";

export const ErrorMessageInput = ({ text = "" }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    alignSelf: "flex-start",
    marginTop: 2,
    fontWeight: "600",
    color: "#EE5656",
  },
});
