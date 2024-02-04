import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const Loading = ({ title = "Aguarde um momento..." }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" />
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  content: {
    flex: 1,
    gap: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
  },
});
