import { ReactNode } from "react"
import { View, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native"

export const CustomModal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: ReactNode }) => {
  return <Modal visible={open} transparent={true} onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose} >
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback>
          {children}
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
  },
})
