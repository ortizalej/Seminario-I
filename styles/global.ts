import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: "2.5%",
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 32,
    fontWeight: "bold",
    color: "#3700B3",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: "#3700B3",
    marginTop: 20,
  },
  input: {
    // backgroundColor: "#E8E8E8",
    marginBottom: 20,
    // width: "80%",
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#5985EB",
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    // textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
  },
  link: {
    color: "#8252c2",
    marginTop: 60,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default globalStyles;
