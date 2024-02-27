// AppStyles.js
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { yummlyTheme } from "../../constants/index.js";
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  CreateRecipe: {
    marginTop: 0,
  },
  Background: {
    width: width,
    height: height * 1.1,
  },
  CreateRecipeCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  image: {
    paddingHorizontal: 40,
  },
  uploadButton: {
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    height: height / 4,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 15,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: theme.SIZES.BASE,
  },
  buttonStyle: {
    backgroundColor: yummlyTheme.COLORS.WHITE,
    color: yummlyTheme.COLORS.PRIMARY,
    marginRight: 10,
    marginLeft: 10,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 2,
  },
  tagText: {
    fontSize: 12,
    marginRight: 4,
  },
  input: {
    flex: 1,
    padding: 5,
    width: width * 0.61,
    height: 40,
  },
  addButton: {
    borderWidth: 1,
    borderColor: yummlyTheme.COLORS.INPUT,
    alignItems: "center",
    marginLeft: 5,
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: yummlyTheme.COLORS.WHITE,
    borderRadius: 5,
  },
});
