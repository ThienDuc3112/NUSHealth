import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  roundBtn: {
    height: "auto",
    width: "auto",
    padding: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Number.MAX_SAFE_INTEGER
  },
})
