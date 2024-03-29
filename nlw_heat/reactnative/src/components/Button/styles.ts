import { StyleSheet } from "react-native";
import { FONTS } from "../../themes";

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    textTransform: "uppercase",
  },
  icon: {
    marginRight: 12
  }
})