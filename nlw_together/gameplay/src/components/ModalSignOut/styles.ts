import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    height: 170,
    marginTop: 'auto'
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.heading
  },
  titleRed: {
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.primary
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionNoContainer: {
    marginRight: 4,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.secondary30,
    backgroundColor: 'transparent',
  },
  optionNo: {
    padding: 16,
  },
  optionYesContainer: {
    marginLeft: 4,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  optionYes: {
    padding: 16,
  },
  optionText: {
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    color: theme.colors.heading,
    textAlign: 'center'
  }
})