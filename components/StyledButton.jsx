import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { borderRadius, borderWidth, primary, secondary, tintColorDark, tintColorLight } from "../constants/ThemeVariables";

export default function StyledButton({ text, onPress, style }) {
  return (
    <TouchableOpacity style={style === "primary" ? styles.primaryButton : styles.secondaryButton} onPress={onPress}>
      <Text style={style === "primary" ? styles.primaryButtonText : styles.secondaryButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: primary,
    padding: 10,
    marginTop: 20,
    borderRadius: borderRadius,
    borderColor: primary,
    borderWidth: borderWidth
  },
  primaryButtonText: {
    color: tintColorLight,
    fontSize: 18,
    textAlign: "center"
  },
  secondaryButton: {
    backgroundColor: secondary,
    padding: 10,
    marginTop: 10,
    borderRadius: borderRadius,
    borderColor: primary,
    borderWidth: borderWidth
  },
  secondaryButtonText: {
    color: tintColorDark,
    fontSize: 18,
    textAlign: "center"
  }
});
