import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal as ModalReact,
} from "react-native";

export const Modal = ({}) => {
  return (
    <ModalReact
      animationType="slide"
      transparent={true}
      visible={modalDeleteCountryIsOpen}
      onRequestClose={() => {
        setModalDeleteCountryIsOpen(!modalDeleteCountryIsOpen);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Está prestes a sair do aplicativo{" "}
          </Text>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 24,
              color: "#2264C7",
            }}
          >
            Tem certeza?{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              JustifyContent: "space-between",
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.navigate("Welcome")}
            >
              <Text style={styles.textStyle}>Sim</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() =>
                setModalDeleteCountryIsOpen(!modalDeleteCountryIsOpen)
              }
            >
              <Text style={styles.textStyle}>Não</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ModalReact>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#BED5FF",
    borderWidth: 2,
    borderColor: "#E7BE29",
    borderRadius: 20,
    height: 189,
    width: 285,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    margin: 8,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: 87,
  },
  buttonOpen: {
    backgroundColor: "#7AC943",
  },
  buttonClose: {
    backgroundColor: "#EE5656",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginTop: -15,
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
});
